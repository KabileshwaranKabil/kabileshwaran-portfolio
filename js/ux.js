// ux.js: typing intro and reveal-on-scroll

document.addEventListener('DOMContentLoaded', ()=>{
  // Simple typewriter
  const el = document.getElementById('typewriter');
  const phrases = ["Computer Science Student","DSA • Web • AI","Building projects & notes"];
  let pi=0, ci=0, forward=true;
  function step(){
    const p = phrases[pi];
    el.textContent = p.slice(0,ci);
    if(forward){
      if(ci++ >= p.length){ forward=false; setTimeout(step,1200); return }
    } else {
      if(ci-- <= 0){ forward=true; pi=(pi+1)%phrases.length }
    }
    setTimeout(step, 70);
  }
  step();

  // Reveal on scroll (IntersectionObserver)
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('active');
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(n=>obs.observe(n));

  // Animate skill bars when skills in view
  const skillSection = document.getElementById('skills');
  if(skillSection){
    const skillObs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          document.querySelectorAll('.skill-bar').forEach(sb=>{
            const lvl = sb.dataset.level || 60;
            sb.style.setProperty('--fill', lvl + '%');
          });
          skillObs.disconnect();
        }
      });
    },{threshold:0.25});
    skillObs.observe(skillSection);
  }
});