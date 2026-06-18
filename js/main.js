// ─── ROUTER ──────────────────────────────────────────────────
const pages = {
  landing:     document.getElementById('page-landing'),
  articles:    document.getElementById('page-articles'),
  photography: document.getElementById('page-photography'),
  bio:         document.getElementById('page-bio'),
};

const seriesDetail = document.getElementById('series-detail');
const photoGrid    = document.getElementById('photo-grid-view');

function showPage(id) {
  Object.values(pages).forEach(p => p && p.classList.remove('active'));
  if (pages[id]) pages[id].classList.add('active');
  closeMenu();
  window.scrollTo(0, 0);

  // Reset series detail if leaving photography
  if (id !== 'photography') {
    seriesDetail && seriesDetail.classList.remove('active');
    photoGrid    && photoGrid.classList.remove('hidden');
  }
}

// ─── HAMBURGER ───────────────────────────────────────────────
const hamburger    = document.getElementById('hamburger');
const menuOverlay  = document.getElementById('menu-overlay');

function openMenu() {
  hamburger.classList.add('open');
  menuOverlay.classList.add('open');
}

function closeMenu() {
  hamburger.classList.remove('open');
  menuOverlay.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ─── LANDING NAV ─────────────────────────────────────────────
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showPage(el.dataset.page);
  });
});

// ─── SERIES DETAIL ───────────────────────────────────────────
const seriesTitle = document.getElementById('series-title');
const seriesTag   = document.getElementById('series-tag');
const masonryGrid = document.getElementById('masonry-grid');

// Series data — replace placeholder heights with real images when you have them
const seriesData = {
  queer: {
    title: 'Queer in the Dutch Countryside',
    tag: 'VICE',
    // Each item: { src, alt } or { height } for placeholder
    items: [
      { height: 420 }, { height: 300 }, { height: 380 },
      { height: 310 }, { height: 460 }, { height: 280 },
    ]
  },
  concert: {
    title: 'Concert Photography',
    tag: 'VICE',
    items: [
      { height: 360 }, { height: 440 }, { height: 310 },
      { height: 390 }, { height: 280 }, { height: 420 },
    ]
  },
  fashion: {
    title: 'Fashion',
    tag: 'VICE',
    items: [
      { height: 480 }, { height: 320 }, { height: 400 },
      { height: 290 }, { height: 460 }, { height: 350 },
    ]
  },
  street: {
    title: 'Street Photography',
    tag: 'VICE',
    items: [
      { height: 340 }, { height: 420 }, { height: 300 },
      { height: 400 }, { height: 360 }, { height: 280 },
    ]
  },
  foam: {
    title: 'Foam',
    tag: 'FOAM MUSEUM',
    items: [
      { height: 400 }, { height: 320 }, { height: 460 },
      { height: 350 }, { height: 390 }, { height: 310 },
    ]
  },
  meervaart: {
    title: 'Meervaart Theater',
    tag: 'MEERVAART',
    items: [
      { height: 380 }, { height: 450 }, { height: 310 },
      { height: 420 }, { height: 300 }, { height: 370 },
    ]
  },
  independent: {
    title: 'Independent Work',
    tag: null,
    items: [
      { height: 440 }, { height: 310 }, { height: 390 },
      { height: 280 }, { height: 460 }, { height: 340 },
      { height: 320 }, { height: 400 }, { height: 360 },
    ]
  },
};

document.querySelectorAll('[data-series]').forEach(el => {
  el.addEventListener('click', () => {
    const key  = el.dataset.series;
    const data = seriesData[key];
    if (!data) return;

    // Populate header
    seriesTitle.textContent = data.title;
    seriesTag.textContent   = data.tag || '';

    // Build masonry
    masonryGrid.innerHTML = '';
    data.items.forEach(item => {
      const div = document.createElement('div');
      if (item.src) {
        div.className = 'masonry-item';
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt || '';
        div.appendChild(img);
      } else {
        div.className = 'masonry-placeholder';
        div.style.height = item.height + 'px';
      }
      masonryGrid.appendChild(div);
    });

    photoGrid.classList.add('hidden');
    seriesDetail.classList.add('active');
    window.scrollTo(0, 0);
  });
});

document.getElementById('series-back').addEventListener('click', () => {
  seriesDetail.classList.remove('active');
  photoGrid.classList.remove('hidden');
  window.scrollTo(0, 0);
});

// ─── CONTACT FORM ─────────────────────────────────────────────
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sent';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ─── INIT ─────────────────────────────────────────────────────
showPage('landing');
