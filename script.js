/* ===== CONTADOR DE INICIO ===== */
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

/* ===== CARRUSEL UNIFICADO MAR DEL PLATA ===== */
let indiceActual = 0;
let intervaloCarrusel;
function iniciarCarrusel() {
  clearInterval(intervaloCarrusel);
  intervaloCarrusel = setInterval(() => cambiarFoto(1), 9000);
}
function cambiarFoto(direccion) {
  const slides = document.querySelectorAll('#galeria-mdp .slide');
  if (!slides.length) return;
  slides[indiceActual].classList.remove('activa');
  indiceActual = (indiceActual + direccion + slides.length) % slides.length;
  slides[indiceActual].classList.add('activa');
  const contador = document.getElementById('contador-fotos');
  if (contador) contador.textContent = `${indiceActual + 1} / ${slides.length}`;
  iniciarCarrusel();
}
function mostrarSede(sede, boton) {
  document.querySelectorAll('.btn-sede').forEach(btn => btn.classList.remove('activo'));
  boton.classList.add('activo');
  const mdp = document.getElementById('galeria-mdp');
  const dolores = document.getElementById('galeria-dolores');
  if (sede === 'mdp') {
    mdp.style.display = 'block'; dolores.style.display = 'none'; iniciarCarrusel();
  } else {
    mdp.style.display = 'none'; dolores.style.display = 'block'; clearInterval(intervaloCarrusel);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('#galeria-mdp .slide');
  const contador = document.getElementById('contador-fotos');
  if (contador && slides.length) contador.textContent = `1 / ${slides.length}`;
  iniciarCarrusel();
});

/* ===== GALERÍA DE ACTIVIDADES ===== */
var GALERIAS = {
  acti: [{ n: 'Actividades', d: 'Momentos para compartir, divertirse y sentirse acompañado.', f: [['actividad-1.jpg','Pintura'],['actividad-2.jpg','Clases de gimnasia'],['actividad-3.jpeg','Lúdicas'],['actividad-4.jpeg','Talleres']] }]
};
document.querySelectorAll('[data-galeria="acti"]').forEach(function(root){
  var G=GALERIAS.acti,g=0,i=0,x0=null,arr=false,cambioTimer=null,autoTimer=null;
  var grad='linear-gradient(135deg,#8fd3fb,#2c5a78)';
  var quieto=matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.innerHTML='<div class="chips" style="display:none"></div><p class="gdesc"></p><div class="visor" tabindex="0"><span class="amp">⤢ Ampliar</span><div class="foto"></div><p class="pie"></p><button class="fl ant" aria-label="Anterior">‹</button><button class="fl sig" aria-label="Siguiente">›</button><div class="pts"></div></div>';
  var gd=root.querySelector('.gdesc'),foto=root.querySelector('.foto'),pie=root.querySelector('.pie'),pts=root.querySelector('.pts'),visor=root.querySelector('.visor');
  function ver(){var fs=G[g].f,d=fs[i];gd.textContent=G[g].d||'';clearTimeout(cambioTimer);foto.classList.add('out');cambioTimer=setTimeout(function(){foto.style.backgroundImage='url("'+d[0]+'"),'+grad;pie.textContent=d[1]||'';foto.classList.remove('out');},150);pts.innerHTML=fs.map(function(_,k){return '<i'+(k===i?' class="on"':'')+'></i>';}).join('');}
  function mover(n){i=(i+n+G[g].f.length)%G[g].f.length;ver();}
  function iniciarAuto(){clearInterval(autoTimer);if(!quieto)autoTimer=setInterval(function(){mover(1);},4000);}
  root.querySelector('.ant').onclick=function(){mover(-1);iniciarAuto();};
  root.querySelector('.sig').onclick=function(){mover(1);iniciarAuto();};
  visor.onkeydown=function(e){if(e.key==='ArrowLeft'){mover(-1);iniciarAuto();}if(e.key==='ArrowRight'){mover(1);iniciarAuto();}};
  visor.onpointerdown=function(e){x0=e.clientX;clearInterval(autoTimer);};
  visor.onpointerup=function(e){arr=false;if(x0!==null&&Math.abs(e.clientX-x0)>40){mover(e.clientX<x0?1:-1);arr=true;}x0=null;iniciarAuto();};
  visor.onclick=function(e){if(arr||e.target.closest('.fl'))return;if(typeof LB!=='undefined')LB.abrir(G[g].f,i);};
  ver();iniciarAuto();
});

/* ===== POSTULACIONES ===== */
var FORMULARIO_POSTULACION='https://docs.google.com/forms/d/e/1FAIpQLSdngu-JR4ssHfunH-ib8SW-hn6j79v7CwRi_fTt3CTeMI3meQ/viewform?usp=publish-editor';
var FORMULARIO_POSTULACION_DOLORES='https://forms.gle/eyVSK1XR3yKEfDxi9';
var LINKS_DOCUMENTACION={Asistentes:FORMULARIO_POSTULACION,Profesionales:FORMULARIO_POSTULACION,Auxiliares:FORMULARIO_POSTULACION,Enfermero:FORMULARIO_POSTULACION,Dolores:FORMULARIO_POSTULACION_DOLORES};
var panelViejo=document.getElementById('panel');if(panelViejo)panelViejo.style.display='none';
document.querySelectorAll('.rol').forEach(function(b){var r=b.dataset.rol,sub=document.createElement('div');sub.className='rol-detalle';sub.innerHTML='<p>Postulación para <b>'+r+'</b>. En el formulario, indicá este puesto y adjuntá tu CV junto con la documentación solicitada.</p><a class="btn" href="'+(LINKS_DOCUMENTACION[r]||FORMULARIO_POSTULACION)+'" target="_blank" rel="noopener">Postularme</a>';b.insertAdjacentElement('afterend',sub);b.onclick=function(){var abierto=b.getAttribute('aria-expanded')==='true';document.querySelectorAll('.rol').forEach(function(o){o.setAttribute('aria-expanded','false');});document.querySelectorAll('.rol-detalle').forEach(function(p){p.classList.remove('on');});if(!abierto){b.setAttribute('aria-expanded','true');sub.classList.add('on');}};});

/* ===== SERVICIOS ===== */
var SERVICIOS=[
 ['Servicio médico','Un médico que conoce a cada residente y cuida su salud de cerca: controles regulares, tratamientos al día y novedades para la familia.','servicio-1.jpg'],
 ['Enfermería las 24 hs','Presencia permanente de enfermeras, que controlan y atienden a los residentes; otorgando los cuidados que cada uno requiere','servicio-2.jpg'],
 ['Nutricionista','La equilibrada y buena alimentación también es parte de la salud. Menues variados respetando las indicaciones médicas brindando calidad.','servicio-3.jpg'],
 ['Terapista ocupacional','Colabora a mantener la autonomía de cada residente, mediante la estimulación cognitiva, práctica de actividades lúdicas y ejercitación leve.','servicio-4.jpg'],
 ['Actividades recreativas','Actividades lúdicas, música, pintura, dibujo y festejos; porque el tiempo compartido con charlas y risas también forma parte del cuidado.','servicio-5.jpg']
];
(function(){var root=document.querySelector('.serv-g');if(!root)return;var L=root.querySelector('.lista-s'),E=root.querySelector('.escena'),k=0,t=null;var quieto=matchMedia('(prefers-reduced-motion: reduce)').matches;var grad=['#8fd3fb,#2c5a78','#b8e4ff,#4a7a96','#6fc3ef,#1f4a66','#9bd8fb,#35627f','#a9ddf9,#2a5672'];SERVICIOS.forEach(function(s,n){var b=document.createElement('button');b.className='sv';b.innerHTML='<strong>'+s[0]+'</strong><div class="sv-body"><div class="sv-img" style="background-image:url(\''+s[2]+'\'),linear-gradient(135deg,'+grad[n%grad.length]+')"></div><span>'+s[1]+'</span></div><i></i>';b.onclick=function(){ir(n);arrancar();};L.appendChild(b);var c=document.createElement('div');c.className='capa';c.style.backgroundImage='url("'+s[2]+'"),linear-gradient(135deg,'+grad[n%grad.length]+')';E.appendChild(c);});function ir(n){k=n;Array.from(L.children).forEach(function(b,i){b.classList.toggle('on',i===n);});Array.from(E.children).forEach(function(c,i){c.classList.toggle('on',i===n);});}function arrancar(){clearInterval(t);if(!quieto)t=setInterval(function(){ir((k+1)%SERVICIOS.length);},12000);}root.onmouseenter=function(){clearInterval(t);};root.onmouseleave=arrancar;ir(0);arrancar();})();

/* ===== MENÚ Y NAVEGACIÓN MÓVIL ===== */
(function(){
  var top=document.getElementById('top'),menu=document.getElementById('menu'),burger=document.querySelector('.burger');
  var sections=Array.from(document.querySelectorAll('main section'));
  var mobileQuery=window.matchMedia('(max-width: 760px)');
  var menuTriggers=burger?[burger]:[],ultimoDisparador=burger;
  function updateTopState(){if(top)top.classList.toggle('sol',window.scrollY>40);}
  function actualizarDisparadores(abierto){menuTriggers.forEach(function(b){if(b)b.setAttribute('aria-expanded',abierto?'true':'false');});}
  function closeMenu(devolverFoco){if(!menu)return;menu.classList.remove('abierto');document.body.classList.remove('menu-abierto');actualizarDisparadores(false);if(burger){burger.textContent='☰';burger.setAttribute('aria-label','Abrir menú');}if(devolverFoco&&ultimoDisparador)ultimoDisparador.focus();}
  function openMenu(disparador){if(!menu)return;ultimoDisparador=disparador||burger;menu.classList.add('abierto');document.body.classList.add('menu-abierto');actualizarDisparadores(true);if(burger){burger.textContent='×';burger.setAttribute('aria-label','Cerrar menú');}}
  sections.forEach(function(section){
    var contenedor=section.querySelector('.wrap')||section;
    var boton=section.querySelector('.volver-menu');
    if(!boton){boton=document.createElement('button');boton.type='button';boton.className='volver-menu';boton.setAttribute('aria-controls','menu');boton.setAttribute('aria-expanded','false');boton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>Explorar otras secciones</span>';contenedor.appendChild(boton);}
    boton.onclick=function(){openMenu(boton);};menuTriggers.push(boton);
  });
  if(burger)burger.addEventListener('click',function(){if(menu&&menu.classList.contains('abierto'))closeMenu(true);else openMenu(burger);});
  function volverAlInicio(actualizarUrl){document.body.classList.remove('seccion-movil-activa');sections.forEach(function(section){section.classList.remove('seccion-activa');});closeMenu(false);if(actualizarUrl&&location.hash!=='#inicio')history.pushState(null,'','#inicio');window.scrollTo(0,0);}
  function mostrarSeccion(section,actualizarUrl){
    if(!section)return false;
    if(mobileQuery.matches){
      sections.forEach(function(item){item.classList.add('bloque');item.classList.toggle('seccion-activa',item===section);});
      document.body.classList.add('recorrido-movil','seccion-movil-activa');closeMenu(false);section.scrollTop=0;window.scrollTo(0,0);
      if(actualizarUrl&&location.hash!=='#'+section.id)history.pushState(null,'','#'+section.id);
    }
    return true;
  }
  function sincronizarConHash(){
    if(!mobileQuery.matches)return;
    var id=decodeURIComponent(location.hash.slice(1));
    if(!id||id==='inicio'){volverAlInicio(false);return;}
    var target=document.getElementById(id);
    var section=target&&target.closest('main section');
    if(section)mostrarSeccion(section,false);
  }
  document.addEventListener('click',function(e){
    if(!mobileQuery.matches)return;
    var link=e.target.closest('a[href^="#"]');if(!link)return;
    var id=decodeURIComponent(link.getAttribute('href').slice(1));
    if(id==='inicio'){e.preventDefault();volverAlInicio(true);return;}
    var target=document.getElementById(id),section=target&&target.closest('main section');
    if(!section)return;
    e.preventDefault();mostrarSeccion(section,true);
  });
  function actualizarModoMovil(){
    if(mobileQuery.matches){document.body.classList.add('recorrido-movil');sincronizarConHash();}
    else{document.body.classList.remove('recorrido-movil','seccion-movil-activa','menu-abierto');sections.forEach(function(section){section.classList.remove('seccion-activa','bloque');});closeMenu(false);}
    updateTopState();
  }
  window.addEventListener('scroll',updateTopState,{passive:true});window.addEventListener('hashchange',sincronizarConHash);window.addEventListener('popstate',sincronizarConHash);
  if(mobileQuery.addEventListener)mobileQuery.addEventListener('change',actualizarModoMovil);else mobileQuery.addListener(actualizarModoMovil);
  actualizarModoMovil();
})();

/* ===== FOTO AMPLIADA ===== */
var LB=(function(){
  var el=document.getElementById('lb'),im=el&&el.querySelector('.lb-f'),cap=el&&el.querySelector('.lb-c'),L=[],k=0;
  if(!el)return{abrir:function(){}};
  function ver(){var d=L[k];if(!d)return;im.style.backgroundImage='url("'+d[0]+'"),linear-gradient(135deg,#8fd3fb,#2c5a78)';cap.textContent=d[1]+(L.length>1?'  ·  '+(k+1)+' / '+L.length:'');}
  function mover(n){k=(k+n+L.length)%L.length;ver();}
  function cerrar(){el.classList.remove('on');document.body.style.overflow='';}
  var bx=el.querySelector('.lb-x'),ba=el.querySelector('.lb-a'),bs=el.querySelector('.lb-s');
  if(bx)bx.onclick=cerrar;if(ba)ba.onclick=function(){mover(-1);};if(bs)bs.onclick=function(){mover(1);};
  el.onclick=function(e){if(e.target===el)cerrar();};
  window.addEventListener('keydown',function(e){if(!el.classList.contains('on'))return;if(e.key==='Escape')cerrar();if(e.key==='ArrowLeft')mover(-1);if(e.key==='ArrowRight')mover(1);});
  return{abrir:function(list,i){L=list||[];k=i||0;if(!L.length)return;el.classList.toggle('uno',L.length<2);ver();el.classList.add('on');document.body.style.overflow='hidden';}};
})();
