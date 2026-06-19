// ─── STATE ───────────────────────────────────────────────────
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

const navEl = document.querySelector('nav');

function showView(id) {
  Object.values(views).forEach(v => v && v.classList.remove('active'));
  if (views[id]) views[id].classList.add('active');
  window.scrollTo(0, 0);
  closeMenu();
  navEl.style.display = id === 'landing' ? 'none' : '';
}

function goBack() {
  navStack.pop();
  showView(navStack[navStack.length - 1] || 'landing');
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

// ─── BASE URL ─────────────────────────────────────────────────
const BASE = 'https://cdn.jsdelivr.net/gh/tal-benyakir/portfolio-images@main/images';

function imgs(folder, filenames) {
  return filenames.map(f => ({ src: `${BASE}/${folder}/${f}` }));
}

// ─── DATA ─────────────────────────────────────────────────────
const photoData = {
  // ── VICE ───────────────────────────────────────────────────
  queer: {
    title: 'Queer in the Dutch Countryside', tag: 'VICE', type: 'masonry',
    items: imgs('vice/queer', [
      '01 (1).jpg','01 (2).jpg','01 (3).jpg','01 (4).jpg','01 (5).jpg','01 (6).jpg',
      '01 (7).jpg','01 (9).jpg','01 (10).jpg','01 (11).jpg','01 (12).jpg','01 (14).jpg',
      '01 (15).jpg','01 (17).jpg','01 (21).jpg','001 (16).jpg'
    ]),
  },
  glitz: {
    title: 'From Glitz to Glory', tag: 'VICE', type: 'masonry',
    items: imgs('vice/glitz', [
      '0.jpg','1.jpg','2.jpg','3.jpg','4.jpg','5.jpg',
      '7.jpg','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg'
    ]),
  },
  barbes: {
    title: 'Histoires de Quartiers: Barbès', tag: 'VICE', type: 'masonry',
    items: imgs('vice/barbes', [
      '01 (1).jpg','01 (2).jpg','01 (3).jpg','01 (4).jpg','01 (5).jpg','01 (6).jpg','01 (7).jpg'
    ]),
  },
  florence: {
    title: 'Florence Road Concert', tag: 'VICE', type: 'masonry',
    items: imgs('vice/florence', [
      '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.jpg','10.jpg'
    ]),
  },
  arnhem: {
    title: 'Arnhem Unfiltered', tag: 'VICE', type: 'masonry',
    items: imgs('vice/arnhem', [
      '01 (1).jpg','01 (2).jpg','01 (3).jpg','01 (4).jpg','01 (5).jpg','01 (6).jpg',
      '01 (7).jpg','01 (8).jpg','01 (9).jpg','01 (10).jpg','01 (11).jpg','01 (12).jpg',
      '01 (13).jpg','01 (14).jpg'
    ]),
  },
  // ── EXHIBITIONS ────────────────────────────────────────────
  ribs: {
    title: 'Ribs', tag: 'Fotomuseum Amsterdam', type: 'masonry',
    items: imgs('exhibitions/ribs', [
      '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'
    ]),
  },
  kigali: {
    title: 'Kigali Street Fashion', tag: 'Meervaart Theater', type: 'masonry',
    items: imgs('exhibitions/kigali', [
      '01 (1).JPG','01 (2).jpg','01 (3).jpg','01 (4).jpg'
    ]),
  },
  stateofpower: {
    title: 'The State of Power', tag: 'Meervaart Theater', type: 'masonry',
    items: imgs('exhibitions/stateofpower', [
      '01 (1).jpg','01 (2).jpg','01 (3).jpg','01 (4).jpg'
    ]),
  },
  // ── INDEPENDENT ────────────────────────────────────────────
  kennemerland: {
    title: 'Kennemerland 2025', tag: null, type: 'strip',
    items: imgs('independent/kennemerland', [
      '1 (1).jpg','1 (2).jpg','1 (3).jpg','1 (4).jpg','1 (5).jpg',
      '1 (6).jpg','1 (8).jpg','1 (10).jpg','1 (11).jpg'
    ]),
  },
  iseo: {
    title: 'Iseo 2025', tag: null, type: 'strip',
    items: imgs('independent/iseo', [
      '0.jpg','01.jpg','02.jpg','03.jpg','04.jpg','05.jpg','06.jpg','07.jpg','08.jpg','09.jpg'
    ]),
  },
  zandvoort: {
    title: 'Zandvoort 2023', tag: null, type: 'strip',
    items: imgs('independent/zandvoort', [
      '01-1.jpg','01-2.jpg','01-3.jpg','01-4.jpg','01-5.jpg','01-6.jpg'
    ]),
  },
  // ── GALLERIES ──────────────────────────────────────────────
  gallery_fashion: {
    title: 'Fashion', tag: null, type: 'masonry',
    items: imgs('galleries/fashion', [
      '01 (1).jpg','01 (4).jpg','01 (5).jpg','01 (6).jpg','01 (7).jpg',
      '01 (8).jpg','01 (9).jpg','01 (10).jpg','01 (11).jpg','01 (12).jpg'
    ]),
  },
  gallery_documentary: {
    title: 'Events', tag: null, type: 'masonry',
    items: imgs('galleries/documentary', [
      '01 (1).jpg','01 (2).jpg','01 (3).jpg','01 (4).jpg','01 (5).jpg','01 (6).jpg','01 (7).jpg',
      '01 (8).jpg','01 (9).jpg','01 (10).jpg','01 (11).jpg','01 (12).jpg','01 (13).jpg',
      '01 (14).jpg','01 (15).jpg','01 (16).jpg','01 (17).jpg','01 (18).jpg','01 (19).jpg',
      '01 (20).jpg','01 (21).jpg'
    ]),
  },
  gallery_street: {
    title: 'Street Photography', tag: null, type: 'masonry',
    items: imgs('galleries/street', [
      '01 (1).jpg','01 (2).jpg','01 (3).jpg','01 (4).jpg','01 (5).jpg','01 (6).jpg','01 (7).jpg',
      '01 (12).jpg','01 (13).jpg','01 (14).jpg','01 (15).jpg','01 (17).jpg','01 (18).jpg',
      '01 (19).jpg','01 (20).JPG','01 (21).JPG','01 (23).JPG','01 (24).JPG',
      '01 (25).JPG','01 (26).JPG','01 (27).jpg','01 (28).jpg'
    ]),
  },
};

// ─── COVER IMAGES ────────────────────────────────────────────
const catCovers = { vice: 'vice-cover', exhibitions: 'exhibitions-cover', independent: 'independent-cover' };
Object.entries(catCovers).forEach(([key, file]) => {
  const el = document.getElementById('cover-cat-' + key);
  if (!el) return;
  const img = document.createElement('img');
  img.src = `${BASE}/covers/${file}.jpg`;
  img.alt = ''; img.loading = 'lazy';
  el.appendChild(img);
});
const coverKeys = ['queer','glitz','barbes','florence','arnhem','ribs','kigali','stateofpower','gallery_fashion','gallery_documentary','gallery_street'];

coverKeys.forEach(key => {
  const el = document.getElementById('cover-' + key);
  if (!el) return;
  let src;
  if (key === 'gallery_fashion')     src = `${BASE}/galleries/T1.jpg`;
  else if (key === 'gallery_documentary') src = `${BASE}/galleries/T2.jpg`;
  else if (key === 'gallery_street') src = `${BASE}/galleries/T3.jpg`;
  else src = photoData[key]?.items?.[0]?.src;
  if (!src) return;
  const img = document.createElement('img');
  img.src = src;
  img.alt = '';
  img.loading = 'lazy';
  el.appendChild(img);
});

// ─── DRAG TO SCROLL ──────────────────────────────────────────
function enableDragScroll(el) {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener('mouseleave', () => isDown = false);
  el.addEventListener('mouseup',    () => isDown = false);
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
  });
}

// ─── RENDERERS ───────────────────────────────────────────────
const detailTitle   = document.getElementById('detail-title');
const detailTag     = document.getElementById('detail-tag');
const detailContent = document.getElementById('detail-content');

function renderDetail(key) {
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
      div.className = 'masonry-item';
      const img = document.createElement('img');
      img.src = item.src; img.alt = '';
      img.loading = 'lazy';
      div.appendChild(img);
      grid.appendChild(div);
    });
    detailContent.appendChild(grid);
  }

  if (data.type === 'strip') {
    const wrapper = document.createElement('div');
    wrapper.style.paddingBottom = '4rem';
    const stripDiv = document.createElement('div');
    stripDiv.className = 'strip';
    data.items.forEach(item => {
      const img = document.createElement('img');
      img.className = 'strip-img';
      img.src = item.src; img.alt = '';
      img.loading = 'lazy';
      stripDiv.appendChild(img);
    });
    wrapper.appendChild(stripDiv);
    detailContent.appendChild(wrapper);
  }
}

function renderIndependent() {
  const container = document.getElementById('independent-content');
  if (!container) return;
  container.innerHTML = '';

  ['kennemerland', 'iseo', 'zandvoort'].forEach(key => {
    const data = photoData[key];
    const section = document.createElement('div');
    section.className = 'strip-section';

    const title = document.createElement('div');
    title.className = 'strip-title';
    title.textContent = data.title;
    section.appendChild(title);

    const strip = document.createElement('div');
    strip.className = 'strip';
    data.items.forEach(item => {
      const img = document.createElement('img');
      img.className = 'strip-img';
      img.src = item.src; img.alt = '';
      img.loading = 'lazy';
      strip.appendChild(img);
    });
    section.appendChild(strip);
    enableDragScroll(strip);

    const arrowLeft = document.createElement('button');
    arrowLeft.className = 'strip-arrow strip-arrow-left';
    arrowLeft.innerHTML = '&#8249;';
    arrowLeft.addEventListener('click', () => strip.scrollBy({ left: -400, behavior: 'smooth' }));

    const arrowRight = document.createElement('button');
    arrowRight.className = 'strip-arrow strip-arrow-right';
    arrowRight.innerHTML = '&#8250;';
    arrowRight.addEventListener('click', () => strip.scrollBy({ left: 400, behavior: 'smooth' }));

    section.appendChild(arrowLeft);
    section.appendChild(arrowRight);

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

  if (target === 'back') { goBack(); return; }

  if (target === 'independent') {
    navStack.push('independent');
    showView('independent');
    renderIndependent();
    return;
  }

  if (target === 'photo-detail' && ctx) {
    navStack.push('photo-detail');
    showView('photo-detail');
    renderDetail(ctx);
    return;
  }

  navStack = [target];
  showView(target);
});

// ─── INIT ─────────────────────────────────────────────────────
navStack = ['landing'];
showView('landing');
