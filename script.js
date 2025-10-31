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

  // --- BLOQUEAR SCROLL AL INICIO ---
  document.body.style.overflowY = "hidden";

  // --- LOGO CLICK ---
  logo.addEventListener("click", () => {
    intro.style.display = "none";
    content.classList.remove("hidden");
    document.body.style.overflowY = "auto";

    setTimeout(() => main.classList.add("fade-in"), 100);
    setTimeout(() => nombres.classList.add("fade-text"), 600);
    setTimeout(() => musicBtn.classList.remove("hidden"), 2000);

    // Intentar reproducir música automáticamente luego del clic
    setTimeout(() => {
      music.play().then(() => {
        musicPlaying = true;
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
      }).catch(() => {
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
      });
    }, 2500);
  });

  // --- CONTROL BOTÓN DE MÚSICA ---
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

  // --- ANIMACIONES CON INTERSECTION OBSERVER ---
  const elements = document.querySelectorAll(".fade-in");
  const frases = document.querySelectorAll(".frase-1"); // <--- todas tus frases

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); // si quieres que se repita al volver
      }
    });
  }, { threshold: 0.3 });

  // Observa todos los elementos animables
  elements.forEach(el => observer.observe(el));
  frases.forEach(frase => observer.observe(frase));

  // --- CONTADOR ---
  const targetDate = new Date("Nov 29, 2025 00:00:00").getTime();

  const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(timer);
      document.querySelector(".countdown").innerHTML =
        "<p>¡Hoy es el gran día!</p>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
  }, 1000);

  // --- CARRUSEL GALERÍA ---
  const carrusel = document.querySelector('.contenido-galeria');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  let index = 0;
  const total = document.querySelectorAll('.contenido-galeria img').length;

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % total;
    carrusel.style.transform = `translateX(-${index * 100}%)`;
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + total) % total;
    carrusel.style.transform = `translateX(-${index * 100}%)`;
  });


});
