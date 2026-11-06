(function(){
  // rok w stopce
  document.querySelectorAll('[data-rok]').forEach(function(e){e.textContent=new Date().getFullYear();});

  // menu mobilne
  var burger=document.querySelector('.burger'), menu=document.getElementById('menu-mob');
  function zamknij(){menu.hidden=true;burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Otwórz menu');document.body.style.overflow='';}
  burger.addEventListener('click',function(){
    var otw=menu.hidden;
    menu.hidden=!otw; burger.setAttribute('aria-expanded',String(otw));
    burger.setAttribute('aria-label',otw?'Zamknij menu':'Otwórz menu');
    document.body.style.overflow=otw?'hidden':'';
  });
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',zamknij);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden)zamknij();});

  // aktywna pozycja menu wg sekcji
  var linki=[].slice.call(document.querySelectorAll('.nav a, .menu-mob nav a'));
  var sekcje=['top','oferta','sklep','o-firmie','kontakt'].map(function(id){return id==='top'?document.querySelector('.hero'):document.getElementById(id);});
  function ustaw(id){linki.forEach(function(a){var on=a.getAttribute('href')==='#'+id;a.classList.toggle('on',on);if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(wp){wp.forEach(function(w){if(w.isIntersecting){var el=w.target;ustaw(el.classList.contains('hero')?'top':el.id);}});},{rootMargin:'-45% 0px -50% 0px'});
    sekcje.forEach(function(s){if(s)io.observe(s);});
  }

  // tory: przeciąganie myszą + strzałki
  document.querySelectorAll('[data-tor]').forEach(function(tor){
    var x0=0,s0=0,dn=false,ruch=false;
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;dn=true;ruch=false;x0=e.clientX;s0=tor.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!dn)return;var dx=e.clientX-x0;if(Math.abs(dx)>4){ruch=true;tor.classList.add('ciag');}tor.scrollLeft=s0-dx;});
    window.addEventListener('pointerup',function(){if(!dn)return;dn=false;setTimeout(function(){tor.classList.remove('ciag');},0);});
    tor.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false;}},true);
    tor.addEventListener('dragstart',function(e){e.preventDefault();});
  });
  document.querySelectorAll('.strz').forEach(function(b){
    b.addEventListener('click',function(){
      var tor=b.closest('section').querySelector('[data-tor]');
      var k=tor.querySelector('[role=listitem]');var w=k?k.getBoundingClientRect().width+20:320;
      tor.scrollBy({left:w*Number(b.dataset.kier),behavior:'smooth'});
    });
  });

  // dolny pasek po przewinięciu za przycisk hero
  var pasek=document.querySelector('.mob-pasek'), cta=document.querySelector('.hero-cta');
  if(pasek&&cta&&'IntersectionObserver' in window){
    new IntersectionObserver(function(w){
      var widac=!w[0].isIntersecting&&w[0].boundingClientRect.top<0;
      pasek.classList.toggle('widac',widac);
      pasek.setAttribute('aria-hidden',String(!widac));
      pasek.querySelectorAll('a').forEach(function(a){a.tabIndex=widac?0:-1;});
    }).observe(cta);
  }
})();
