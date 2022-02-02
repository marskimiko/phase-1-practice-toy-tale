let addToy = false;

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

  function renderOneToy(toy) {
    let card = document.getElementById('toy-collection')
    card.className = 'card'
    card.innerHTML = `
      <img src="${toys.image}">
      <div class="content">
        <h4>${toys.name}</h4>
        <p>
          $<span class='likes'>${toys.likes}</span> Liked
        <p>
      </div>  
    `

    // add animal card to DOM
    document.createElement('ul').appendChild(card)
  }
  
  // Fetch Requests
  // Get Fetch for all toy resources
  function getAllToys() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
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




// ### Fetch Andy's Toys

// On the `index.html` page, there is a `div` with the `id` "toy-collection."

// When the page loads, make a 'GET' request to fetch all the toy objects. With the
// response data, make a `<div class="card">` for each toy and add it to the
// toy-collection `div`.
