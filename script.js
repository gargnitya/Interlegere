// All content arrays with proper structure and upload dates
const writingPieces = [
  {
    alpha: "A",
    pieces: [
      {
        id: "abstraction-modern-life",
        title: "Abstraction in Modern Life",
        preview: "Exploring how abstract thought shapes our daily routines...",
        full: "Full article text for 'Abstraction in Modern Life'. Here you can add images of handwritten notes, quotes, and more.",
        uploadDate: "2025-05-31",
        tags: ["philosophy", "modern life", "abstract thought"]
      },
    ],
  },
  {
    alpha: "B",
    pieces: [
      {
        id: "baking-meditation",
        title: "Baking as Meditation",
        preview: "How baking bread became my mindfulness practice.",
        full: "Full article text for 'Baking as Meditation'. Add images or scanned notes here.",
        uploadDate: "2025-05-15",
        tags: ["meditation", "baking", "mindfulness"]
      },
    ],
  },
];

const photos = [
  {
    id: "camp-night",
    src: "content/photography/camping.png",
    title: "Camp",
    dateTaken: "2021-05-22", // Date when photo was actually taken
    uploadDate: "2025-06-08", // Date when uploaded to website
    description: "A night of shared stories under the open sky",
    tags: ["camping", "night", "nature", "gratitude"]
  },
  {
    id: "placeholder-sunlit",
    src: "placeholder-image.svg",
    title: "Sunlit Smile",
    dateTaken: "2024-12-15",
    uploadDate: "2025-01-10",
    description: "Captured a moment of pure joy in golden hour light",
    tags: ["portraits", "golden hour", "happiness"]
  },
  {
    id: "placeholder-urban",
    src: "placeholder-image.svg",
    title: "Urban Abstract",
    dateTaken: "2024-11-20",
    uploadDate: "2025-01-05",
    description: "Geometric patterns found in city architecture",
    tags: ["abstract", "urban", "architecture"]
  },
  {
    id: "placeholder-forest",
    src: "placeholder-image.svg",
    title: "Forest Haze",
    dateTaken: "2024-10-10",
    uploadDate: "2024-12-28",
    description: "Morning mist dancing through the trees",
    tags: ["nature", "mist", "trees", "morning"]
  },
  {
    id: "placeholder-city",
    src: "placeholder-image.svg",
    title: "City Colors",
    dateTaken: "2024-09-05",
    uploadDate: "2024-12-20",
    description: "Vibrant street art reflecting urban energy",
    tags: ["street", "colors", "urban", "art"]
  },
];

const designs = [
  {
    id: "minimalist-lamp",
    title: "Minimalist Desk Lamp",
    meta: "2025 • Tools: Figma, Blender",
    description: "A case study on designing a lamp for small spaces. Includes sketches, prototypes, and final renders.",
    uploadDate: "2025-05-22",
    tags: ["product design", "minimalism", "lighting"]
  },
];

const projects = [
  {
    id: "swimming-challenge",
    title: "30-Day Challenge: Setting my personal best for a 500-meter swim",
    description: "My progress and thoughts from a month of swimming consistently.",
    meta: "Skill: Controlled breathing, coordination, endurance • 1/30 Days Complete",
    progress: 3.33,
    uploadDate: "2025-06-07",
    tags: ["swimming", "challenge", "fitness", "endurance"]
  },
  {
    id: "coding-bootcamp",
    title: "100-Hour Coding Bootcamp",
    description: "Learning web development through intensive practice and projects.",
    meta: "Skill: Coding • 40/100 Hours Complete",
    progress: 40,
    uploadDate: "2025-04-15",
    tags: ["coding", "learning", "web development"]
  },
];

// Function to collect all content with upload dates for "Published Lately"
function getAllContent() {
  let allContent = [];
  
  // Add writing pieces
  writingPieces.forEach(group => {
    group.pieces.forEach(piece => {
      allContent.push({
        id: piece.id,
        type: "Writing",
        title: piece.title,
        preview: piece.preview,
        uploadDate: piece.uploadDate,
        content: piece
      });
    });
  });
  
  // Add photos
  photos.forEach(photo => {
    allContent.push({
      id: photo.id,
      type: "Photography",
      title: photo.title,
      preview: photo.description,
      uploadDate: photo.uploadDate,
      content: photo
    });
  });
  
  // Add designs
  designs.forEach(design => {
    allContent.push({
      id: design.id,
      type: "Product Design",
      title: design.title,
      preview: design.description,
      uploadDate: design.uploadDate,
      content: design
    });
  });
  
  // Add projects
  projects.forEach(project => {
    allContent.push({
      id: project.id,
      type: "Personal Projects",
      title: project.title,
      preview: project.description,
      uploadDate: project.uploadDate,
      content: project
    });
  });
  
  // Sort by upload date (most recent first) and return latest 6
  return allContent.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).slice(0, 6);
}

// Wait for DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function() {
  
  // Tab navigation with error handling
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabs.length > 0) {
    tabs.forEach(tab => {
      tab.onclick = function() {
        // Remove active class from all tabs and content
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const targetContent = document.getElementById(tab.dataset.tab);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      };
    });
  }

  // Initialize all content rendering
  renderLatest();
  renderWriting();
  renderPhotos();
  renderDesigns();
  renderProjects();
  
  // Setup modal functionality
  setupModals();
});

// Home - Published Lately (Auto-updating)
function renderLatest() {
  const latestDiv = document.getElementById('latest-posts');
  if (!latestDiv) {
    console.error('Element with id "latest-posts" not found');
    return;
  }
  
  const latestContent = getAllContent();
  latestDiv.innerHTML = '';
  
  latestContent.forEach(item => {
    const card = document.createElement('div');
    card.className = 'latest-card clickable';
    card.dataset.type = item.type;
    card.dataset.id = item.id;
    
    card.innerHTML = `
      <div class="category">${item.type}</div>
      <div class="title">${item.title}</div>
      <div class="date">Uploaded: ${item.uploadDate}</div>
      <div class="preview">${item.preview}</div>
    `;
    
    // Make card clickable
    card.onclick = () => openContentDetail(item.type, item.id);
    latestDiv.appendChild(card);
  });
}

// Writing - Alphabetical with clickable functionality
function renderWriting() {
  const writingDiv = document.getElementById('writing-list');
  if (!writingDiv) {
    console.error('Element with id "writing-list" not found');
    return;
  }
  
  writingDiv.innerHTML = '';
  writingPieces.forEach(group => {
    const alphaDiv = document.createElement('div');
    alphaDiv.className = 'writing-alpha';
    alphaDiv.textContent = group.alpha;
    writingDiv.appendChild(alphaDiv);
    
    group.pieces.forEach((piece, idx) => {
      const pieceDiv = document.createElement('div');
      pieceDiv.className = 'writing-piece clickable';
      pieceDiv.dataset.alpha = group.alpha;
      pieceDiv.dataset.idx = idx;
      pieceDiv.dataset.id = piece.id;
      
      pieceDiv.innerHTML = `
        <div class="writing-title">${piece.title}</div>
        <div class="writing-preview">${piece.preview}</div>
        <div class="writing-full" style="display: none;">${piece.full}</div>
      `;
      
      // Make piece clickable to expand
      pieceDiv.onclick = function() {
        const fullDiv = pieceDiv.querySelector('.writing-full');
        const isOpen = fullDiv.style.display === 'block';
        
        if (isOpen) {
          fullDiv.style.display = 'none';
          pieceDiv.classList.remove('open');
        } else {
          fullDiv.style.display = 'block';
          pieceDiv.classList.add('open');
        }
      };
      
      writingDiv.appendChild(pieceDiv);
    });
  });
}

// Photography - Chaotic Grid with full image display and lightbox
function renderPhotos() {
  const grid = document.getElementById('photo-grid');
  if (!grid) {
    console.error('Element with id "photo-grid" not found');
    return;
  }
  
  grid.innerHTML = '';
  
  photos.forEach(photo => {
    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo-item';
    photoDiv.dataset.id = photo.id;
    
    // Create image element with error handling
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.title;
    img.loading = 'lazy';
    img.onerror = function() {
      this.src = 'placeholder-image.svg';
    };
    
    // Add click handler for lightbox
    img.onclick = () => openPhotoLightbox(photo);
    
    const caption = document.createElement('div');
    caption.className = 'photo-caption';
    caption.textContent = photo.title;
    
    photoDiv.appendChild(img);
    photoDiv.appendChild(caption);
    grid.appendChild(photoDiv);
  });
}

// Product Design
function renderDesigns() {
  const list = document.getElementById('design-list');
  if (!list) {
    console.error('Element with id "design-list" not found');
    return;
  }
  
  list.innerHTML = '';
  designs.forEach(design => {
    const card = document.createElement('div');
    card.className = 'design-card clickable';
    card.dataset.id = design.id;
    
    card.innerHTML = `
      <div class="design-title">${design.title}</div>
      <div class="design-meta">${design.meta}</div>
      <div class="design-desc">${design.description}</div>
    `;
    
    // Make card clickable
    card.onclick = () => openContentDetail('Product Design', design.id);
    list.appendChild(card);
  });
}

// Personal Projects (removed public/private toggle)
function renderProjects() {
  const list = document.getElementById('projects-list');
  if (!list) {
    console.error('Element with id "projects-list" not found');
    return;
  }
  
  list.innerHTML = '';
  projects.forEach((proj, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card clickable';
    card.dataset.id = proj.id;
    
    card.innerHTML = `
      <div class="project-title">${proj.title}</div>
      <div class="project-meta">${proj.meta}</div>
      <div class="project-progress">
        <div class="project-progress-bar" style="width:${proj.progress}%"></div>
      </div>
    `;
    
    // Make card clickable
    card.onclick = () => openContentDetail('Personal Projects', proj.id);
    list.appendChild(card);
  });
}

// Photo lightbox functionality
function openPhotoLightbox(photo) {
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDateTaken = document.getElementById('lightbox-date-taken');
  const lightboxDescription = document.getElementById('lightbox-description');
  const lightboxTags = document.getElementById('lightbox-tags');
  
  if (lightbox && lightboxImage) {
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.title;
    lightboxTitle.textContent = photo.title;
    lightboxDateTaken.textContent = `Taken: ${photo.dateTaken}`;
    lightboxDescription.textContent = photo.description;
    
    // Display tags
    lightboxTags.innerHTML = '';
    if (photo.tags && photo.tags.length > 0) {
      photo.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = `#${tag}`;
        lightboxTags.appendChild(tagSpan);
      });
    }
    
    lightbox.style.display = 'flex';
  }
}

// Content detail modal functionality
function openContentDetail(type, id) {
  let content = null;
  
  // Find content based on type and id
  switch (type) {
    case 'Writing':
      writingPieces.forEach(group => {
        const piece = group.pieces.find(p => p.id === id);
        if (piece) content = piece;
      });
      break;
    case 'Photography':
      content = photos.find(p => p.id === id);
      break;
    case 'Product Design':
      content = designs.find(d => d.id === id);
      break;
    case 'Personal Projects':
      content = projects.find(p => p.id === id);
      break;
  }
  
  if (content) {
    const modal = document.getElementById('content-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (modal && modalBody) {
      // Generate modal content based on type
      let modalContent = '';
      
      if (type === 'Writing') {
        modalContent = `
          <h2>${content.title}</h2>
          <p><strong>Upload Date:</strong> ${content.uploadDate}</p>
          <div class="tags">
            ${content.tags ? content.tags.map(tag => `<span class="tag">#${tag}</span>`).join('') : ''}
          </div>
          <div class="content-body">${content.full}</div>
        `;
      } else if (type === 'Photography') {
        modalContent = `
          <h2>${content.title}</h2>
          <img src="${content.src}" alt="${content.title}" style="max-width: 100%; height: auto;">
          <p><strong>Date Taken:</strong> ${content.dateTaken}</p>
          <p><strong>Upload Date:</strong> ${content.uploadDate}</p>
          <p>${content.description}</p>
          <div class="tags">
            ${content.tags ? content.tags.map(tag => `<span class="tag">#${tag}</span>`).join('') : ''}
          </div>
        `;
      } else if (type === 'Product Design') {
        modalContent = `
          <h2>${content.title}</h2>
          <p><strong>Details:</strong> ${content.meta}</p>
          <p><strong>Upload Date:</strong> ${content.uploadDate}</p>
          <div class="tags">
            ${content.tags ? content.tags.map(tag => `<span class="tag">#${tag}</span>`).join('') : ''}
          </div>
          <div class="content-body">${content.description}</div>
        `;
      } else if (type === 'Personal Projects') {
        modalContent = `
          <h2>${content.title}</h2>
          <p><strong>Details:</strong> ${content.meta}</p>
          <p><strong>Upload Date:</strong> ${content.uploadDate}</p>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${content.progress}%"></div>
          </div>
          <div class="tags">
            ${content.tags ? content.tags.map(tag => `<span class="tag">#${tag}</span>`).join('') : ''}
          </div>
          <div class="content-body">${content.description}</div>
        `;
      }
      
      modalBody.innerHTML = modalContent;
      modal.style.display = 'flex';
    }
  }
}

// Setup modal close functionality
function setupModals() {
  // Photo lightbox close
  const lightboxClose = document.querySelector('#photo-lightbox .close-btn');
  const lightbox = document.getElementById('photo-lightbox');
  
  if (lightboxClose && lightbox) {
    lightboxClose.onclick = () => {
      lightbox.style.display = 'none';
    };
    
    lightbox.onclick = (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    };
  }
  
  // Content modal close
  const modalClose = document.querySelector('#content-modal .close-modal');
  const modal = document.getElementById('content-modal');
  
  if (modalClose && modal) {
    modalClose.onclick = () => {
      modal.style.display = 'none';
    };
    
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
  
  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
      }
      if (modal && modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    }
  });
}
