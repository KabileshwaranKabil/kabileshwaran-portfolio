// notes.js — load and render notes from data/notes.json

async function loadNotes(){
  try{
    const res = await fetch('data/notes.json');
    const notes = await res.json();
    renderNotes(notes);
  }catch(err){
    console.error('Failed to load notes', err);
    document.getElementById('notes').innerHTML = '<p>Could not load notes.</p>';
  }
}

function renderNotes(notes){
  const container = document.querySelector('#notes .notes-list');
  if(!container){
    console.warn('No notes container found');
    return;
  }
  if(!notes.length){ container.innerHTML = '<p>No notes yet.</p>'; return }
  // Render each note as a separate card inside a responsive grid
  const cards = notes.map(n=>`
    <article class="note-card reveal">
      <h3>${n.title}</h3>
      <p>${n.description || ''}</p>
      <div class="note-actions">
        <a class="btn" href="${n.link}" target="_blank" rel="noopener noreferrer">Open in Drive</a>
        ${n.local?`<a class="btn" href="${n.local}" target="_blank" rel="noopener noreferrer">View Local</a>`:''}
        <a class="btn secondary" href="${n.link}" target="_blank" rel="noopener noreferrer">Download</a>
      </div>
    </article>
  `).join('');

  container.innerHTML = `<div class="notes-grid">${cards}</div>`;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', loadNotes); else loadNotes();