// ─── STATE ───────────────────────────────────────────────────
// Stack of views: each entry is { view, context }
let navStack = [];

// ─── VIEW REGISTRY ───────────────────────────────────────────
const views = {
  landing:        document.getElementById('view-landing'),
  articles:       document.getElementById('view-articles'),
  photography:    document.getElementById('view-photography'),
  bio:            document.getElementById('view-bio'),
  vice:           document.getElementById('view-vice'),
  exhibitions:    document.getElementById('view-exhibitions'),
  independent:    document.getElementById('view-independent'),
  'photo-detail': document.getElementById('view-photo-detail'),
};

function showView(id, pushState = true) {
  Object.values(views).forEach(v => v && v.classList.remove('active'));
  if (views[id]) views[id].classList.add('active');
  window.scrollTo(0, 0);
  closeMenu();
}

function navigateTo(id, context) {
  navStack.push(id);
  showView(id);
  if (context) renderDetail(id, context);
}

function goBack() {
  navStack.pop();
  const prev = navStack[navStack.length - 1] || 'landing';
  showView(prev);
  // Re-render if needed
  if (prev === 'photo-detail') {
    // handled by renderDetail already in stack — just show
  }
}

// ─── HAMBURGER ───────────────────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const menuOverlay = document.getElementById('menu-overlay');

function openMenu()  { hamburger.classList.add('open');    menuOverlay.classList.add('open'); }
function closeMenu() { hamburger.classList.remove('open'); menuOverlay.classList.remove('open'); }

hamburger.addEventListener('click', () =>
  hamburger.classList.contains('open') ? closeMenu() : openMenu()
);

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// ─── DATA ─────────────────────────────────────────────────────
const photoData = {
  // ── VICE PROJECTS ──────────────────────────────────────────
  queer: {
    title: 'Queer in the Dutch Countryside',
    tag: 'VICE',
    type: 'masonry',
    items: [{ h: 420 }, { h: 300 }, { h: 380 }, { h: 310 }, { h: 460 }, { h: 280 }],
  },
  glitz: {
    title: 'From Glitz to Glory',
    tag: 'VICE',
    type: 'masonry',
    items: [{ h: 380 }, { h: 440 }, { h: 300 }, { h: 410 }, { h: 350 }, { h: 290 }],
  },
  barbes: {
    title: 'Histoires de Quartiers: Barbès',
    tag: 'VICE',
    type: 'masonry',
    items: [{ h: 400 }, { h: 320 }, { h: 460 }, { h: 280 }, { h: 390 }, { h: 340 }],
  },
  florence: {
    title: 'Florence Road Concert',
    tag: 'VICE',
    type: 'masonry',
    items: [{ h: 360 }, { h: 450 }, { h: 310 }, { h: 420 }, { h: 280 }, { h: 400 }],
  },
  arnhem: {
    title: 'Arnhem Unfiltered',
    tag: 'VICE',
    type: 'masonry',
    items: [{ h: 440 }, { h: 300 }, { h: 380 }, { h: 460 }, { h: 320 }, { h: 350 }],
  },
  // ── EXHIBITIONS ────────────────────────────────────────────
  ribs: {
    title: 'Ribs',
    tag: 'Fotomuseum Amsterdam',
    type: 'masonry',
    items: [{ h: 480 }, { h: 320 }, { h: 400 }, { h: 360 }, { h: 440 }, { h: 290 }],
  },
  kigali: {
    title: 'Kigali Street Fashion',
    tag: 'Meervaart Theater',
    type: 'masonry',
    items: [{ h: 420 }, { h: 380 }, { h: 300 }, { h: 460 }, { h: 310 }, { h: 390 }],
  },
  stateofpower: {
    title: 'The State of Power',
    tag: 'Meervaart Theater',
    type: 'masonry',
    items: [{ h: 350 }, { h: 440 }, { h: 310 }, { h: 400 }, { h: 280 }, { h: 420 }],
  },
  // ── INDEPENDENT ────────────────────────────────────────────
  kennemerland: {
    title: 'Kennemerland 2025',
    tag: null,
    type: 'strip',
    items: [{ w: 480 }, { w: 320 }, { w: 560 }, { w: 400 }, { w: 480 }],
  },
  iseo: {
    title: 'Iseo 2025',
    tag: null,
    type: 'strip',
    items: [{ w: 520 }, { w: 400 }, { w: 480 }, { w: 360 }, { w: 440 }],
  },
  zandvoort: {
    title: 'Zandvoort 2023',
    tag: null,
    type: 'strip',
    items: [{ w: 460 }, { w: 380 }, { w: 520 }, { w: 420 }, { w: 360 }],
  },
  greece: {
    title: 'Greece 2024',
    tag: null,
    type: 'strip',
    items: [{ w: 500 }, { w: 360 }, { w: 480 }, { w: 440 }, { w: 400 }],
  },
  // ── GALLERIES ──────────────────────────────────────────────
  gallery_fashion: {
    title: 'Fashion',
    tag: null,
    type: 'masonry',
    items: [{ h: 480 }, { h: 320 }, { h: 400 }, { h: 360 }, { h: 440 }, { h: 300 }, { h: 380 }, { h: 460 }, { h: 290 }],
  },
  gallery_documentary: {
    title: 'Documentary',
    tag: null,
    type: 'masonry',
    items: [{ h: 420 }, { h: 350 }, { h: 460 }, { h: 310 }, { h: 390 }, { h: 440 }, { h: 280 }, { h: 400 }, { h: 320 }],
  },
  gallery_street: {
    title: 'Street Photography',
    tag: null,
    type: 'masonry',
    items: [{ h: 400 }, { h: 460 }, { h: 310 }, { h: 440 }, { h: 360 }, { h: 290 }, { h: 420 }, { h: 340 }, { h: 380 }],
  },
};

// ─── DETAIL RENDERER ─────────────────────────────────────────
const detailTitle   = document.getElementById('detail-title');
const detailTag     = document.getElementById('detail-tag');
const detailContent = document.getElementById('detail-content');

function renderDetail(view, key) {
  const data = photoData[key];
  if (!data) return;

  detailTitle.textContent = data.title;
  detailTag.textContent   = data.tag || '';
  detailContent.innerHTML = '';

  if (data.type === 'masonry') {
    const grid = document.createElement('div');
    grid.className = 'masonry';
    data.items.forEach(item => {
      const div = document.createElement('div');
      if (item.src) {
        div.className = 'masonry-item';
        const img = document.createElement('img');
        img.src = item.src; img.alt = '';
        div.appendChild(img);
      } else {
        div.className = 'masonry-placeholder';
        div.style.height = item.h + 'px';
      }
      grid.appendChild(div);
    });
    detailContent.appendChild(grid);
  }

  if (data.type === 'strip') {
    // Independent: each item is a named strip
    const wrapper = document.createElement('div');
    wrapper.style.paddingBottom = '4rem';
    const stripDiv = document.createElement('div');
    stripDiv.className = 'strip';
    data.items.forEach(item => {
      if (item.src) {
        const img = document.createElement('img');
        img.className = 'strip-img';
        img.src = item.src; img.alt = '';
        stripDiv.appendChild(img);
      } else {
        const ph = document.createElement('div');
        ph.className = 'strip-placeholder';
        ph.style.width = item.w + 'px';
        stripDiv.appendChild(ph);
      }
    });
    wrapper.appendChild(stripDiv);
    detailContent.appendChild(wrapper);
  }
}

// ─── INDEPENDENT RENDERER ────────────────────────────────────
// Independent page shows all strips at once, not via detail view
function renderIndependent() {
  const container = document.getElementById('independent-content');
  if (!container) return;
  container.innerHTML = '';

  const strips = ['kennemerland', 'iseo', 'zandvoort', 'greece'];
  strips.forEach(key => {
    const data = photoData[key];
    const section = document.createElement('div');
    section.className = 'strip-section';

    const title = document.createElement('div');
    title.className = 'strip-title'; title.style.fontVariant = 'normal'; title.style.textTransform = 'none';
    title.textContent = data.title;
    section.appendChild(title);

    const strip = document.createElement('div');
    strip.className = 'strip';
    data.items.forEach(item => {
      if (item.src) {
        const img = document.createElement('img');
        img.className = 'strip-img';
        img.src = item.src; img.alt = '';
        strip.appendChild(img);
      } else {
        const ph = document.createElement('div');
        ph.className = 'strip-placeholder';
        ph.style.width = item.w + 'px';
        strip.appendChild(ph);
      }
    });
    section.appendChild(strip);
    container.appendChild(section);
  });
}

// ─── CLICK WIRING ────────────────────────────────────────────
document.addEventListener('click', e => {
  const el = e.target.closest('[data-nav]');
  if (!el) return;
  e.preventDefault();

  const target = el.dataset.nav;
  const ctx    = el.dataset.ctx;

  if (target === 'back') {
    goBack();
    return;
  }

  if (target === 'independent') {
    navStack.push('independent');
    showView('independent');
    renderIndependent();
    return;
  }

  if (target === 'photo-detail' && ctx) {
    navStack.push('photo-detail');
    showView('photo-detail');
    renderDetail('photo-detail', ctx);
    return;
  }

  navStack = [target];
  navigateTo(target);
});



// ─── INIT ─────────────────────────────────────────────────────
navStack = ['landing'];
showView('landing');
