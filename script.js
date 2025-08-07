// Referencias a vistas y botones
const mainView   = document.getElementById('main-view');
const views      = document.querySelectorAll('.view');
const btns       = {
  fotico:      document.getElementById('btn-fotico'),
  dedicatoria: document.getElementById('btn-dedicatoria'),
  cancion:     document.getElementById('btn-cancion'),
  todo:        document.getElementById('btn-todo')
};

// Función para cambiar de vista
function showView(id) {
  views.forEach(v => {
    v.classList.remove('active');
    v.style.opacity = 0;
  });
  
  setTimeout(() => {
    const view = document.getElementById(id);
    view.classList.add('active');
    view.style.opacity = 1;
    
    // Animación de entrada
    view.style.animation = 'scaleIn .6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  }, 300);
}

// Botones principales
btns.fotico.addEventListener('click', () => showView('view-fotico'));
btns.dedicatoria.addEventListener('click', () => showView('view-dedicatoria'));
btns.cancion.addEventListener('click', () => showView('view-cancion'));
btns.todo.addEventListener('click', () => showView('view-todo'));

// Botón reproducir canción
document.getElementById('play-btn').addEventListener('click', function() {
  const audio = document.getElementById('audio');
  const icon = this.querySelector('i');
  
  if (audio.paused) {
    audio.play();
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
    this.innerHTML = '<i class="fas fa-pause"></i> Pausar canción';
  } else {
    audio.pause();
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    this.innerHTML = '<i class="fas fa-play"></i> Reproducir canción';
  }
});

// Botón reproducir todo
document.getElementById('play-todo').addEventListener('click', function() {
  const audio = document.getElementById('audio2');
  const icon = this.querySelector('i');
  
  if (audio.paused) {
    audio.play();
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
    this.innerHTML = '<i class="fas fa-pause"></i> Pausar canción';
  } else {
    audio.pause();
    icon.classList.remove('fa-pause');
    icon.classList.add('fa-play');
    this.innerHTML = '<i class="fas fa-play"></i> Reproducir canción';
  }
});

// Botones de regresar
document.querySelectorAll('.btn-back').forEach(btn => {
  btn.addEventListener('click', () => {
    // Pausar cualquier audio al volver
    document.getElementById('audio').pause();
    document.getElementById('audio2').pause();
    
    // Restaurar iconos de play
    document.querySelectorAll('#play-btn i, #play-todo i').forEach(icon => {
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
    });
    
    document.getElementById('play-btn').innerHTML = '<i class="fas fa-play"></i> Reproducir canción';
    document.getElementById('play-todo').innerHTML = '<i class="fas fa-play"></i> Reproducir canción';
    
    showView('main-view');
  });
});

// Efecto de confeti al cargar la página
window.addEventListener('load', () => {
  const title = document.querySelector('h1');
  title.style.animation = 'scaleIn .6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  
  // Animación para elementos decorativos
  document.querySelectorAll('.decoration').forEach((el, i) => {
    el.style.animationDelay = `${i * 0.5}s`;
  });
});

// Agregar efecto de confeti al hacer clic en botones principales
document.querySelectorAll('#btn-fotico, #btn-dedicatoria, #btn-cancion, #btn-todo').forEach(btn => {
  btn.addEventListener('click', () => {
    // Crear confeti
    for (let i = 0; i < 30; i++) {
      createConfetti(btn);
    }
  });
});

function createConfetti(element) {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  
  // Posicionar confetti en el botón
  const rect = element.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  
  confetti.style.left = `${x}px`;
  confetti.style.top = `${y}px`;
  
  // Colores aleatorios
  const colors = ['#ff9ec8', '#8e6eda', '#6ebcf2', '#ffd166', '#06d6a0'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  confetti.style.backgroundColor = randomColor;
  
  // Tamaño y forma aleatorios
  const size = Math.random() * 10 + 5;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
  
  document.body.appendChild(confetti);
  
  // Animación
  const angle = Math.random() * Math.PI * 2;
  const velocity = 30 + Math.random() * 50;
  const vx = Math.cos(angle) * velocity;
  const vy = Math.sin(angle) * velocity;
  
  const animation = confetti.animate([
    { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
    { transform: `translate(${vx}px, ${vy}px) rotate(${360 * Math.random()}deg)`, opacity: 0 }
  ], {
    duration: 1000 + Math.random() * 1000,
    easing: 'cubic-bezier(0.2, 0, 0.8, 1)'
  });
  
  animation.onfinish = () => confetti.remove();
}