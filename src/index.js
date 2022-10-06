const API = 'http://localhost:3000/Sneakers'
let currentSneaker;

function sortByProperty(property) {
  return function (b, a) {
    if (a[property] > b[property])
      return 1;
    else if (a[property] < b[property])
      return -1;

    return 0;
  }
}
function fetchAndSortSneakers() {
  fetch(API)
    .then(resp => resp.json())
    .then(json => {
      renderSneakersToScreen(json.sort(sortByProperty('likes')))
    })
}



// .then(json => renderSneakersToScreen(json))
const sneakerCollection = document.querySelector('#sneaker-collection');
const kingCollection = document.querySelector('#king-collection')
sneakerCollection.className = "fade"
function renderSneakersToScreen(sneaker) {
  kingCollection.textContent = ""
  sneakerCollection.textContent = ""
  makeCrownSneakerCard(sneaker[0])
  sneaker.slice(1).forEach(makeSneakerCard)
};

function makeCrownSneakerCard(sneaker) {

  const sneakerCard = document.createElement('div')

  const crown = document.createElement('p')

  const userName = document.createElement('p');
  const imageUrl = document.createElement('img');
  const sneakerDesc = document.createElement('p');
  const likesContainer = document.createElement('p')
  const sneakerLikes = document.createElement('span')
  const likesWord = document.createElement('span')
  const likeButton = document.createElement('button')

  // imageUrl.onclick = 'enlargeImg(this)'
  sneakerCard.className = "fade"
  sneakerCard.className = "sneaker-card-king"
  imageUrl.className = 'sneaker-pic-crown'
  userName.className = 'userName-text'
  sneakerDesc.className = 'desc-text'
  likeButton.className = 'likeButton'
  crown.className = 'crown'
  userName.className = 'username-crown-text'
  
  

  likeButton.textContent = "s~m~a~s~h"
  userName.textContent = `${sneaker.username} posted their kicks:`;
  imageUrl.src = sneaker.image;
  imageUrl.alt = `${userName.textContent} ${sneaker.description}`
  sneakerDesc.textContent = sneaker.description;
  crown.textContent = '👑'

  sneakerLikes.textContent = sneaker.likes
  likesWord.textContent = 'likes: '
  // likesContainer.textContent = `${likesWord} ${sneakerLikes}`
  likesContainer
  likesContainer.append(likesWord, sneakerLikes)
  sneakerCard.append(crown, userName, imageUrl, sneakerDesc, likeButton, likesContainer);
  kingCollection.append(sneakerCard)

  // imageUrl.addEventListener('click', e => {
  //   enlargeImg(e.target)
  //   e.target.addEventListener('click', e => {
  //     shrinkImg(e.target)
  //   })
  // })
  
  imageUrl.addEventListener('click', e => {
    e.target.classList.toggle('sneaker-pic-toggle')
  })

  likeButton.addEventListener('click', e => {
    currentSneaker = sneaker
    // onClick(e)
    patchLikes(e, currentSneaker, sneakerLikes)
  })
};


const listenForFormSubmit = () => {
  const form = document.querySelector('form')
  form.addEventListener('submit', e => {
    e.preventDefault();
    const userName = e.target[0].value;
    const sneakerImage = e.target[1].value;
    const description = e.target[2].value
    const sneakerLikes = 0
    const newSneaker = {
      username: userName,
      image: sneakerImage,
      description: description,
      likes: sneakerLikes
    }
    postSneaker(newSneaker)
  })
};

const postSneaker = sneaker => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify(sneaker)
  }
  fetch(API, config)
    .then(resp => resp.json())
    .then(json => makeSneakerCard(json))
}

function makeSneakerCard(sneaker) {

  const sneakerCard = document.createElement('div')
  const userName = document.createElement('p');
  const imageUrl = document.createElement('img');
  const sneakerDesc = document.createElement('p');
  const likesContainer = document.createElement('p')
  const sneakerLikes = document.createElement('span')
  const likesWord = document.createElement('span')
  const likeButton = document.createElement('button')

  // imageUrl.onclick = 'enlargeImg(this)'
  sneakerCard.className = "fade"
  sneakerCard.className = "sneaker-card"
  imageUrl.className = 'sneaker-pic'
  userName.className = 'userName-text'
  sneakerDesc.className = 'desc-text'
  likeButton.className = 'likeButton'
  

  likeButton.textContent = "s~m~a~s~h"
  userName.textContent = `${sneaker.username} posted their kicks:`;
  imageUrl.src = sneaker.image;
  imageUrl.alt = `${userName.textContent} ${sneaker.description}`
  sneakerDesc.textContent = sneaker.description;
 

  sneakerLikes.textContent = sneaker.likes
  likesWord.textContent = 'likes: '
  // likesContainer.textContent = `${likesWord} ${sneakerLikes}`
  likesContainer
  likesContainer.append(likesWord, sneakerLikes)
  sneakerCard.append(userName, imageUrl, sneakerDesc, likeButton, likesContainer);
  sneakerCollection.append(sneakerCard)

  // imageUrl.addEventListener('click', e => {
  //   enlargeImg(e.target)
  //   e.target.addEventListener('click', e => {
  //     shrinkImg(e.target)
  //   })
  // })
  
  imageUrl.addEventListener('click', e => {
    e.target.classList.toggle('sneaker-pic-toggle')
  })

  likeButton.addEventListener('click', e => {
    currentSneaker = sneaker
    // onClick(e)
    patchLikes(e, currentSneaker, sneakerLikes)
  })
};

function enlargeImg(img) {
  img.style.transform = "scale(2.5)";
  img.style.transition =
    "transform 1s ease";
}

function shrinkImg(img) {
  img.style.transform = "scale(1)";
  img.style.transition =
    "transform 1s ease";
  img.style=""
}


function patchLikes(e, currentSneaker, sneakerLikes) {

  const likesPlus = currentSneaker.likes + 1

  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: likesPlus
    })
  }

  fetch(`http://localhost:3000/Sneakers/${currentSneaker.id}`, config)
    .then(sneakerLikes.classList.add('fade'))
    .then(sneakerLikes.textContent = `${likesPlus}`)
    .then(fetchAndSortSneakers)
}
fetchAndSortSneakers()
listenForFormSubmit();