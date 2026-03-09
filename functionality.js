// login funtion
// document.getElementById("sign-in-btn").addEventListener("click", () => {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   if (username === "admin" && password === "admin123") {
//     window.location.href = "./main.html";
//   } else {
//     alert("Give Authentic Information");
//   }
// });
let cardContainer = document.getElementById("card-container");
let totalAmount = document.getElementById("total-amount");
const cmnBtns = document.querySelectorAll(".cmn-btn");
const modalContainer = document.getElementById("my_modal_1");

cmnBtns.forEach((cmnBtn) => {
  cmnBtn.addEventListener("click", async (event) => {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    const cards = await data.data;

    if (event.target.innerText === "All") {
      cardShower(cards);
      buttonClicker(event.target);
    } else if (event.target.innerText === "Open") {
      const openCards = cards.filter((card) => card.status === "open");
      cardShower(openCards);
      buttonClicker(event.target);
    } else if (event.target.innerText === "Closed") {
      const closeCards = cards.filter((card) => card.status === "closed");
      cardShower(closeCards);
      buttonClicker(event.target);
    }
  });
});

function cardShower(cards) {
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    cardContainer.innerHTML += `
             <div onclick="openModal('${card.id}')" class="space-y-3 p-5 bg-white rounded-md shadow-xl ${card.status === "closed" ? "border-t-5 border-t-purple-800" : "border-t-5 border-t-green-800"}">
            <div class="flex justify-between">
              <figure>
                <img src="./assets/Open-Status.png" alt="" class="${card.status === "closed" ? "hidden" : ""}" />
                <img class="${card.status === "open" ? "hidden" : ""}" src="./assets/Closed- Status .png" alt="" />
              </figure>
              <p class="${card.priority}">${card.priority}</p>
            </div>
            <h4 class="text-xl font-bold">${card.title}</h4>
            <p class="text-slate-400">${card.description}</p>
            <div id="label-container" class=" flex gap-1 flex-wrap items-center">
            ${labelShower(card.labels)}
            </div>
            <hr class="text-slate-400" />
            <p class="text-slate-400">${card.author}</p>
            <p class="text-slate-400">${card.createdAt}</p>
          </div>
            `;
  });
  totalAmount.innerText = cardContainer.children.length;
}

function labelShower(labelArray) {
  labelContainer = document.getElementById("label-container");
  labelContainer = labelArray
    .map((word) => {
      return `<span class="medium">${word}</span>`;
    })
    .join(" ");
  return labelContainer;
}

function buttonClicker(target) {
  cmnBtns.forEach((btn) => btn.classList.remove("bg-blue-800"));
  target.classList.add("bg-blue-800");
}

// to defaulty seclect allJobs btn
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("all-btn").click();
});

const searchBar = document.getElementById("search-bar");
searchBar.addEventListener("keyup", async () => {
  const text = searchBar.value;
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`,
  );
  const cards = await res.json();
  cardShower(cards.data);
});

const openModal = async (id) => {
  modalContainer.innerHTML = "";
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const card = await res.json();
  const data = card.data;
  console.log(data);
  modalContainer.innerHTML = `
    <div class="modal-box space-y-3">
      <h4 class="text-xl font-bold">${data.title}</h4>

      <p>
        <span class="${data.status}">${data.status}</span>
        <i class="fa-solid fa-circle text-[10px]"></i>
        <span class="text-slate-400">Opened by ${data.author}</span>
        <i class="fa-solid fa-circle text-[10px]"></i>
        <span class="text-slate-400">${data.createdAt}</span>
      </p>

      <div class="flex gap-1 flex-wrap items-center">
        ${labelShower(data.labels)}
      </div>

      <p class="text-slate-400">
        ${data.description}
      </p>

      <div class="flex justify-between">
        <div class="flex-1">
          <p class="text-slate-400">Assignee:</p>
          <p class="font-bold">${data.assignee ? data.assignee : "no name"}</p>
        </div>

        <div class="flex-1">
          <p class="text-slate-400">priority:</p>
          <p class="${data.priority} w-fit">${data.priority}</p>
        </div>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  `;

  modalContainer.showModal();
};
