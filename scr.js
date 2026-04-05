
let api = "https://69d2798a5043d95be971eb73.mockapi.io/api/data"



let container = document.querySelector(".container")
let middle = document.querySelector(".middle")
let search = document.querySelector(".search")
let select1 = document.querySelector(".sel1")
let add = document.querySelector(".add")
let footer = document.querySelector(".footer")

function render(users){
footer.innerHTML=""
users.forEach(element => {
    let block = document.createElement("div")
    block.classList.add("block")
    footer.append(block)
    let topblock = document.createElement("div")
    topblock.classList.add("topblock")
    let h3 = document.createElement("h3")
    h3.textContent = element.name
    topblock.append(h3)
    let blockedit = document.createElement("div")
    blockedit.classList.add("blockedit")
    topblock.append(blockedit)
    let p1= document.createElement("p")
    p1.textContent ="👁️"
    let p2= document.createElement("p")
    p2.textContent ="✍️"
    let p3= document.createElement("p")
    p3.textContent ="🗑️"
    blockedit.append(p1,p2,p3)
    let middleblock = document.createElement("div")
    middleblock.classList.add("middleblock")
    let descr = document.createElement("p")
    descr.textContent = element.description;
    middleblock.append(descr)
    let bottomblock = document.createElement("div")
    bottomblock.classList.add("bottomblock")
    let category = document.createElement("p")
    let divday = document.createElement("div")
    let today = new Date().toLocaleDateString()
    divday.textContent = today
    bottomblock.append(category,divday)
    block.append(topblock,middleblock,bottomblock)
});


}

async function getData() {
  try {
    let response = await fetch(api);
    let data = await response.json();
   render(data)
  } catch (error) {
    console.log(error);
  }
}
getData();