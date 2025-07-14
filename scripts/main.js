function isMobile() {
return (
    ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
    window.innerWidth <= 768 
);
}

function setupVideoFollow() {
    const selfGif = document.getElementById("self-gif");
    const video = document.getElementById("gif");
  
    if (!selfGif || !video) return;
  
    selfGif.addEventListener("mousemove", (e) => {
      video.style.left = `${e.clientX + 15}px`;
      video.style.top = `${e.clientY + 15}px`;
    });
  
    selfGif.addEventListener("mouseenter", () => {
      video.style.display = "block";
    });
  
    selfGif.addEventListener("mouseleave", () => {
      video.style.display = "none";
    });
  }

if (isMobile()) {
    const video = document.getElementById("gif");
    const blocker = document.getElementById("mobile-blocker");
    
    video.remove();
    blocker.classList.remove("hidden");
    blocker.classList.add("flex");
} else {
    setupVideoFollow();
}

const bracketItems = document.querySelectorAll('.bracket-item');

bracketItems.forEach(function(item) {
    item.addEventListener('click', function() {
        bracketItems.forEach(function(bracket) {
            bracket.classList.remove('underlined');
        });
        this.classList.add('underlined');
    });
});

document.querySelectorAll('.rotating-logo').forEach(logo => {
  let angle = 0;
  let animationFrameId = null;

  function rotate() {
    angle = (angle + 1.6) % 360;
    logo.style.transform = `rotate(${angle}deg)`;
    animationFrameId = requestAnimationFrame(rotate);
  }

  logo.addEventListener('mouseenter', () => {
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(rotate);
    }
  });

  logo.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  });
});

function makeCard(meta, authors, title, href = '#') {
  return `
     <div class="scroll-item"><a href="${href}"</a>
      <div class="meta">${meta}</div>
      <div class="authors">${authors}</div>
      <div class="title">${title}</div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  // Content for each section
  const sectionContents = {
    all: `<div class="bracket-content"><p></p></div>`,
    code: `<div class="bracket-content"><p></p></div>`,
    audio: `
      <div class="scroll-container">
        ${makeCard("AUD &#903; CURATED", "Chris Williamson and Naval Ravikant", "PODCAST: 44 HARSH TRUTHS TO IMPROVE YOUR LIFE", "https://www.youtube.com/watch?v=KyfUysrNaco")}
      </div>
    `
  };

  function loadSection(page) {
    // Update active state
    document.querySelectorAll('.bracket-item').forEach(i => {
      i.classList.toggle('underlined', i.dataset.page === page);
    });
    
    // Insert/replace dynamic content
    const container = document.getElementById('dynamic-content');
    container.innerHTML = sectionContents[page] || '';
  }

  document.querySelectorAll('.bracket-item[data-page]').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      loadSection(this.dataset.page);
    });
  });

  // Handle other nav items
  document.querySelectorAll('.nav-item:not([data-page])').forEach(item => {
    item.addEventListener('click', function() {
      document.getElementById('dynamic-content').innerHTML = '';
      document.querySelectorAll('.bracket-item').forEach(i => {
        i.classList.remove('underlined');
      });
    });
  });

  // Load 'All' section by default on initial page load
  const defaultSection = 'all';
  loadSection(defaultSection);
  
  // Optional: Find and highlight the 'All' button in navbar
  const allButton = document.querySelector('.bracket-item[data-page="all"]');
  if (allButton) {
    allButton.classList.add('underlined');
  }
});