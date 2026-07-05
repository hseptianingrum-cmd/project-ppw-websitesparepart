/* 1. Navigasi Mobile (Hamburger Menu) */
document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
      });
    });
  }
});

/* 2. Keranjang Belanja Sederhana */
let cartCount = 0;

function initCart() {
  const cartCountEl = document.querySelector('.cart-count');
  const addButtons = document.querySelectorAll('.add-btn');

  addButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      cartCount++;
      if (cartCountEl) cartCountEl.textContent = cartCount;

      const originalText = btn.textContent;
      btn.textContent = 'Ditambahkan ✓';
      btn.style.background = '#3CCB7F';
      btn.style.borderColor = '#3CCB7F';
      btn.style.color = '#15161A';

      showToast(btn.dataset.product ? btn.dataset.product + ' ditambahkan ke keranjang' : 'Produk ditambahkan ke keranjang');

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
      }, 1200);
    });
  });
}
document.addEventListener('DOMContentLoaded', initCart);

function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 2400);
}

/* 3. Filter & Pencarian Produk */
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-bar button');
  const searchInput = document.querySelector('#product-search');
  const rows = document.querySelectorAll('table.parts-table tbody tr');

  if (!rows.length) return;

  function applyFilters() {
    const activeBtn = document.querySelector('.filter-bar button.active');
    const category = activeBtn ? activeBtn.dataset.filter : 'all';
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let visibleCount = 0;
    rows.forEach(function (row) {
      const matchesCategory = category === 'all' || row.dataset.category === category;
      const matchesQuery = row.dataset.name.toLowerCase().includes(query);
      const show = matchesCategory && matchesQuery;
      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    const emptyState = document.querySelector('#empty-state');
    if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }
});

/* 4. Slider Testimoni */
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const dotsWrap = document.querySelector('.slider-dots');
  if (!slides.length || !dotsWrap) return;

  let current = 0;
  const dots = dotsWrap.querySelectorAll('button');

  function showSlide(index) {
    slides.forEach(function (s, i) { s.classList.toggle('active', i === index); });
    dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
    current = index;
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { showSlide(i); });
  });

  setInterval(function () {
    showSlide((current + 1) % slides.length);
  }, 5000);
});

/* 5. Validasi Form Kontak */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: '#f-name', error: '#err-name', test: v => v.trim().length >= 3, msg: 'Nama minimal 3 karakter' },
      { id: '#f-email', error: '#err-email', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Format email tidak valid' },
      { id: '#f-phone', error: '#err-phone', test: v => /^[0-9+\s-]{8,15}$/.test(v), msg: 'Nomor telepon tidak valid' },
      { id: '#f-message', error: '#err-message', test: v => v.trim().length >= 10, msg: 'Pesan minimal 10 karakter' },
    ];

    fields.forEach(function (f) {
      const input = form.querySelector(f.id);
      const errorEl = form.querySelector(f.error);
      if (!input) return;
      const ok = f.test(input.value);
      input.classList.toggle('invalid', !ok);
      if (errorEl) errorEl.textContent = ok ? '' : f.msg;
      if (!ok) valid = false;
    });

    if (valid) {
      form.reset();
      showToast('Pesan berhasil dikirim! Tim kami akan segera menghubungi Anda.');
    } else {
      showToast('Mohon periksa kembali form Anda.');
    }
  });
});

/* 6. Tahun Otomatis di Footer */
document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.querySelector('#current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
