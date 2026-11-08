/*
 * SMD Pakistan – P2.5 Indoor SMD LED Module landing page
 * Loaded with `defer`, so it runs after the HTML has been parsed.
 */

// Gallery Switcher Logic
const galleryThumbs = document.querySelectorAll('.gallery-thumb');
const mainDisplay = document.getElementById('main-product-display');
const prevBtn = document.getElementById('prev-gallery-btn');
const nextBtn = document.getElementById('next-gallery-btn');
const thumbImages = Array.from(galleryThumbs).map(btn => btn.getAttribute('data-img'));
let currentIdx = 0;

function setGalleryImage(idx) {
  currentIdx = (idx + thumbImages.length) % thumbImages.length;
  if (mainDisplay) {
    mainDisplay.src = thumbImages[currentIdx];
  }
  galleryThumbs.forEach((thumb, i) => {
    if (i === currentIdx) {
      thumb.classList.add('ring-2', 'ring-primary');
    } else {
      thumb.classList.remove('ring-2', 'ring-primary');
    }
  });
}

galleryThumbs.forEach((thumb, i) => {
  thumb.addEventListener('click', () => setGalleryImage(i));
});

if (prevBtn) {
  prevBtn.addEventListener('click', () => setGalleryImage(currentIdx - 1));
}
if (nextBtn) {
  nextBtn.addEventListener('click', () => setGalleryImage(currentIdx + 1));
}

// Inspect Zoom Mock Effect
const zoomBtn = document.getElementById('zoom-badge-btn');
if (zoomBtn && mainDisplay) {
  let isZoomed = false;
  zoomBtn.addEventListener('click', () => {
    isZoomed = !isZoomed;
    if (isZoomed) {
      mainDisplay.classList.add('scale-150');
      zoomBtn.querySelector('span:last-child').textContent = 'Reset View';
    } else {
      mainDisplay.classList.remove('scale-150');
      zoomBtn.querySelector('span:last-child').textContent = 'Inspect 1:1';
    }
  });
}

// Dynamic LED Matrix Calculator
const rangeW = document.getElementById('range-modules-w');
const rangeH = document.getElementById('range-modules-h');
const modWVal = document.getElementById('modules-w-val');
const modHVal = document.getElementById('modules-h-val');
const calcDim = document.getElementById('calc-dim');
const calcRes = document.getElementById('calc-res');
const calcArea = document.getElementById('calc-area');
const calcPower = document.getElementById('calc-power');

function updateCalculator() {
  if (!rangeW || !rangeH) return;
  const wMods = parseInt(rangeW.value, 10);
  const hMods = parseInt(rangeH.value, 10);

  const widthM = (wMods * 0.32).toFixed(2);
  const heightM = (hMods * 0.16).toFixed(2);
  const widthFt = (wMods * 0.32 * 3.28084).toFixed(1);
  const heightFt = (hMods * 0.16 * 3.28084).toFixed(1);

  const resW = wMods * 128;
  const resH = hMods * 64;
  const area = (widthM * heightM).toFixed(2);
  const peakKw = ((area * 457) / 1000).toFixed(2);

  if (modWVal) modWVal.textContent = `${wMods} Modules (${widthM}m)`;
  if (modHVal) modHVal.textContent = `${hMods} Modules (${heightM}m)`;
  if (calcDim) calcDim.textContent = `${widthM}m \u00D7 ${heightM}m (${widthFt} \u00D7 ${heightFt} ft)`;
  if (calcRes) calcRes.textContent = `${resW} \u00D7 ${resH} Pixels`;
  if (calcArea) calcArea.textContent = `${area} m²`;
  if (calcPower) calcPower.textContent = `${peakKw} kW (Peak)`;
}

if (rangeW) rangeW.addEventListener('input', updateCalculator);
if (rangeH) rangeH.addEventListener('input', updateCalculator);

// FAQ Accordion Behavior
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const toggle = item.querySelector('.faq-toggle');
  const content = item.querySelector('.faq-content');
  const icon = item.querySelector('.material-symbols-outlined');

  if (toggle && content) {
    toggle.addEventListener('click', () => {
      const isOpen = !content.classList.contains('hidden');
      // Close other open accordions
      faqItems.forEach(otherItem => {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.material-symbols-outlined');
        if (otherContent) otherContent.classList.add('hidden');
        if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  }
});

// Quote Request Form (previously an inline onsubmit handler)
const quoteForm = document.getElementById('hubspot-quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('hubspot-confirm-msg').classList.remove('hidden');
  });
}
