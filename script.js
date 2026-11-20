const DEFAULT_COVER = "pic/card.jpg";

let summaries = [
  {
    id: 1,
    name: "English for Presentations and Persuasion",
    category: "University",
    subject: "Languages",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
  {
    id: 2,
    name: "AI Ethics & Cybersecurity Essentials",
    category: "University",
    subject: "Future Skills & Digital",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
  {
    id: 3,
    name: "Global Citizenship & Digital Society",
    category: "University",
    subject: "Society & Management",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
  {
    id: 4,
    name: "Biology Quick Review",
    category: "School",
    subject: "Science",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
  {
    id: 5,
    name: "Algebra Formula Sheet",
    category: "School",
    subject: "Math",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
  {
    id: 6,
    name: "English Grammar Basics",
    category: "School",
    subject: "English",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
  {
    id: 7,
    name: "The Silent Guardian Summary",
    category: "Novel / Other",
    subject: "Action",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
  {
    id: 8,
    name: "Campus Laughs Digest",
    category: "Novel / Other",
    subject: "Comedy",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
  {
    id: 9,
    name: "Romance Classics Digest",
    category: "Novel / Other",
    subject: "Romance",
    url: "https://drive.google.com/file/d/1GS_mQMTYl92jRxR9AV-U0sLparKisyjm/view?usp=sharing",
  },
];

let nextId = 100;

let searchText = "";

const searchInput = document.getElementById("searchInput");
const addForm = document.getElementById("addForm");
const itemCounter = document.getElementById("itemCounter");
const clearAllBtn = document.getElementById("clearAllBtn");
const confirmDialog = document.getElementById("confirmDialog");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

const nameInput = document.getElementById("nameInput");
const categoryInput = document.getElementById("categoryInput");
const subjectInput = document.getElementById("subjectInput");
const urlInput = document.getElementById("urlInput");

const nameError = document.getElementById("nameError");
const subjectError = document.getElementById("subjectError");
const urlError = document.getElementById("urlError");

// {create a card}
function createCard(item) {
  // the card
  const card = document.createElement("article");
  card.className = "summary-card";
  card.dataset.id = item.id;

  // cover image
  const thumb = document.createElement("img");
  thumb.className = "thumb";
  thumb.src = DEFAULT_COVER;
  thumb.alt = "Cover thumbnail of the summary: " + item.name;

  // body of the card
  const body = document.createElement("div");
  body.className = "card-body";

  // title
  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = item.name;

  // subject tag
  const tags = document.createElement("div");
  tags.className = "card-tags";

  const subjectTag = document.createElement("span");
  subjectTag.className = "tag";
  subjectTag.textContent = item.subject;

  tags.appendChild(subjectTag);

  // buttons
  const actions = document.createElement("div");
  actions.className = "card-actions";

  const viewLink = document.createElement("a");
  viewLink.className = "btn btn-small";
  viewLink.href = item.url;
  viewLink.target = "_blank";
  viewLink.textContent = "View File";

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "btn btn-small btn-danger delete-btn";
  deleteBtn.textContent = "Delete";

  actions.appendChild(viewLink);
  actions.appendChild(deleteBtn);

  // combine
  body.appendChild(title);
  body.appendChild(tags);
  body.appendChild(actions);

  card.appendChild(thumb);
  card.appendChild(body);

  return card;
}

// {show cards on web}
function render() {
  // there is one grid for each category
  const grids = document.querySelectorAll(".card-grid");

  grids.forEach(function (grid) {
    const category = grid.dataset.category;

    // keep only the items for this category that match the search
    const items = summaries.filter(function (item) {
      const matchCategory = item.category === category;
      const matchSearch = item.name.toLowerCase().includes(searchText);
      return matchCategory && matchSearch;
    });

    // clear the grid before drawing again
    grid.innerHTML = "";

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-message";
      empty.textContent = "No summaries found in this section.";
      grid.appendChild(empty);
    } else {
      items.forEach(function (item) {
        grid.appendChild(createCard(item));
      });
    }
  });

  itemCounter.textContent = summaries.length + " items";
}

//{search}
searchInput.addEventListener("input", function (event) {
  searchText = event.target.value.trim().toLowerCase();
  render();
});

//{delete card}
document.addEventListener("click", function (event) {
  const deleteBtn = event.target.closest(".delete-btn");
  if (!deleteBtn) return;

  const card = deleteBtn.closest(".summary-card");
  const id = Number(card.dataset.id);

  // keep every item except the one we want to delete
  summaries = summaries.filter(function (item) {
    return item.id !== id;
  });

  render();
});

// {add new sum}
function isEmpty(value) {
  return value.trim() === "";
}

function isValidUrl(value) {
  const url = value.trim();
  return url.startsWith("http://") || url.startsWith("https://");
}

nameInput.addEventListener("input", function () {
  nameError.textContent = "";
});

subjectInput.addEventListener("input", function () {
  subjectError.textContent = "";
});

urlInput.addEventListener("input", function () {
  urlError.textContent = "";
});

addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let hasError = false;

  if (isEmpty(nameInput.value)) {
    nameError.textContent = "Please enter a summary name.";
    hasError = true;
  } else {
    nameError.textContent = "";
  }

  if (isEmpty(subjectInput.value)) {
    subjectError.textContent = "Please enter a subject.";
    hasError = true;
  } else {
    subjectError.textContent = "";
  }

  if (isEmpty(urlInput.value)) {
    urlError.textContent = "Please enter a file URL.";
    hasError = true;
  } else if (!isValidUrl(urlInput.value)) {
    urlError.textContent = "The URL must start with http:// or https://";
    hasError = true;
  } else {
    urlError.textContent = "";
  }

  // stop if something is wrong
  if (hasError) return;

  // everything is OK, add the new summary
  summaries.push({
    id: nextId,
    name: nameInput.value.trim(),
    category: categoryInput.value,
    subject: subjectInput.value.trim(),
    url: urlInput.value.trim(),
  });
  nextId++;

  addForm.reset();
  render();
});

//{clear all}
clearAllBtn.addEventListener("click", function () {
  confirmDialog.showModal();
});

cancelBtn.addEventListener("click", function () {
  confirmDialog.close();
});

confirmBtn.addEventListener("click", function () {
  summaries = [];
  confirmDialog.close();
  render();
});

//{keyboard}
document.addEventListener("keydown", function (event) {
  const tag = document.activeElement.tagName;
  const isTyping = tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA";

  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    searchInput.focus();
  }
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    searchInput.value = "";
    searchText = "";
    render();
  }
});

render();
