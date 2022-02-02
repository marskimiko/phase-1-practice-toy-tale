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

  // initial render
  // get data and render our toys to the dom
  function initialize() {
    getAllToys()
  }
  initialize()
});







// 1. Access the list of toys from an API (mocked using JSON Server) and render
//    each of them in a "card" on the page
// 2. Hook up a form that enables users to add new toys. Create an event listener
//    so that, when the form is submitted, the new toy is persisted to the database
//    and a new card showing the toy is added to the DOM
// 3. Create an event listener that gives users the ability to click a button to
//    "like" a toy. When the button is clicked, the number of likes should be
//    updated in the database and the updated information should be rendered to the
//    DOM


// ### Add a New Toy

// When a user submits the toy form, two things should happen:

// - A `POST` request should be sent to `http://localhost:3000/toys` and the new
//   toy added to Andy's Toy Collection.
// - If the post is successful, the toy should be added to the DOM without
//   reloading the page.

// In order to send a POST request via `fetch()`, give the `fetch()` a second
// argument of an object. This object should specify the method as `POST` and also
// provide the appropriate headers and the JSON data for the request. The headers
// and body should look something like this:

// ```js
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })
// ```

// For examples, refer to the [documentation][fetch docs].
