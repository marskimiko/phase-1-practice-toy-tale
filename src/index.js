let addToy = false;

//debugger

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const createToy = document.querySelector('.add-toy-form').addEventListener('submit', (e) => {
    //e.preventDefault()
    //console.log('event running')
    handleSubmit(e)
  })
  console.log(createToy);
  function handleSubmit(e){
    //console.log('boop')
    e.preventDefault()
    //debugger
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      //id: e.target.id.value,
      likes: 0
    }
    renderOneToy(toyObj)
    adoptToy(toyObj)
  }
  
  function renderOneToy(toy) {
    let allCards = document.getElementById('toy-collection')
    const card = document.createElement('div')
    //card.className = 'card'
    card.innerHTML = `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes}</p>
        <button class="like-btn" id="${toy.id}">Like ❤️</button>
      </div>
    `
    allCards.appendChild(card)
    card.querySelector('.like-btn').addEventListener('click', () => {
      toy.likes += 1
      card.querySelector('p').textContent = toy.likes
      updateLike(toy)
    })
    

    // // add animal card to DOM
    // document.createElement('ul').appendChild(card)
  }
  
  // Fetch Requests
  // Get Fetch for all toy resources
  function getAllToys() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
    .then(toyData => console.log(toyData))
    
  }

  function adoptToy(toyObj) {
    console.log(toyObj)
    fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toyObj.name,
        "image": toyObj.image,
        "likes": 0
      })
    })
    .then(res => res.json())
    .catch(e => console.log(e))
  }

  function updateLike(toyObj) {
    fetch(`http://localhost:3000/toys/${toyObj.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      
      body: JSON.stringify(toyObj)
    })
    .then(res => res.json())
    .then(toy => console.log(toy))
  }

  // initial render
  // get data and render our toys to the dom
  function initialize() {
    getAllToys()
  }
  initialize()
});