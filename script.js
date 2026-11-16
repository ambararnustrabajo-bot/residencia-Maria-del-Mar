(function(){
  var el = document.getElementById('n');
  if (el && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var t0 = performance.now();
    (function paso(t){
      var p = Math.min((t - t0 - 500) / 1400, 1);
      el.textContent = Math.max(0, Math.round(15 * p));
      if (p < 1) requestAnimationFrame(paso);
    })(t0);
  }
})();

/* ===== GALERÍAS ===== */
var GALERIAS = {
  hab: [
    { n: 'Habitaciones', d: 'Cada habitación es un rincón propio: luminosa, con su cama, placard, mesita de luz y ventana.', f: [['habitacion-1.jpg'], ['habitacion-2.jpg'], ['habitacion-3.jpg'], ['habitacion-4.jpg'], ['habitacion-5.jpg']] },
    { n: 'Baños', d: 'Espacios prácticos, higiénicos y pensados para ofrecer comodidad y seguridad cada día.', f: [['banio-1.jpg', 'Baños']] },
    { n: 'Cocina / comedor', d: 'Acá se comparte la mesa: desayunos, almuerzos y meriendas en compañía.', f: [['cocina-1.jpg', 'Cocina y comedor']] },
    { n: 'Planta baja / patio', d: 'Pasillos amplios y fáciles de recorrer, y un patio para salir a tomar aire.', f: [['patio-1.jpg', 'Planta baja y patio']] },
    { n: 'Primer piso', d: 'Ambientes tranquilos y con mucha luz natural.', f: [['primerpiso-1.jpg', 'Primer piso']] }
  ],
  acti: [
    { n: 'Actividades', d: 'Momentos para compartir, divertirse y sentirse acompañado.', f: [['actividad-1.jpg', 'Pintura'], ['actividad-2.jpg', 'Clases de gimnasia'], ['actividad-3.jpg', 'Lúdicas'], ['actividad-4.jpg', 'Talleres']] }
  ]
};

var ROLES = {
  Asistentes: 'asistentes',
  Profesionales: 'profesionales',
  Auxiliares: 'auxiliares'
};

var FORMULARIO_POSTULACION = 'https://docs.google.com/forms/d/e/1FAIpQLSdngu-JR4ssHfunH-ib8SW-hn6j79v7CwRi_fTt3CTeMI3meQ/viewform?usp=publish-editor';
var LINKS_DOCUMENTACION = {
  Asistentes: FORMULARIO_POSTULACION,
  Profesionales: FORMULARIO_POSTULACION,
  Auxiliares: FORMULARIO_POSTULACION
};

document.querySelectorAll('[data-galeria]').forEach(function(root){
  var galKey = root.dataset.galeria;
  var G = GALERIAS[galKey];
  if (!G) return;

  var g = 0;
  var i = 0;
  var x0 = null;
  var arr = false;
  var cambioTimer = null;
  var grad = 'linear-gradient(135deg,#8fd3fb,#2c5a78)';

  root.innerHTML = '<div class="chips"></div><p class="gdesc"></p><div class="visor" tabindex="0"><span class="amp">⤢ Ampliar</span><div class="foto"></div><p class="pie"></p><button class="fl ant" aria-label="Anterior">‹</button><button class="fl sig" aria-label="Siguiente">›</button><div class="pts"></div></div><button class="volver-categorias" type="button" aria-label="Volver a categorías"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>Volver</button>';

  var chips = root.querySelector('.chips');
  var gd = root.querySelector('.gdesc');
  var foto = root.querySelector('.foto');
  var pie = root.querySelector('.pie');
  var pts = root.querySelector('.pts');
  var visor = root.querySelector('.visor');
  var volver = root.querySelector('.volver-categorias');
  var elegirCategoria = (galKey === 'hab');

  if (elegirCategoria) root.classList.add('sin-seleccion');
  if (G.length < 2) chips.style.display = 'none';

  G.forEach(function(gr, k){
    var b = document.createElement('button');
    b.className = 'chip';
    b.textContent = gr.n;
    b.setAttribute('aria-pressed', 'false');
    b.onclick = function(){
      g = k;
      i = 0;
      root.classList.remove('sin-seleccion');
      if (elegirCategoria) root.classList.add('categoria-elegida');
      ver();
    };
    chips.appendChild(b);
  });

  function ver(){
    var fs = G[g].f;
    var d = fs[i];
    gd.textContent = G[g].d || '';
    clearTimeout(cambioTimer);
    foto.classList.add('out');
    cambioTimer = setTimeout(function(){
      foto.style.backgroundImage = 'url("' + d[0] + '"),' + grad;
      pie.textContent = d[1] || '';
      foto.classList.remove('out');
    }, 320);
    Array.prototype.forEach.call(chips.children, function(c, k){
      c.setAttribute('aria-pressed', k === g);
    });
    pts.innerHTML = fs.map(function(_, k){
      return '<i' + (k === i ? ' class="on"' : '') + '></i>';
    }).join('');
    root.querySelectorAll('.fl').forEach(function(boton){
      boton.style.display = fs.length > 1 ? '' : 'none';
    });
  }

  function mover(n){
    var l = G[g].f.length;
    i = (i + n + l) % l;
    ver();
  }

  root.querySelector('.ant').onclick = function(){ mover(-1); };
  root.querySelector('.sig').onclick = function(){ mover(1); };

  volver.onclick = function(){
    if (!elegirCategoria) return;
    clearTimeout(cambioTimer);
    root.classList.remove('categoria-elegida');
    root.classList.add('sin-seleccion');
    g = 0;
    i = 0;
    gd.textContent = '';
    foto.style.backgroundImage = 'none';
    pie.textContent = '';
    pts.innerHTML = '';
    Array.prototype.forEach.call(chips.children, function(boton){
      boton.setAttribute('aria-pressed', 'false');
    });
    root.querySelectorAll('.fl').forEach(function(boton){
      boton.style.display = 'none';
    });
    var seccion = root.closest('section');
    if (seccion) {
      seccion.scrollTo({
        top: 0,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
    requestAnimationFrame(function(){
      chips.querySelector('button').focus();
    });
  };

  visor.onkeydown = function(e){
    if (e.key === 'ArrowLeft') mover(-1);
    if (e.key === 'ArrowRight') mover(1);
  };

  visor.onpointerdown = function(e){ x0 = e.clientX; };
  visor.onpointerup = function(e){
    arr = false;
    if (x0 !== null && Math.abs(e.clientX - x0) > 50) {
      mover(e.clientX < x0 ? 1 : -1);
      arr = true;
    }
    x0 = null;
  };

  visor.onclick = function(e){
    if (arr || e.target.closest('.fl')) return;
    LB.abrir(G[g].f, i);
  };

  if (!elegirCategoria) ver();
});

var panel = document.getElementById('panel');
document.querySelectorAll('.rol').forEach(function(b){
  b.onclick = function(){
    var r = b.dataset.rol;
    var abierto = b.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.rol').forEach(function(o){
      o.setAttribute('aria-expanded', 'false');
    });
    if (abierto) {
      if (panel) panel.classList.remove('on');
      return;
    }

    b.setAttribute('aria-expanded', 'true');
    if (panel) {
      panel.innerHTML = '<p>Postulación para <b>' + r + '</b>. En el formulario, indicá este puesto y adjuntá tu CV junto con la documentación solicitada.</p><a class="btn" href="' + LINKS_DOCUMENTACION[r] + '" target="_blank" rel="noopener">Ir al formulario</a>';
      panel.classList.add('on');
    }
  };
});

var SERVICIOS = [
  ['Servicio médico', 'Un médico que conoce a cada residente y cuida su salud de cerca: controles regulares, tratamientos al día y novedades para la familia. Vos descansás sabiendo que alguien te cuida cada día.', 'servicio-medico.jpg'],
  ['Enfermería las 24 hs', 'De día, de noche y los fines de semana, siempre hay alguien cuidando. Dan la medicación en hora, controlan cómo está cada persona y están a un paso si hace falta.', 'enfermeria.jpg'],
  ['Nutricionista', 'Comer bien también es cuidarse. Las comidas se piensan para cada persona: lo que necesita, lo que puede comer y lo que le gusta. Que la mesa sea salud y también un placer.', 'nutricion.jpg'],
  ['Terapista ocupacional', 'Ayuda a seguir haciendo lo que cada uno disfruta: vestirse solo, cocinar, escribir, moverse. Con juegos y ejercicios suaves entrena la memoria y la independencia, para que cada día sea más cómodo.', 'terapia.jpg'],
  ['Actividades recreativas', 'Acá ningún día es igual: música, juegos, charlas y festejos. Porque la compañía, las risas y tener algo lindo para esperar también son parte del cuidado.', 'actividades.jpg']
];

(function(){
  var root = document.querySelector('.serv-g');
  if (!root) return;

  var L = root.querySelector('.lista-s');
  var E = root.querySelector('.escena');
  var k = 0;
  var t = null;
  var quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var grad = ['#8fd3fb,#2c5a78', '#b8e4ff,#4a7a96', '#6fc3ef,#1f4a66', '#9bd8fb,#35627f', '#a9ddf9,#2a5672'];

  SERVICIOS.forEach(function(s, n){
    var b = document.createElement('button');
    b.className = 'sv';
    b.innerHTML = '<strong>' + s[0] + '</strong><span>' + s[1] + '</span><i></i>';
    b.onclick = function(){
      ir(n);
      arrancar();
    };
    L.appendChild(b);

    var c = document.createElement('div');
    c.className = 'capa';
    c.style.backgroundImage = 'url("' + s[2] + '"),linear-gradient(135deg,' + grad[n % grad.length] + ')';
    E.appendChild(c);
  });

  function ir(n) {
    k = n;
    Array.from(L.children).forEach(function(boton){
      boton.classList.remove('on');
    });
    Array.from(E.children).forEach(function(capa, i){
      capa.classList.toggle('on', i === n);
    });
    L.children[n].classList.add('on');
  }

  function arrancar(){
    clearInterval(t);
    if (quieto) return;
    t = setInterval(function(){
      ir((k + 1) % SERVICIOS.length);
    }, 7000);
  }

  root.onmouseenter = function(){
    clearInterval(t);
  };

  root.onmouseleave = function(){
    ir(k);
    arrancar();
  };

  ir(0);
  arrancar();
})();

/* ===== MENÚ SUPERIOR Y NAVEGACIÓN EN MÓVIL ===== */
/* ===== MENÚ SUPERIOR Y NAVEGACIÓN EN MÓVIL ===== */
(function(){
  var top = document.getElementById('top');
  var menu = document.getElementById('menu');
  var burger = document.querySelector('.burger');
  var dd = document.querySelector('.dd');
  var sections = Array.from(document.querySelectorAll('main section.bloque'));
  var mobileQuery = window.matchMedia('(max-width: 760px)');
  var menuTriggers = burger ? [burger] : [];
  var ultimoDisparador = burger;

  function isMobile(){
    return mobileQuery.matches;
  }

  function updateTopState(){
    if (top) top.classList.toggle('sol', window.scrollY > 40);
  }

  function actualizarDisparadores(abierto){
    menuTriggers.forEach(function(btn){
      if (btn) btn.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }

  function closeMenu(devolverFoco){
    if (!menu) return;
    menu.classList.remove('abierto');
    document.body.classList.remove('menu-abierto');
    actualizarDisparadores(false);
    if (burger) {
      burger.textContent = '☰';
      burger.setAttribute('aria-label', 'Abrir menú');
    }
    if (devolverFoco && ultimoDisparador) ultimoDisparador.focus();
  }

  function openMenu(disparador){
    if (!menu) return;
    ultimoDisparador = disparador || burger;
    menu.classList.add('abierto');
    document.body.classList.add('menu-abierto');
    actualizarDisparadores(true);
    if (burger) {
      burger.textContent = '×';
      burger.setAttribute('aria-label', 'Cerrar menú');
    }
  }

  // Crea el botón "Explorar otra sección" al final de cada sección en móvil
  sections.forEach(function(section){
    var contenedor = section.querySelector('.wrap') || section;
    var disparador = document.createElement('button');
    disparador.type = 'button';
    disparador.className = 'volver-menu';
    disparador.setAttribute('aria-controls', 'menu');
    disparador.setAttribute('aria-expanded', 'false');
    disparador.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>Explorar otra sección</span>';
    disparador.onclick = function(){ openMenu(disparador); };
    menuTriggers.push(disparador);
    contenedor.appendChild(disparador);
  });

  function showInicioMobile(){
    document.body.classList.add('recorrido-movil');
    document.body.classList.remove('seccion-movil-activa');
    sections.forEach(function(el){
      el.classList.remove('seccion-activa');
    });
    var hero = document.querySelector('.hero');
    if (hero) hero.scrollTop = 0;
    window.scrollTo(0, 0);
    marcarSeccionActiva();
  }

  function activateSectionById(id){
    var sec = id ? document.getElementById(id) : null;
    if (!isMobile() || !sec || !sec.classList.contains('bloque')) return false;

    document.body.classList.add('recorrido-movil', 'seccion-movil-activa');
    sections.forEach(function(el){
      var activa = (el === sec);
      el.classList.toggle('seccion-activa', activa);
      if (activa) el.scrollTop = 0;
    });

    window.scrollTo(0, 0);
    marcarSeccionActiva();
    return true;
  }

  function syncMobileState(){
    if (!isMobile()) {
      document.body.classList.remove('recorrido-movil', 'seccion-movil-activa');
      sections.forEach(function(el){
        el.classList.remove('seccion-activa');
      });
      return;
    }

    document.body.classList.add('recorrido-movil');
    var id = location.hash ? location.hash.replace('#', '') : '';
    if (!id || id === 'inicio' || !activateSectionById(id)) {
      showInicioMobile();
    }
  }

  if (burger) {
    burger.addEventListener('click', function(){
      if (menu && menu.classList.contains('abierto')) {
        closeMenu(true);
      } else {
        openMenu(burger);
      }
    });
  }

  // Desplegable de Sedes en escritorio
  if (dd && dd.querySelector('button')) {
    dd.querySelector('button').addEventListener('click', function(e){
      e.stopPropagation();
      var abierto = dd.classList.toggle('abierto');
      this.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    document.addEventListener('click', function(){
      dd.classList.remove('abierto');
    });
  }

  // Intercepta clics en cualquier enlace interno (#...) en toda la página
  document.addEventListener('click', function(e){
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || href.length <= 1) return;

    if (!isMobile()) {
      if (menu && menu.contains(link)) closeMenu(false);
      return;
    }

    e.preventDefault();
    var targetId = href.replace('#', '');

    if (targetId === 'inicio') {
      if (location.hash !== '#inicio') history.pushState(null, '', '#inicio');
      showInicioMobile();
      closeMenu(false);
      return;
    }

    if (activateSectionById(targetId)) {
      if (location.hash !== href) history.pushState(null, '', href);
      closeMenu(false);
    }
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && menu && menu.classList.contains('abierto')) {
      closeMenu(true);
    }
  });

  var links = menu ? Array.from(menu.querySelectorAll('a[href^="#"]')) : [];
  var secs = links.map(function(a){
    var href = a.getAttribute('href');
    return href && href.length > 1 ? document.querySelector(href) : null;
  });

  function marcarSeccionActiva(){
    if (isMobile()) {
      var activa = document.querySelector('main section.seccion-activa');
      links.forEach(function(a){
        a.classList.toggle('on', !!activa && a.getAttribute('href') === '#' + activa.id);
      });
      return;
    }
    var y = window.scrollY + 120;
    var on = -1;
    secs.forEach(function(s, i){
      if (s && s.offsetTop <= y) on = i;
    });
    links.forEach(function(a, i){
      a.classList.toggle('on', i === on);
    });
  }

  window.addEventListener('scroll', function(){
    updateTopState();
    marcarSeccionActiva();
  }, { passive: true });

  window.addEventListener('hashchange', syncMobileState);
  window.addEventListener('popstate', syncMobileState);
  window.addEventListener('resize', function(){
    if (window.innerWidth > 1020) closeMenu(false);
    syncMobileState();
  });

  updateTopState();
  syncMobileState();
  marcarSeccionActiva();

  var v = document.querySelector('.bgvideo');
  if (v && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    v.pause();
  }
})();

/* ===== FOTO AMPLIADA ===== */
var LB = (function(){
  var el = document.getElementById('lb');
  var im = el ? el.querySelector('.lb-f') : null;
  var cap = el ? el.querySelector('.lb-c') : null;
  var L = [];
  var k = 0;

  if (!el) return { abrir: function(){} };

  function ver(){
    var d = L[k];
    im.style.backgroundImage = 'url("' + d[0] + '"),linear-gradient(135deg,#8fd3fb,#2c5a78)';
    cap.textContent = d[1] + (L.length > 1 ? '  ·  ' + (k + 1) + ' / ' + L.length : '');
  }

  function mover(n){
    k = (k + n + L.length) % L.length;
    ver();
  }

  function cerrar(){
    el.classList.remove('on');
    document.body.style.overflow = '';
  }

  var btnX = el.querySelector('.lb-x');
  var btnA = el.querySelector('.lb-a');
  var btnS = el.querySelector('.lb-s');

  if (btnX) btnX.onclick = cerrar;
  if (btnA) btnA.onclick = function(){ mover(-1); };
  if (btnS) btnS.onclick = function(){ mover(1); };

  el.onclick = function(e){
    if (e.target === el) cerrar();
  };

  window.addEventListener('keydown', function(e){
    if (!el.classList.contains('on')) return;
    if (e.key === 'Escape') cerrar();
    if (e.key === 'ArrowLeft') mover(-1);
    if (e.key === 'ArrowRight') mover(1);
  });

  return {
    abrir: function(list, i){
      L = list;
      k = i;
      el.classList.toggle('uno', L.length < 2);
      ver();
      el.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
  };
})();
