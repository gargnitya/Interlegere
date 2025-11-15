// ---- FETCH JSON FILES ---- //
async function loadJSON(path) {
  const response = await fetch(path);
  return await response.json();
}

let writing = [];
let photos = [];
let designs = [];
let projects = [];
let tags = [];
let aboutMe = {};

async function loadAllContent() {
  writing = (await loadJSON("content/writing/writing.json")).articles;
  photos = (await loadJSON("content/photography/photos.json")).photos;
  designs = (await loadJSON("content/design/design.json")).designs;
  projects = (await loadJSON("content/projects/projects.json")).projects;
  tags = (await loadJSON("content/tags/tags.json")).tags;
  aboutMe = await loadJSON("content/about/about.json");

  renderHome();
  renderWriting();
  renderPhotos();
  renderDesign();
  renderProjects();
  renderTags();
  renderAbout();
}
loadAllContent();

// ---- TAB SWITCHING ---- //
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// ---- HOME (LATEST 6 POSTS) ---- //
function renderHome() {
  const combined = [
    ...writing.map(w => ({ ...w, type: "writing" })),
    ...photos.map(p => ({ ...p, type: "photo" })),
    ...designs.map(d => ({ ...d, type: "design" })),
    ...projects.map(pr => ({ ...pr, type: "project" }))
  ];

  combined.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

  const latest = combined.slice(0, 6);
  const container = document.getElementById("latest-list");
  container.innerHTML = "";

  latest.forEach(item => {
    const card = document.createElement("div");
    card.className = "latest-card";
    card.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.uploadDate}</p>
      <span class="tag">${item.type}</span>
    `;
    container.appendChild(card);
  });
}

// ---- WRITING ---- //
function renderWriting() {
  const container = document.getElementById("writing-list");
  container.innerHTML = "";

  writing.forEach(article => {
    const card = document.createElement("div");
    card.className = "writing-card";
    card.innerHTML = `
      <img src="content/writing/${article.image}">
      <h4>${article.title}</h4>
      <p>${article.uploadDate}</p>
    `;
    container.appendChild(card);
  });
}

// ---- PHOTOGRAPHY ---- //
let currentPhotoIndex = 0;

function renderPhotos() {
  const container = document.getElementById("photo-grid");
  container.innerHTML = "";

  photos.forEach((photo, index) => {
    const img = document.createElement("img");
    img.src = `content/photography/${photo.image}`;
    img.dataset.index = index;
    img.onclick = () => openLightbox(index);
    container.appendChild(img);
  });

  document.getElementById("photo-prev").onclick = previousPhoto;
  document.getElementById("photo-next").onclick = nextPhoto;
}

function openLightbox(index) {
  currentPhotoIndex = index;
  const lightbox = document.getElementById("photo-lightbox");
  const img = document.getElementById("lightbox-img");
  img.src = `content/photography/${photos[index].image}`;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("photo-lightbox").style.display = "none";
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  openLightbox(currentPhotoIndex);
}

function previousPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
  openLightbox(currentPhotoIndex);
}

// ---- PRODUCT DESIGN ---- //
function renderDesign() {
  const container = document.getElementById("design-list");
  container.innerHTML = "";

  designs.forEach(item => {
    const card = document.createElement("div");
    card.className = "design-card";
    card.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.uploadDate}</p>
    `;
    container.appendChild(card);
  });
}

// ---- PERSONAL PROJECTS ---- //
function renderProjects() {
  const container = document.getElementById("projects-list");
  container.innerHTML = "";

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h4>${project.title}</h4>
      <p>${project.meta}</p>
      <button onclick="openProject('${project.id}')">View</button>
    `;
    container.appendChild(card);
  });
}

function openProject(id) {
  const project = projects.find(p => p.id === id);
  const modal = document.getElementById("project-modal");
  const body = document.getElementById("modal-body");

  body.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.meta}</p>
    <p>${project.description}</p>
  `;

  const related = document.getElementById("related-list");
  related.innerHTML = "";

  const matches = [...writing, ...photos, ...designs].filter(item =>
    item.tags?.some(tag => project.tags.includes(tag))
  );

  matches.forEach(match => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${match.title}</p>`;
    related.appendChild(div);
  });

  modal.style.display = "flex";
}

function closeProjectModal() {
  document.getElementById("project-modal").style.display = "none";
}

// ---- TAGS ---- //
function renderTags() {
  const container = document.getElementById("tag-list");
  container.innerHTML = "";

  tags.forEach(tag => {
    const div = document.createElement("div");
    div.className = "tag-item";
    div.onclick = () => showTagResults(tag);
    div.innerHTML = `<span>${tag}</span>`;
    container.appendChild(div);
  });
}

function showTagResults(tag) {
  const container = document.getElementById("tag-results");
  container.innerHTML = "";

  const all = [...writing, ...photos, ...designs, ...projects];

  const matches = all.filter(item => item.tags?.includes(tag));

  matches.forEach(item => {
    const card = document.createElement("div");
    card.className = "tag-result-card";
    card.innerHTML = `
      <h4>${item.title}</h4>
      <p>${item.uploadDate}</p>
    `;
    container.appendChild(card);
  });
}

// ---- ABOUT ---- //
function renderAbout() {
  document.getElementById("about-content").innerText = aboutMe.body;
}
