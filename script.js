// Sample data for demonstration
const latestPosts = [
  {
    category: "Writing",
    title: "Abstraction in Modern Life",
    date: "2025-05-31",
    preview: "Exploring how abstract thought shapes our daily routines...",
  },
  {
    category: "Photography",
    title: "Night Walks",
    date: "2025-05-28",
    preview: "A photo series from midnight strolls in the city.",
  },
  {
    category: "Product Design",
    title: "Minimalist Desk Lamp",
    date: "2025-05-22",
    preview: "A case study on designing a lamp for small spaces.",
  },
  {
    category: "Personal Projects",
    title: "30-Day Challenge: Setting my personal best for a 500-meter swim",
    date: "2025-06-07",
    preview: "My progress and thoughts from a month of swimming consistently.",
  },
  {
    category: "Writing",
    title: "Baking as Meditation",
    date: "2025-05-15",
    preview: "How baking bread became my mindfulness practice.",
  },
  {
    category: "Photography",
    title: "Color Chaos",
    date: "2025-05-10",
    preview: "Vivid street scenes and spontaneous moments.",
  },
];

const writingPieces = [
  {
    alpha: "A",
    pieces: [
      {
        title: "Abstraction in Modern Life",
        preview: "Exploring how abstract thought shapes our daily routines...",
        full: "Full article text for 'Abstraction in Modern Life'. Here you can add images of handwritten notes, quotes, and more.",
      },
    ],
  },
  {
    alpha: "B",
    pieces: [
      {
        title: "Baking as Meditation",
        preview: "How baking bread became my mindfulness practice.",
        full: "Full article text for 'Baking as Meditation'. Add images or scanned notes here.",
      },
    ],
  },
];

const photos = [
  {
    src: "placeholder-image.svg",
    caption: "Late Night Crossing",
    category: "street",
  },
  {
    src: "placeholder-image.svg",
    caption: "Sunlit Smile",
    category: "portraits",
  },
  {
    src: "placeholder-image.svg",
    caption: "Urban Abstract",
    category: "abstract",
  },
  {
    src: "placeholder-image.svg",
    caption: "Forest Haze",
    category: "nature",
  },
  {
    src: "placeholder-image.svg",
    caption: "City Colors",
    category: "street",
  },
];

const designs = [
  {
    title: "Minimalist Desk Lamp",
    meta: "2025 • Tools: Figma, Blender",
    desc: "A case study on designing a lamp for small spaces. Includes sketches, prototypes, and final renders.",
  },
];

const projects = [
  {
    title: "30-Day Challenge: Setting my personal best for a 500-meter swim",
    meta: "Skill: Controlled breathing, coordination, endurance • 1/30 Days Complete",
    progress: 3.33,
    public: true,
  },
  {
    title: "100-Hour Coding Bootcamp",
    meta: "Skill: Coding • 40/100 Hours Complete",
    progress: 40,
    public: false,
  },
];

// Tab navigation
document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = function() {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  };
});

// Home - Published Lately
function renderLatest() {
  const latestDiv = document.getElementById('latest-posts');
  latestDiv.innerHTML = '';
  latestPosts.forEach(post => {
    latestDiv.innerHTML += `
      <div class="latest-card">
        <div class="category">${post.category}</div>
        <div class="title">${post.title}</div>
        <div class="date">${post.date}</div>
        <div class="preview">${post.preview}</div>
      </div>
    `;
  });
}

// Writing - Alphabetical
function renderWriting() {
  const writingDiv = document.getElementById('writing-list');
  writingDiv.innerHTML = '';
  writingPieces.forEach(group => {
    writingDiv.innerHTML += `<div class="writing-alpha">${group.alpha}</div>`;
    group.pieces.forEach((piece, idx) => {
      writingDiv.innerHTML += `
        <div class="writing-piece" data-alpha="${group.alpha}" data-idx="${idx}">
          <div class="writing-title">${piece.title}</div>
          <div class="writing-preview">${piece.preview}</div>
          <div class="writing-full">${piece.full}</div>
        </div>
      `;
    });
  });
  // Expand/collapse
  document.querySelectorAll('.writing-piece').forEach(piece => {
    piece.onclick = function() {
      piece.classList.toggle('open');
    };
  });
}

// Photography - Chaotic Grid
function renderPhotos(filter = 'all') {
  const grid = document.getElementById('photo-grid');
  grid.innerHTML = '';
  photos.filter(p => filter === 'all' || p.category === filter)
    .forEach(photo => {
      grid.innerHTML += `
        <div class="photo-item">
          <img src="${photo.src}" alt="${photo.caption}">
          <div class="photo-caption">${photo.caption}</div>
        </div>
      `;
    });
}
document.querySelectorAll('.photo-filters button').forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll('.photo-filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPhotos(btn.dataset.filter);
  };
});

// Product Design
function renderDesigns() {
  const list = document.getElementById('design-list');
  list.innerHTML = '';
  designs.forEach(design => {
    list.innerHTML += `
      <div class="design-card">
        <div class="design-title">${design.title}</div>
        <div class="design-meta">${design.meta}</div>
        <div class="design-desc">${design.desc}</div>
      </div>
    `;
  });
}

// Personal Projects
function renderProjects() {
  const list = document.getElementById('projects-list');
  list.innerHTML = '';
  projects.forEach((proj, idx) => {
    list.innerHTML += `
      <div class="project-card">
        <div class="project-title">${proj.title}</div>
        <div class="project-meta">${proj.meta}</div>
        <div class="project-progress">
          <div class="project-progress-bar" style="width:${proj.progress}%"></div>
        </div>
        <div class="toggle-switch">
          <span class="toggle-label">${proj.public ? 'Public' : 'Private'}</span>
          <div class="toggle-btn${proj.public ? ' on' : ''}" data-idx="${idx}">
            <div class="toggle-knob"></div>
          </div>
        </div>
      </div>
    `;
  });
  // Toggle functionality
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.onclick = function(e) {
      const i = btn.dataset.idx;
      projects[i].public = !projects[i].public;
      renderProjects();
    };
  });
}

// Initial render
renderLatest();
renderWriting();
renderPhotos();
renderDesigns();
renderProjects();
