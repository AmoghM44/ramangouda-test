document.addEventListener('DOMContentLoaded', ()=> {
  const steps = [...document.querySelectorAll('.step')];
  const fill = document.querySelector('.progress-bar .fill');
  const indicators = [...document.querySelectorAll('.indicator')];
  const catCards = [...document.querySelectorAll('.cat-card')];
  let idx = 0;

  function show(i){
    steps.forEach((s,si)=> s.classList.toggle('active', si===i));
    indicators.forEach((ind,ii)=> ind.classList.toggle('active', ii<=i));
    const pct = Math.round(((i+1)/steps.length)*100);
    fill.style.width = pct + '%';
    document.querySelector('.step-title').textContent = `Step ${i+1} of ${steps.length}`;
  }

  show(idx);

  document.querySelectorAll('[data-next]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      if(idx < steps.length-1){ idx++; show(idx); window.scrollTo({top:0,behavior:'smooth'}); }
    });
  });
  document.querySelectorAll('[data-prev]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      if(idx>0){ idx--; show(idx); window.scrollTo({top:0,behavior:'smooth'}); }
    });
  });

  // SINGLE-SELECTION behavior for category cards
  catCards.forEach(card=>{
    card.addEventListener('click', ()=>{
      // deselect others
      catCards.forEach(c=> c.classList.remove('selected'));
      card.classList.add('selected');
      // store selection if you want
      try{ sessionStorage.setItem('selectedCategory', card.getAttribute('data-key')); }catch(e){}
    });
  });

  // add service example: clone template
  document.querySelectorAll('.add-service').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const container = document.querySelector('#services-container');
      const tpl = document.querySelector('.service-template');
      const clone = tpl.cloneNode(true);
      clone.classList.remove('service-template');
      clone.style.display = 'block';
      container.appendChild(clone);
    });
  });

  // remove service (delegated)
  document.body.addEventListener('click', (e)=>{
    if(e.target.matches('.remove')) {
      const card = e.target.closest('.service');
      if(card) card.remove();
    }
  });
});
