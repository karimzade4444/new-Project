let api = "https://69d2798a5043d95be971eb73.mockapi.io/api/data";

let container = document.querySelector(".container");
let middle = document.querySelector(".middle");
let search = document.querySelector(".search");
let select1 = document.querySelector(".sel1");
let add = document.querySelector(".add");
let footer = document.querySelector(".footer");
let viewmodal = document.querySelector(".viewmodal");
let cancel = document.querySelector(".Cancel");
let close = document.querySelector(".Close");
let viewcreatmodal = document.querySelector(".viewcreatmodal");
let editmodal = document.querySelector(".editmodal");
let Vname = document.querySelector(".Vname");
let Vdes = document.querySelector(".Vdes");
let updateForm = document.querySelector(".updateForm");
let viewcategory = document.querySelector(".viewcategory");
let vday = document.querySelector(".vday");
let creatmodal = document.querySelector(".creatmodal");
let Closeml = document.querySelector(".Closeml");
let id = document.querySelector(".id");
let CreatForm = document.querySelector(".CreatForm");
let statuss = document.querySelector(".status");

function render(users) {
  footer.innerHTML = "";
  users.forEach((element) => {
    let block = document.createElement("div");
    block.classList.add("block");
    footer.append(block);
    let topblock = document.createElement("div");
    topblock.classList.add("topblock");
    let h3 = document.createElement("h3");
    h3.textContent = element.name;
    let blockedit = document.createElement("div");
    blockedit.classList.add("blockedit");
    let p1 = document.createElement("p");
    p1.textContent = "👁️";
    let p2 = document.createElement("p");
    p2.textContent = "✍️";
    let p3 = document.createElement("p");
    p3.textContent = "🗑️";
    blockedit.append(p1, p2, p3);
    topblock.append(h3, blockedit);
    let middleblock = document.createElement("div");
    middleblock.classList.add("middleblock");
    let descr = document.createElement("p");
    descr.textContent = element.description;
    middleblock.append(descr);
    let bottomblock = document.createElement("div");
    bottomblock.classList.add("bottomblock");
    let category = document.createElement("p");
    category.textContent = element.category;
    category.style.color =
      element.category === "Работа"
        ? "blue"
        : element.category === "Личное"
          ? "green"
          : "purple";
    let divday = document.createElement("div");
    divday.textContent = element.createdAt
      ? new Date(element.createdAt).toLocaleDateString()
      : new Date().toLocaleDateString();

    bottomblock.append(category, divday);
    block.append(topblock, middleblock, bottomblock);

    p1.onclick = () => {
      viewmodal.style.display = "block";
      Vname.textContent = element.name;
      Vdes.textContent = element.description;
      viewcategory.textContent = element.category;
      updateForm.id.value = element.id;
      vday.textContent = divday.textContent;
      viewcategory.style.color =
        element.category === "Работа"
          ? "blue"
          : element.category === "Личное"
            ? "green"
            : "purple";

      cancel.onclick = () => {
        viewmodal.style.display = "none";
      };
      editmodal.onclick = () => {
        viewcreatmodal.style.display = "block";
        viewmodal.style.display = "none";

        close.onclick = () => {
          viewcreatmodal.style.display = "none";
        };
      };
    };
    p2.onclick = () => {
      viewcreatmodal.style.display = "block";
      updateForm.nameinp.value = element.name;
      updateForm.des.value = element.description;
      updateForm.status.value = element.category;
      updateForm.id.value = element.id;

      close.onclick = () => {
        viewcreatmodal.style.display = "none";
      };
    };

    p3.onclick = () => {
      deleteUser(element.id);
    };
  });
}

add.onclick = () => {
  creatmodal.style.display = "block";
  Closeml.onclick = () => {
    creatmodal.style.display = "none";
  };
};
let updatedData = [];
async function getData() {
  try {
    let response = await fetch(api);
    let data = await response.json();
    updatedData = data.map((item) => ({
      ...item,
      category: item.category || "default",
    }));
    console.log(updatedData);
    render(updatedData);
  } catch (error) {
    console.log(error);
  }
}
getData();

async function deleteUser(id) {
  try {
    await fetch(`${api}/${id}`, {
      method: "DELETE",
    });
    getData();
  } catch (error) {
    console.error(error);
  }
}

async function updateUser(id, data) {
  try {
    await fetch(`${api}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    getData();
  } catch (error) {
    console.log(error);
  }
}

updateForm.onsubmit = (event) => {
  event.preventDefault();

  let formData = Object.fromEntries(new FormData(updateForm));

  let fixedData = {
    name: formData.nameinp,
    description: formData.des,
    category: formData.status,
    id: formData.id,
  };

  updateUser(formData.id, fixedData);

  viewcreatmodal.style.display = "none";
};

async function createUser(data) {
  try {
    await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    getData();
  } catch (error) {
    console.log(error);
  }
}

CreatForm.onsubmit = (event) => {
  event.preventDefault();

  let formcrData = Object.fromEntries(new FormData(CreatForm));

  let fixedcrData = {
    name: formcrData.nameinp,
    description: formcrData.des,
    category: formcrData.status,
  };

  createUser(fixedcrData);

  creatmodal.style.display = "none";
};

search.oninput = () => {
  let query = search.value.toLowerCase();
  let filtered = updatedData.filter((el) =>
    el.name.toLowerCase().includes(query),
  );
  render(filtered);
};
