// main.js: theme toggle, smooth scroll, contact form handling

document.addEventListener('DOMContentLoaded', ()=>{
  // Theme toggle
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  if(saved === 'light') root.classList.add('light');
  btn.addEventListener('click', ()=>{
    const isLight = root.classList.toggle('light');
    btn.textContent = isLight ? '🌞':'🌙';
    localStorage.setItem('theme', isLight ? 'light':'dark');
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // contact form: simple client-side mailto fallback
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name');
      const email = fd.get('email');
      const message = fd.get('message');
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:kabileshwaran1896@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});