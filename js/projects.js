// projects.js: fetch data/projects.json and render project cards

async function loadProjects(){
  try{
    const res = await fetch('data/projects.json');
    const data = await res.json();
    renderProjects(data);
  }catch(err){
    console.error('Failed to load projects', err);
    document.getElementById('projects-grid').innerHTML = '<p>Could not load projects.</p>';
  }
}

function renderProjects(projects){
  const grid = document.getElementById('projects-grid');
  const filters = document.getElementById('projects-filters');
  const search = document.getElementById('projects-search');
  const categories = Array.from(new Set(projects.map(p=>p.category))).filter(Boolean);

  // render filters if the container exists (page may not include search/filters)
  if(filters){
    filters.innerHTML = '<button data-cat="all" class="tag">All</button>' + categories.map(c=>`<button data-cat="${c}" class="tag">${c}</button>`).join('');
    filters.querySelectorAll('button').forEach(btn=>btn.addEventListener('click', ()=>{
      const cat = btn.dataset.cat;
      const filtered = cat === 'all' ? projects : projects.filter(p=>p.category===cat);
      renderCards(filtered);
    }));
  }

  // wire up search if present
  if(search){
    search.addEventListener('input', ()=>{
      const q = search.value.trim().toLowerCase();
      const filtered = projects.filter(p=> (p.title+ ' '+ p.description + ' '+ (p.tech||'')).toLowerCase().includes(q));
      renderCards(filtered);
    });
  }

  renderCards(projects);
}

function renderCards(list){
  const grid = document.getElementById('projects-grid');
  if(!list.length){ grid.innerHTML = '<p>No projects found.</p>'; return }
  grid.innerHTML = list.map(p=>`
    <article class="project-card reveal">
      <div class="project-image"><img src="${p.social_preview || p.image || (p.images && p.images[0]) || 'assets/images/project-placeholder.png'}" alt="${p.title} preview" loading="lazy" /></div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <div class="project-meta">${p.language || ''} ${p.stars? '• '+p.stars+' ⭐':''}</div>
        <p class="project-desc">${p.description || ''}</p>
        <div class="project-tags">${(p.tech||[]).map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-actions" style="margin-top:0.6rem">
          ${p.repo?`<a class="btn" href="${p.repo}" target="_blank" rel="noopener noreferrer">Repo</a>`:''}
          ${p.demo?`<a class="btn" href="${p.demo}" target="_blank" rel="noopener noreferrer">Live</a>`:''}
        </div>
      </div>
    </article>
  `).join('');
  // re-run reveal observer by adding class to start hidden
  document.querySelectorAll('.reveal').forEach(n=>n.classList.remove('active'));
  // small timeout to allow IntersectionObserver to pick up
  setTimeout(()=>document.querySelectorAll('.reveal').forEach(n=>n.classList.add('active')),120);
}

// load on DOM ready
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', loadProjects); else loadProjects();