document.addEventListener('DOMContentLoaded', () => {
  // 1. MENÚ MÓVIL (HAMBURGUESA)
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 2. PESTAÑAS DE SERVICIOS
  const serviceTabs = document.querySelectorAll('.service-tab');
  const serviceImage = document.getElementById('serviceImage');
  const serviceCaptionTitle = document.getElementById('serviceCaptionTitle');
  const serviceCaptionDesc = document.getElementById('serviceCaptionDesc');

  serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      serviceTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const newImg = tab.getAttribute('data-img');
      const newTitle = tab.getAttribute('data-title');
      const newDesc = tab.getAttribute('data-desc');

      if (serviceImage && newImg) {
        serviceImage.src = newImg;
        serviceImage.alt = newTitle;
      }
      if (serviceCaptionTitle) serviceCaptionTitle.textContent = newTitle;
      if (serviceCaptionDesc) serviceCaptionDesc.textContent = newDesc;
    });
  });

  // 3. GALERÍA "CONOCÉ NUESTROS HOGARES" (9 SEGUNDOS + MINIATURAS + TÁCTIL)
  // Verificá que los nombres de archivo coincidan con tu carpeta img/
  const galeriaData = {
    mdp: [
      { src: 'img/living.jpg', title: 'Living Principal', desc: 'Amplio espacio común luminoso y calefaccionado para compartir en familia.' },
      { src: 'img/comedor.jpg', title: 'Comedor Diario', desc: 'Ambiente cálido y cómodo donde se sirven comidas caseras supervisadas.' },
      { src: 'img/habitacion1.jpg', title: 'Habitaciones Confortables', desc: 'Dormitorios amplios, ventilados y adaptados para el descanso seguro.' },
      { src: 'img/habitacion2.jpg', title: 'Espacios Privados y Compartidos', desc: 'Camas ortopédicas y mobiliario pensado para la comodidad diaria.' },
      { src: 'img/bano.jpg', title: 'Baños Adaptados', desc: 'Totalmente equipados con barrales de seguridad y pisos antideslizantes.' }
    ],
    dolores: [
      { src: 'img/living.jpg', title: 'Próxima Apertura en Dolores', desc: 'Estamos preparando cada detalle para brindar el mismo confort y calidez.' }
    ]
  };

  let currentSede = 'mdp';
  let currentIndex = 0;
  let progress = 0;
  const SLIDE_DURATION = 9000; // 9 segundos
  const TICK = 100;

  const mainImg = document.getElementById('galleryMainImg');
  const badgeEl = document.getElementById('galleryBadge');
  const titleEl = document.getElementById('galleryTitle');
  const descEl = document.getElementById('galleryDesc');
  const thumbsContainer = document.getElementById('galleryThumbs');
  const progressBar = document.getElementById('galleryProgressBar');

  function renderThumbs() {
    if (!thumbsContainer) return;
    thumbsContainer.innerHTML = '';
    const slides = galeriaData[currentSede];

    slides.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = `thumb-item ${idx === currentIndex ? 'active' : ''}`;
      div.innerHTML = `<img src="${item.src}" alt="${item.title}" />`;
      div.addEventListener('click', () => {
        currentIndex = idx;
        updateSlide();
      });
      thumbsContainer.appendChild(div);
    });
  }

  function updateSlide() {
    const slides = galeriaData[currentSede];
    const item = slides[currentIndex];
    if (!item || !mainImg) return;

    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = item.src;
      mainImg.alt = item.title;
      mainImg.style.opacity = '1';
    }, 150);

    if (badgeEl) badgeEl.textContent = currentSede === 'mdp' ? 'Sede Mar del Plata' : 'Sede Dolores';
    if (titleEl) titleEl.textContent = item.title;
    if (descEl) descEl.textContent = item.desc;

    progress = 0;
    if (progressBar) progressBar.style.width = '0%';
    renderThumbs();
  }

  document.getElementById('prevSlide')?.addEventListener('click', () => {
    const slides = galeriaData[currentSede];
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
  });

  document.getElementById('nextSlide')?.addEventListener('click', () => {
    const slides = galeriaData[currentSede];
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  });

  document.querySelectorAll('.g-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.g-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSede = btn.getAttribute('data-sede');
      currentIndex = 0;
      updateSlide();
    });
  });

  // Rotación automática cada 9 segundos
  setInterval(() => {
    const slides = galeriaData[currentSede];
    if (slides.length <= 1) return;
    progress += TICK;
    if (progressBar) {
      progressBar.style.width = `${Math.min((progress / SLIDE_DURATION) * 100, 100)}%`;
    }
    if (progress >= SLIDE_DURATION) {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    }
  }, TICK);

  updateSlide();
});
