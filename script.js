// --- DATA ---

const photos = [
  {
    src: "content/photography/camping.png",
    title: "Camp",
    dateTaken: "22-05-2021",
    uploadDate: "08-06-2025",
device: "iPhone 11 Pro in Night Mode",
    description: "A night of shared stories under the open sky",
    tags: ["camping", "night", "nature"],
    id: "camp-photo"
  },

  {
    src: "content/photography/holi.png",
    title: "Holi",
    dateTaken: "08-03-2023",
    uploadDate: "08-06-2025",
device: "iPhone 13 Pro",
    description: "Do colours on the outside mask our inner demons?",
    tags: ["festival", "colours"],
    id: "holi-photo"
  },

{
  src: "content/photography/Qurbat.png",
  title: "Qurbat", 
  dateTaken: "Circa Summer 2015",
  uploadDate: "11-06-2025", 
  device: "-",
  description: "Like young love in the streets of Gamla Stan",
  tags: ["parents", "love"],
  id: "Qurbat-id"
},

];

const writingPieces = [
  {
    title: "A note to self after completing undergraduation",
    preview: "Will my 21-year old self be proud of who I have become?",
    full: `
      <div class="writing-meta">
        <div class="subtitle" style="font-size:1.1em;color:#888;margin-bottom:0.5em;">
          <em>Will my 21-year old self be proud of who I have become?</em>
        </div>
      </div>
      <p>
        <!-- Replace this with your actual introductory paragraph -->
      lalalallalala
      </p>
      <blockquote style="font-style:italic; border-left: 4px solid #FF6700; margin: 1.5em 0; padding-left: 1em;">
        <span style="display:block;"><em>Enroute Yosemite</em></span>
        <span style="display:block;"><strong>Date:</strong> 21.05.21</span>
        <span style="display:block;"><strong>Time:</strong> 6:54 PDT</span>
        <br>
        I believe that the momentum of change is fueled by the openness of the mind and heart and the willingness to accept that the innumerous avenues of life await the arrival of self-exploration. <br><br>
        Amidst the independence of adult life and becoming increasingly responsible about the choices I make, my time in Yosemite and Lupine campground will constantly remind me of how inherently dependent human life is on air, water, food, sunlight and the dawn. <br><br>
        I hope this experience solidifies my belief that the value of life is in the journeys we take, the relationships we share and the knowledge we gain and impart - and not in material possessions. When we surrender to death, all we take with us is our soul and we leave behind everything else. <br><br>
        At the end of this, I hope that my heart sings more and that my mind thinks deeper. I hope that I become more giving to the people in my life and to nature itself. <br><br>
        I can hardly wait. I am ready to grow.
      </blockquote>
      <p>
        <!-- Replace this with your actual reflection -->
      lalalalalalala
      </p>
      <div style="margin-top:2rem;">
        <img src="content/writing/yosemite.jpg" alt="Handwritten note: Enroute Yosemite" style="max-width:100%;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.1);" />
        <div style="font-size:0.9em;color:#888;margin-top:0.5rem;">My handwritten journal entry</div>
      </div>
    `,
    uploadDate: "09-06-2025",
    tags: ["reflection", "camping", "road-trip"]
  }
];


const designs = [
  // Add your design projects here when ready
];

const projects = [
  {
    title: "30-Day Challenge: Setting my personal best for a 500-meter swim",
    meta: "Skill: Controlled breathing, coordination, endurance • 4/30 Days Complete",
    description: "My progress and thoughts from a month of swimming consistently. This challenge focuses on improving my swimming technique while building endurance through daily practice.",
    progress: 13.33,
    uploadDate: "07-06-2025",
    tags: ["swimming", "endurance", "challenge"],
    id: "swim-challenge"
  }
];

// --- HELPERS ---

function getAllContent() {
  const allContent = [];
  photos.forEach(photo => {
    if (photo.uploadDate) {
      allContent.push({
        category: "Photography",
        title: photo.title,
        uploadDate: photo.uploadDate,
        preview: photo.description,
        id: photo.id,
        type: "photography"
      });
    }
  });
  writingPieces.forEach(piece => {
    if (piece.uploadDate) {
      allContent.push({
        category: "Writing",
        title: piece.title,
        uploadDate: piece.uploadDate,
        preview: piece.preview,
        id: piece.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        type: "writing"
      });
    }
  });
  designs.forEach(design => {
    if (design.uploadDate) {
      allContent.push({
        category: "Product Design",
        title: design.title,
        uploadDate: design.uploadDate,
        preview: design.desc,
        id: design.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        type: "product-design"
      });
    }
  });
  projects.forEach(project => {
    if (project.uploadDate) {
      allContent.push({
        category: "Personal Projects",
        title: project.title,
        uploadDate: project.uploadDate,
        preview: project.description || project.meta,
        id: project.id,
        type: "personal-projects"
      });
    }
  });
  return allContent.sort((a, b) => new Date(b.uploadDate.split('-').reverse().join('-')) - new Date(a.uploadDate.split('-').reverse().join('-'))).slice(0, 6);
}

function formatDate(dateString) {
  if (!dateString) return '';
  return dateString; // Already in DD-MM-YYYY format
}

// --- RENDER FUNCTIONS ---

document.addEventListener('DOMContentLoaded', function() {
  // Tab navigation
  document.querySelectorAll('.tab').forEach(tab => {
    tab.onclick = function() {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    };
  });

  renderLatest();
  renderWriting();
  renderPhotos();
  renderDesigns();
  renderProjects();
  renderTags();
});

// Home - Published Lately (Auto-updating)
function renderLatest() {
  const latestDiv = document.getElementById('latest-posts');
  if (!latestDiv) return;
  const content = getAllContent();
  latestDiv.innerHTML = '';
  content.forEach(post => {
let imagePreview = '';
    if (post.category === "Photography") {
      // Find the actual photo object for the src
      const photoObj = photos.find(p => p.id === post.id);
      if (photoObj) {
        imagePreview = `<img class="latest-photo-preview" src="${photoObj.src}" alt="${photoObj.title}" />`;
      }
    }
    latestDiv.innerHTML += `
      <div class="latest-card" onclick="openContentPage('${post.type}', '${post.id}')">
        <div class="category">${post.category}</div>
        <div class="title">${post.title}</div>
        <div class="date">Published on ${formatDate(post.uploadDate)}</div>
        <div class="preview">${post.preview}</div>
      </div>
    `;
  });
}

// Writing - Sorted by date
function renderWriting() {
  const writingDiv = document.getElementById('writing-list');
  if (!writingDiv) return;
  writingDiv.innerHTML = '';
  const sortedWriting = [...writingPieces].sort((a, b) => 
    new Date(b.uploadDate?.split('-').reverse().join('-')) - new Date(a.uploadDate?.split('-').reverse().join('-'))
  );
  sortedWriting.forEach((piece, idx) => {
    const pieceId = piece.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    writingDiv.innerHTML += `
      <div class="writing-piece" onclick="openContentPage('writing', '${pieceId}')">
        <div class="writing-title">${piece.title}</div>
        <div class="writing-preview">${piece.preview}</div>
        <div class="writing-date">Published on ${formatDate(piece.uploadDate)}</div>
      </div>
    `;
  });
}

// Photography - Chaotic Grid with Lightbox
function renderPhotos() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;
  grid.innerHTML = '';
  currentVisiblePhotos = [...photos];
  photos.forEach((photo, index) => {
    const randomHeight = Math.floor(Math.random() * 3) + 1; // Random height for chaos
    grid.innerHTML += `
      <div class="photo-item" onclick="openLightbox(${index})" style="grid-row-end: span ${randomHeight}">
        <div class="photo-container">
          <img src="${photo.src}" alt="${photo.title}" onerror="this.src='placeholder-image.svg'">
          <div class="photo-overlay">
            <div class="photo-title">${photo.title}</div>
          </div>
        </div>
      </div>
    `;
  });
}

// Product Design
function renderDesigns() {
  const list = document.getElementById('design-list');
  if (!list) return;
  list.innerHTML = '';
  designs.forEach(design => {
    const designId = design.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    list.innerHTML += `
      <div class="design-card" onclick="openContentPage('product-design', '${designId}')">
        <div class="design-title">${design.title}</div>
        <div class="design-meta">${design.meta}</div>
        <div class="design-desc">${design.desc}</div>
        <div class="design-date">Published on ${formatDate(design.uploadDate)}</div>
      </div>
    `;
  });
}

// Personal Projects
function renderProjects() {
  const list = document.getElementById('projects-list');
  if (!list) return;
  list.innerHTML = '';
  projects.forEach(proj => {
    list.innerHTML += `
      <div class="project-card" onclick="openContentPage('personal-projects', '${proj.id}')">
        <div class="project-title">${proj.title}</div>
        <div class="project-meta">${proj.meta}</div>
        <div class="project-progress">
          <div class="project-progress-bar" style="width:${proj.progress}%"></div>
        </div>
        <div class="project-date">Published on ${formatDate(proj.uploadDate)}</div>
      </div>
    `;
  });
}

// Tags functionality
function collectAllTags() {
  const tagMap = {};
  photos.forEach(photo => {
    if (photo.tags) {
      photo.tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push({
          title: photo.title,
          category: "Photography",
          type: "photography",
          id: photo.id
        });
      });
    }
  });
  writingPieces.forEach(piece => {
    if (piece.tags) {
      piece.tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push({
          title: piece.title,
          category: "Writing",
          type: "writing",
          id: piece.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
        });
      });
    }
  });
  designs.forEach(design => {
    if (design.tags) {
      design.tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push({
          title: design.title,
          category: "Product Design",
          type: "product-design",
          id: design.title.toLowerCase().replace(/[^a-z0-9]/g, '-')
        });
      });
    }
  });
  projects.forEach(project => {
    if (project.tags) {
      project.tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push({
          title: project.title,
          category: "Personal Projects",
          type: "personal-projects",
          id: project.id
        });
      });
    }
  });
  return tagMap;
}

function renderTags() {
  const tagList = document.getElementById('tag-list');
  if (!tagList) return;
  const allTags = collectAllTags();
  tagList.innerHTML = '';
  Object.keys(allTags).sort().forEach(tag => {
    tagList.innerHTML += `
      <span class="tag-item" onclick="showTagResults('${tag}')">#${tag}</span>
    `;
  });
}

function showTagResults(selectedTag) {
  const resultsDiv = document.getElementById('tag-results');
  const allTags = collectAllTags();
  const taggedItems = allTags[selectedTag] || [];
  resultsDiv.innerHTML = `<h3>Content tagged with #${selectedTag}</h3>`;
  if (taggedItems.length === 0) {
    resultsDiv.innerHTML += '<p>No content found with this tag.</p>';
    return;
  }
  const resultsList = document.createElement('div');
  resultsList.className = 'tag-results-list';
  taggedItems.forEach(item => {
    resultsList.innerHTML += `
      <div class="tag-result-item" onclick="openContentPage('${item.type}', '${item.id}')">
        ${item.title} | ${item.category}
      </div>
    `;
  });
  resultsDiv.appendChild(resultsList);
}

// Modal functionality for content pages
function openContentPage(contentType, contentId) {
  const modal = document.getElementById('content-modal');
  const modalBody = document.getElementById('modal-body');
  const breadcrumb = document.getElementById('breadcrumb');
  const relatedList = document.getElementById('related-list');
  let content = null;
  let sectionName = '';
  switch(contentType) {
    case 'photography':
      content = photos.find(p => p.id === contentId);
      sectionName = 'Photography';
      break;
    case 'writing':
      content = writingPieces.find(p => p.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === contentId);
      sectionName = 'Writing';
      break;
    case 'product-design':
      content = designs.find(d => d.title.toLowerCase().replace(/[^a-z0-9]/g, '-') === contentId);
      sectionName = 'Product Design';
      break;
    case 'personal-projects':
      content = projects.find(p => p.id === contentId);
      sectionName = 'Personal Projects';
      break;
  }
  if (!content) return;
  breadcrumb.innerHTML = `<a href="#" onclick="closeModal()">Home</a> > <a href="#" onclick="closeModal(); document.querySelector('[data-tab=${contentType}]').click()">${sectionName}</a> > ${content.title}`;
  if (contentType === 'photography') {
    modalBody.innerHTML = `
      <h1>${content.title}</h1>
      <img src="${content.src}" alt="${content.title}" class="modal-image">
      <p><strong>Taken:</strong> ${content.dateTaken}</p>
<p><strong>Device:</strong> ${content.device ? content.device : 'Unknown'}</p>
      <p><strong>Published:</strong> ${formatDate(content.uploadDate)}</p>
      <p>${content.description}</p>
      <div class="modal-tags">
        ${content.tags ? content.tags.map(tag => `<span class="tag" onclick="showTagResults('${tag}')">#${tag}</span>`).join(' ') : ''}
      </div>
    `;
  } else if (contentType === 'writing') {
    modalBody.innerHTML = `
      <h1>${content.title}</h1>
      <p><strong>Published:</strong> ${formatDate(content.uploadDate)}</p>
      <div class="writing-content">${content.full}</div>
      <div class="modal-tags">
        ${content.tags ? content.tags.map(tag => `<span class="tag" onclick="showTagResults('${tag}')">#${tag}</span>`).join(' ') : ''}
      </div>
    `;
  } else if (contentType === 'personal-projects') {
    modalBody.innerHTML = `
      <h1>${content.title}</h1>
      <p><strong>Published:</strong> ${formatDate(content.uploadDate)}</p>
      <div class="project-details">
        <p>${content.meta}</p>
        <div class="project-progress">
          <div class="project-progress-bar" style="width:${content.progress}%"></div>
        </div>
        <p>${content.description}</p>
      </div>
      <div class="modal-tags">
        ${content.tags ? content.tags.map(tag => `<span class="tag" onclick="showTagResults('${tag}')">#${tag}</span>`).join(' ') : ''}
      </div>
    `;
  } else if (contentType === 'product-design') {
    modalBody.innerHTML = `
      <h1>${content.title}</h1>
      <p><strong>Published:</strong> ${formatDate(content.uploadDate)}</p>
      <p>${content.meta}</p>
      <div class="design-content">${content.desc}</div>
      <div class="modal-tags">
        ${content.tags ? content.tags.map(tag => `<span class="tag" onclick="showTagResults('${tag}')">#${tag}</span>`).join(' ') : ''}
      </div>
    `;
  }
  showRelatedContent(content, relatedList);
  modal.style.display = 'block';
}

function showRelatedContent(currentContent, container) {
  if (!currentContent.tags) {
    container.innerHTML = '<p>No related content found.</p>';
    return;
  }
  const allTags = collectAllTags();
  const relatedItems = [];
  currentContent.tags.forEach(tag => {
    if (allTags[tag]) {
      allTags[tag].forEach(item => {
        if (item.id !== currentContent.id) {
          relatedItems.push(item);
        }
      });
    }
  });
  const uniqueRelated = relatedItems.filter((item, index, self) => 
    index === self.findIndex(i => i.id === item.id)
  );
  if (uniqueRelated.length === 0) {
    container.innerHTML = '<p>No related content found.</p>';
    return;
  }
  container.innerHTML = uniqueRelated.map(item => 
    `<div class="related-item" onclick="openContentPage('${item.type}', '${item.id}')">${item.title} | ${item.category}</div>`
  ).join('');
}

function closeModal() {
  document.getElementById('content-modal').style.display = 'none';
}

// Lightbox functionality for photos
function openLightbox(photoIndex) {
  currentPhotoIndex = photoIndex;
  const lightbox = document.getElementById('photo-lightbox');
  updateLightboxContent();
  lightbox.style.display = 'block';
}

function updateLightboxContent() {
  const photo = currentVisiblePhotos[currentPhotoIndex];
  document.getElementById('lightbox-image').src = photo.src;
  document.getElementById('lightbox-title').textContent = photo.title;
  document.getElementById('lightbox-date-taken').textContent = `Taken: ${photo.dateTaken}`;
  document.getElementById('lightbox-date-uploaded').textContent = `Published: ${formatDate(photo.uploadDate)}`;
document.getElementById('lightbox-device').textContent = photo.device ? `Device: ${photo.device}` : '';
  document.getElementById('lightbox-description').textContent = photo.description;
  const tagsContainer = document.getElementById('lightbox-tags');
  if (photo.tags) {
    tagsContainer.innerHTML = photo.tags.map(tag => 
      `<span class="tag" onclick="showTagResults('${tag}')">#${tag}</span>`
    ).join(' ');
  }
}

function previousPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + currentVisiblePhotos.length) % currentVisiblePhotos.length;
  updateLightboxContent();
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % currentVisiblePhotos.length;
  updateLightboxContent();
}

function closeLightbox() {
  document.getElementById('photo-lightbox').style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('content-modal');
  const lightbox = document.getElementById('photo-lightbox');
  if (event.target === modal) {
    closeModal();
  }
  if (event.target === lightbox) {
    closeLightbox();
  }
}
