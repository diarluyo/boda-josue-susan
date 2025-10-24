document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logo");
  const intro = document.getElementById("intro");
  const content = document.getElementById("content");
  const main = document.getElementById("main");
  const nombres = document.querySelector(".nombres");
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("music-btn");
  const playIcon = document.getElementById("play-icon");
  const pauseIcon = document.getElementById("pause-icon");

  let musicPlaying = false;

  // Al cargar, bloquear el scroll
  document.body.style.overflowY = "hidden";

  logo.addEventListener("click", () => {
    // Oculta la pantalla inicial y muestra el contenido principal
    intro.style.display = "none";
    content.classList.remove("hidden");
    document.body.style.overflowY = "auto";

    // Animaciones suaves
    setTimeout(() => main.classList.add("fade-in"), 100);
    setTimeout(() => nombres.classList.add("fade-text"), 600);

    // Mostrar botón de música luego de la animación
    setTimeout(() => {
      musicBtn.classList.remove("hidden");
    }, 2000);

    // Intentar reproducir música automáticamente SOLO después del clic
    setTimeout(() => {
      music.play().then(() => {
        musicPlaying = true;
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      }).catch(() => {
        // Si el navegador bloquea la reproducción automática
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      });
    }, 2500);
  });

  // Control manual del botón de música
  musicBtn.addEventListener("click", () => {
    if (musicPlaying) {
      music.pause();
      musicPlaying = false;
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    } else {
      music.play();
      musicPlaying = true;
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    }
  });
});

// --- Animación de la frase al hacer scroll ---
const frase = document.querySelector('.frase-1');
window.addEventListener('scroll', () => {
  const rect = frase.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.75) {
    frase.classList.add('visible');
  }
});
