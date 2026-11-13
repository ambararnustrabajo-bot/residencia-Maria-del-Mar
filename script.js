(function(){
    var el=document.getElementById('n');
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var t0=performance.now();
    (function paso(t){
      var p=Math.min((t-t0-500)/1400,1);
      el.textContent=Math.max(0,Math.round(15*p));
      if(p<1) requestAnimationFrame(paso);
    })(t0);
  })();
  
  
  /* ===== EDITÁ ACÁ: fotos y textos ===== */
  var GALERIAS={
    hab:[
      {n:'Habitaciones',d:'Cada habitación es un rincón propio: luminosa, con su cama, placard, mesita de luz y ventana. Un lugar para descansar y sentirse como en casa.',f:[['habitacion-1.jpg'],['habitacion-2.jpg'],['habitacion-3.jpg'], ['habitacion-4.jpg'], ['habitacion-5.jpg'], ['habitacion-6.jpg'], ['habitacion-7.jpg'], ['habitacion-8.jpg'],['habitacion-9.jpg']]},
      {n:'Cocina / comedor',d:'Acá se comparte la mesa: desayunos, almuerzos y meriendas en compañía, con comida casera y buena conversación.',f:[['img/cocina-1.jpg','Cocina y comedor']]},
      {n:'Planta baja / patio',d:'Pasillos amplios y fáciles de recorrer, y un patio para salir a tomar aire sin alejarse de casa.',f:[['img/patio-1.jpg','Planta baja y patio']]},
      {n:'Primer piso',d:'Ambientes tranquilos y con mucha luz natural, pensados para vivir con calma.',f:[['img/primerpiso-1.jpg']]}
    ],
    acti:[
      {n:'Actividades',d:'Momentos para compartir, divertirse y sentirse acompañado.',f:[['actividad-1.jpg','Pintura'],['actividad-2.jpg', 'Clases de gimnasia'],['actividad-3.jpg', 'Lúdicas'],['actividad-4.jpg', 'Canto']]}
    ]
  };
  var ROLES={Asistentes:'asistentes',Profesionales:'profesionales',Auxiliares:'auxiliares'};
  var FORMULARIO_POSTULACION='https://docs.google.com/forms/d/e/1FAIpQLSdngu-JR4ssHfunH-ib8SW-hn6j79v7CwRi_fTt3CTeMI3meQ/viewform?usp=publish-editor';
  var LINKS_DOCUMENTACION={Asistentes:FORMULARIO_POSTULACION,Profesionales:FORMULARIO_POSTULACION,Auxiliares:FORMULARIO_POSTULACION};
  
  document.querySelectorAll('[data-galeria]').forEach(function(root){
    var G=GALERIAS[root.dataset.galeria],g=0,i=0,x0=null,arr=false,cambioTimer=null;
    var grad='linear-gradient(135deg,#8fd3fb,#2c5a78)';
    root.innerHTML='<div class="chips"></div><p class="gdesc"></p><div class="visor" tabindex="0"><span class="amp">⤢ Ampliar</span><div class="foto"></div><p class="pie"></p><button class="fl ant" aria-label="Anterior">‹</button><button class="fl sig" aria-label="Siguiente">›</button><div class="pts"></div></div><button type="button" class="volver-categorias"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7 7-7-7 7-7"/></svg><span>Volver a las categorías</span></button>';
    var chips=root.querySelector('.chips'),gd=root.querySelector('.gdesc'),foto=root.querySelector('.foto'),pie=root.querySelector('.pie'),pts=root.querySelector('.pts'),visor=root.querySelector('.visor'),volver=root.querySelector('.volver-categorias');
    var elegirCategoria=root.dataset.galeria==='hab';
    if(elegirCategoria)root.classList.add('sin-seleccion');
    if(G.length<2) chips.style.display='none';
    G.forEach(function(gr,k){var b=document.createElement('button');b.className='chip';b.textContent=gr.n;b.setAttribute('aria-pressed','false');b.onclick=function(){g=k;i=0;root.classList.remove('sin-seleccion');if(elegirCategoria)root.classList.add('categoria-elegida');ver()};chips.appendChild(b)});
    function ver(){
      var fs=G[g].f,d=fs[i];gd.textContent=G[g].d||'';
      clearTimeout(cambioTimer);
      foto.classList.add('out');
      cambioTimer=setTimeout(function(){
        foto.style.backgroundImage='url("'+d[0]+'"),'+grad;
        pie.textContent=d[1];
        foto.classList.remove('out');
      },320);
      Array.prototype.forEach.call(chips.children,function(c,k){c.setAttribute('aria-pressed',k===g)});
      pts.innerHTML=fs.map(function(_,k){return '<i'+(k===i?' class="on"':'')+'></i>'}).join('');
      root.querySelectorAll('.fl').forEach(function(b){b.style.display=fs.length>1?'':'none'});
    }
    function mover(n){var l=G[g].f.length;i=(i+n+l)%l;ver()}
    root.querySelector('.ant').onclick=function(){mover(-1)};
    root.querySelector('.sig').onclick=function(){mover(1)};
    volver.onclick=function(){
      if(!elegirCategoria)return;
      clearTimeout(cambioTimer);
      root.classList.remove('categoria-elegida');
      root.classList.add('sin-seleccion');
      g=-1;i=0;
      gd.textContent='';foto.style.backgroundImage='none';pie.textContent='';pts.innerHTML='';
      Array.prototype.forEach.call(chips.children,function(b){b.setAttribute('aria-pressed','false')});
      root.querySelectorAll('.fl').forEach(function(b){b.style.display='none'});
      var seccion=root.closest('section');
      seccion.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      requestAnimationFrame(function(){chips.querySelector('button').focus()});
    };
    visor.onkeydown=function(e){if(e.key==='ArrowLeft')mover(-1);if(e.key==='ArrowRight')mover(1)};
    visor.onpointerdown=function(e){x0=e.clientX};
    visor.onpointerup=function(e){arr=false;if(x0!==null&&Math.abs(e.clientX-x0)>50){mover(e.clientX<x0?1:-1);arr=true}x0=null};
    visor.onclick=function(e){if(arr||e.target.closest('.fl'))return;LB.abrir(G[g].f,i)};
    if(!elegirCategoria)ver();
  });
  
  var panel=document.getElementById('panel');
  document.querySelectorAll('.rol').forEach(function(b){
    b.onclick=function(){
      var r=b.dataset.rol,abierto=b.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.rol').forEach(function(o){o.setAttribute('aria-expanded','false')});
      if(abierto){panel.classList.remove('on');return}
      b.setAttribute('aria-expanded','true');
      panel.innerHTML='<p>Postulación para <b>'+r+'</b>. En el formulario, indicá este puesto y adjuntá tu CV junto con la documentación solicitada.</p><a class="btn" href="'+LINKS_DOCUMENTACION[r]+'" target="_blank" rel="noopener">Completar formulario</a>';
      panel.classList.add('on');
    };
  });
  
  var SERVICIOS=[
    ['Servicio médico','Un médico que conoce a cada residente y cuida su salud de cerca: controles regulares, tratamientos al día y novedades para la familia. Vos descansás sabiendo que alguien está atento.','img/servicio-1.jpg'],
    ['Enfermería las 24 hs','De día, de noche y los fines de semana, siempre hay alguien cuidando. Dan la medicación en hora, controlan cómo está cada persona y están a un paso si hace falta ayuda.','img/servicio-2.jpg'],
    ['Nutricionista','Comer bien también es cuidarse. Las comidas se piensan para cada persona: lo que necesita, lo que puede comer y lo que le gusta. Que la mesa sea salud y también un placer.','img/servicio-3.jpg'],
    ['Terapista ocupacional','Ayuda a seguir haciendo lo que cada uno disfruta: vestirse solo, cocinar, escribir, moverse. Con juegos y ejercicios suaves entrena la memoria y la independencia, para sentirse capaz cada día.','img/servicio-4.jpg'],
    ['Actividades recreativas','Acá ningún día es igual: música, juegos, charlas y festejos. Porque la compañía, las risas y tener algo lindo para esperar también son parte del cuidado.','img/servicio-5.jpg']
  ];
  (function(){
    var root=document.querySelector('.serv-g'); if(!root) return;
    var L=root.querySelector('.lista-s'),E=root.querySelector('.escena'),k=0,t=null;
    var quieto=matchMedia('(prefers-reduced-motion: reduce)').matches;
    var grad=['#8fd3fb,#2c5a78','#b8e4ff,#4a7a96','#6fc3ef,#1f4a66','#9bd8fb,#35627f','#a9ddf9,#2a5672'];
    SERVICIOS.forEach(function(s,n){
      var b=document.createElement('button');b.className='sv';
      b.innerHTML='<strong>'+s[0]+'</strong><span>'+s[1]+'</span><i></i>';
      b.onclick=function(){ir(n);arrancar()};L.appendChild(b);
      var c=document.createElement('div');c.className='capa';
      c.style.backgroundImage='url("'+s[2]+'"),linear-gradient(135deg,'+grad[n%grad.length]+')';E.appendChild(c);
    });
    function ir(n){
      k=n;
      [].forEach.call(L.children,function(b){b.classList.remove('on')});
      [].forEach.call(E.children,function(c,i){c.classList.toggle('on',i===n)});
      void L.offsetWidth;
      L.children[n].classList.add('on');
    }
    function arrancar(){
      clearInterval(t);
      if(quieto) return;
      t=setInterval(function(){ir((k+1)%SERVICIOS.length)},7000);
    }
    root.onmouseenter=function(){clearInterval(t)};
    root.onmouseleave=function(){ir(k);arrancar()};
    ir(0);arrancar();
  })();
  
  var LB=(function(){
    var el=document.getElementById('lb'),im=el.querySelector('.lb-f'),cap=el.querySelector('.lb-c'),L=[],k=0;
    function ver(){var d=L[k];im.style.backgroundImage='url("'+d[0]+'"),linear-gradient(135deg,#8fd3fb,#2c5a78)';cap.textContent=d[1]+(L.length>1?'  ·  '+(k+1)+' / '+L.length:'')}
    function mover(n){k=(k+n+L.length)%L.length;ver()}
    function cerrar(){el.classList.remove('on');document.body.style.overflow=''}
    el.querySelector('.lb-x').onclick=cerrar;
    el.querySelector('.lb-a').onclick=function(){mover(-1)};
    el.querySelector('.lb-s').onclick=function(){mover(1)};
    el.onclick=function(e){if(e.target===el)cerrar()};
    addEventListener('keydown',function(e){
      if(!el.classList.contains('on'))return;
      if(e.key==='Escape')cerrar();
      if(e.key==='ArrowLeft')mover(-1);
      if(e.key==='ArrowRight')mover(1);
    });
    return {abrir:function(list,i){L=list;k=i;el.classList.toggle('uno',L.length<2);ver();el.classList.add('on');document.body.style.overflow='hidden'}};
  })();
