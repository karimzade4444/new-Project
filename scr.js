const { createElement } = require("react")

let api = "https://69d2798a5043d95be971eb73.mockapi.io/api/data"



let container = document.querySelector(".container")
let middle = document.querySelector(".middle")
let search = document.querySelector(".search")
let select1 = document.querySelector(".sel1")
let add = document.querySelector(".add")
let footer = document.querySelector(".footer")
let block = document.querySelector(".block")
let topblock = document.querySelector(".topBlock")
let middleblock = document.querySelector(".middleBlock")
let bottomblock = document.querySelector(".bottomBlock")

function render(users){
container.innerHTML=""
users.forEach(element => {
    let block = document.createElement("div")
    block.classList.add(".block")
    footer.append(block)
    let topblock = document.createElement("div")
    topblock.classList.add(".topblock")
    let h3 = document.createElement("h3")
    topblock.append(h3)
    let blockedit = document.createElement("div")
    blockedit.classList.add(".blockedit")
    topblock.append(blockedit)
    let p1= document.createElement("p")
    p1.textContent ="👁️"
    let p2= document.createElement("p")
    p2.textContent ="✍️"
    let p3= document.createElement("p")
    p3.textContent ="🗑️"
});


}




async function getData() {
  try {
    let response = await fetch(api);
    let data = await response.json();
   
  } catch (error) {
    console.log(error);
  }
}
getData();