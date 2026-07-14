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

// ─── ROUTING ─────────────────────────────────────────────────
// Which category page a photo-detail project belongs to, so the
// "← Back" link works even on a direct/refreshed load of a detail page.
const CTX_PARENT = {
  queer: 'vice', glitz: 'vice', barbes: 'vice', florence: 'vice', arnhem: 'vice', fete: 'vice',
  ribs: 'exhibitions', kigali: 'exhibitions',
  gallery_fashion: 'photography', gallery_documentary: 'photography', gallery_street: 'photography',
};
const PARENT_LABEL = { vice: 'Vice', exhibitions: 'Exhibitions', photography: 'Photography' };

const SUB_VIEWS = ['vice', 'exhibitions', 'independent'];

function pathFor(view, ctx) {
  if (view === 'landing') return '/';
  if (view === 'photo-detail') return `/photography/project/${ctx}`;
  if (SUB_VIEWS.includes(view)) return `/photography/${view}`;
  return `/${view}`;
}

function parsePath(pathname) {
  const parts = pathname.replace(/^\/|\/$/g, '').split('/').filter(Boolean);
  if (parts.length === 0) return { view: 'landing' };
  if (parts[0] === 'photography') {
    if (parts.length === 1) return { view: 'photography' };
    if (parts[1] === 'project' && parts[2]) return { view: 'photo-detail', ctx: parts[2] };
    if (SUB_VIEWS.includes(parts[1])) return { view: parts[1] };
    return { view: 'photography' };
  }
  if (views[parts[0]]) return { view: parts[0] };
  return { view: 'landing' };
}

function render(view, ctx) {
  showView(view);
  if (view === 'photo-detail') renderDetail(ctx);
  if (view === 'independent') renderIndependent();
}

function navigate(view, ctx, { push = true } = {}) {
  if (view === 'photo-detail' && !photoData[ctx]) { view = 'landing'; ctx = undefined; }
  render(view, ctx);
  const path = pathFor(view, ctx);
  const state = { view, ctx };
  if (push) history.pushState(state, '', path);
  else history.replaceState(state, '', path);
}

window.addEventListener('popstate', e => {
  const { view, ctx } = e.state || parsePath(location.pathname);
  render(view, ctx);
});

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
  fete: {
    title: 'Fête de la Musique', tag: 'VICE', type: 'masonry',
    items: imgs('vice/fete', [
      'jpg (1).jpg','jpg (2).jpg','jpg (3).jpg','jpg (4).jpg','jpg (5).jpg',
      'jpg (6).jpg','jpg (7).jpg','jpg (8).jpg','jpg (9).jpg','jpg (10).jpg'
    ]),
  },
  // ── EXHIBITIONS ────────────────────────────────────────────
  ribs: {
    title: 'Ribs', tag: 'Fotomuseum Amsterdam', type: 'masonry',
    description: 'Photoseries for FOAM about masculinity and emotion. The title of the series and images are excerpts from \u2018Ribs\u2019, a poem by Sam Sax.',
    descriptionLink: { text: 'View the original exhibition', url: 'https://www.foam.org/online-exhibitions/meervaart-studio-2023' },
    poem: [
      ['at the rib joint\nwe became men.\n\nhis whole body\nsmoked for ten hours\n\ncame apart\nin my hands.\n\nsucked the meat\noff him. sucked\nthe bone. marrow\nbecomes you,\nyou know?\n\nyou know, when you eat\nsomething, it becomes you?\n\nyounger me grew broccoli crowns\nfrom our skull,\ngrew hand antlers, ground ankle beef.\n\nat the table\ngod unhinged his ribs\nat the joint. opened him\nlike an oven laughing\nwith smoke, steam\nflapping its black wings\nup from his organs.',
       'when i ate his ribs\ni became a man\n\nor maybe just ribs\nbraided together\nat the table\n\nor maybe a creation myth,\nwhen i ate him.\n\nin the beginning there was a table\ni sat & ate at until i was something.\n\nmy reflection swallowed in the plate,\nmy god, the weight of the blade.\n\nthe blade, singing.\n\nyou know when you become\nsomething it eats you? the teeth\nin my hand. the weight of the handle.\nthe meat separating from bone.']
    ],
    items: [
      { src: imgs('exhibitions/ribs', ['1.jpg'])[0].src, caption: 'FINN // at the table god unhinged his ribs' },
      { src: imgs('exhibitions/ribs', ['2.jpg'])[0].src, caption: 'BENNI // or maybe just ribs braided together at the table' },
      { src: imgs('exhibitions/ribs', ['3.jpg'])[0].src, caption: 'JOHN // you know when you become something it eats you?' },
      { src: imgs('exhibitions/ribs', ['4.jpg'])[0].src, caption: 'FINN // came apart in my hands' },
      { src: imgs('exhibitions/ribs', ['5.jpg'])[0].src, caption: 'RORY // there was a table i sat & ate at until i was something' },
      { src: imgs('exhibitions/ribs', ['6.jpg'])[0].src, caption: 'BENNI // when i ate his ribs i became a man' },
    ],
  },
  kigali: {
    title: 'Kigali Street Fashion', tag: 'Meervaart Theater', type: 'masonry',
    items: imgs('exhibitions/kigali', [
      '01 (1).JPG','01 (2).jpg','01 (3).jpg','01 (4).jpg'
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
    title: 'Editorial', tag: null, type: 'masonry',
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
const coverKeys = ['queer','glitz','barbes','florence','arnhem','fete','ribs','kigali','gallery_fashion','gallery_documentary','gallery_street'];

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

const detailBack = document.getElementById('detail-back');

function renderDetail(key) {
  const data = photoData[key];
  if (!data) return;

  detailTitle.textContent = data.title;
  detailTag.textContent   = data.tag || '';
  detailContent.innerHTML = '';

  const parent = CTX_PARENT[key] || 'photography';
  detailBack.dataset.nav = parent;
  detailBack.textContent = `← ${PARENT_LABEL[parent]}`;

  if (data.description) {
    const descWrap = document.createElement('div');
    descWrap.style.cssText = 'margin-bottom:0;margin-top:-1.5rem;';

    const desc = document.createElement('p');
    desc.style.cssText = 'font-family:var(--body);font-style:italic;font-size:0.85rem;line-height:1.6;color:var(--ink);margin-bottom:0.4rem;';
    desc.textContent = data.description;
    descWrap.appendChild(desc);

    if (data.descriptionLink) {
      const a = document.createElement('a');
      a.href = data.descriptionLink.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = data.descriptionLink.text;
      a.style.cssText = 'font-family:var(--body);font-size:0.72rem;letter-spacing:0.08em;text-transform:uppercase;color:var(--mid);text-decoration:none;';
      descWrap.appendChild(a);
    }

    detailContent.appendChild(descWrap);
  }

  if (data.type === 'masonry') {
    const grid = document.createElement('div');
    grid.className = 'photo-grid';

    const srcs = data.items.map(i => i.src);

    for (let i = 0; i < data.items.length; i += 2) {
      const pair = document.createElement('div');
      pair.className = 'photo-grid-pair';

      [data.items[i], data.items[i + 1]].forEach((item, j) => {
        if (!item) return;
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display:flex;flex-direction:column;width:calc(45% - 1rem);';

        const img = document.createElement('img');
        img.src = item.src; img.alt = ''; img.loading = 'lazy';
        img.style.cssText = 'cursor:pointer;width:100%;height:auto;display:block;';
        img.addEventListener('click', () => openLightbox(srcs, i + j));
        wrap.appendChild(img);

        if (item.caption) {
          const cap = document.createElement('p');
          cap.style.cssText = 'font-family:var(--body);font-size:0.72rem;line-height:1.5;color:var(--ink);margin-top:0.5rem;';
          cap.textContent = item.caption;
          wrap.appendChild(cap);
        }

        pair.appendChild(wrap);
      });

      grid.appendChild(pair);
    }

    detailContent.appendChild(grid);

    if (data.poem) {
      const poemTitle = document.createElement('div');
      poemTitle.style.cssText = 'margin-top:4rem;padding-top:2rem;border-top:1px solid var(--rule-lt);margin-bottom:1.5rem;';
      poemTitle.innerHTML = `
        <h2 style="font-family:var(--display);font-size:clamp(2rem,4vw,3rem);font-weight:400;text-transform:uppercase;letter-spacing:0.02em;margin-bottom:0.3rem;">Ribs</h2>
        <p style="font-family:var(--body);font-size:0.8rem;color:#666;font-style:italic;">By Sam Sax</p>
      `;
      detailContent.appendChild(poemTitle);

      const poemWrap = document.createElement('div');
      poemWrap.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-bottom:6rem;';
      data.poem[0].forEach(col => {
        const colEl = document.createElement('p');
        colEl.style.cssText = 'font-family:var(--body);font-size:0.8rem;line-height:1.9;white-space:pre-line;color:var(--ink);';
        colEl.textContent = col;
        poemWrap.appendChild(colEl);
      });
      detailContent.appendChild(poemWrap);
    }
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
  navigate(el.dataset.nav, el.dataset.ctx);
});

// ─── INIT ─────────────────────────────────────────────────────
{
  const { view, ctx } = parsePath(location.pathname);
  navigate(view, ctx, { push: false });
}

// ─── LIGHTBOX ─────────────────────────────────────────────────
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let lightboxSrcs = [];
let lightboxIndex = 0;

function openLightbox(srcs, index) {
  lightboxSrcs = srcs;
  lightboxIndex = index;
  lightboxImg.src = srcs[index];
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('hidden');
  document.body.style.overflow = '';
}

function lightboxStep(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxSrcs.length) % lightboxSrcs.length;
  lightboxImg.src = lightboxSrcs[lightboxIndex];
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => lightboxStep(-1));
lightboxNext.addEventListener('click', () => lightboxStep(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (lightbox.classList.contains('hidden')) return;
  if (e.key === 'ArrowLeft')  lightboxStep(-1);
  if (e.key === 'ArrowRight') lightboxStep(1);
  if (e.key === 'Escape')     closeLightbox();
});
