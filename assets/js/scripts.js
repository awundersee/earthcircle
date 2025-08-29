// Prüfen, ob das Chart-Element existiert
const circleContainer = document.getElementById('circle-container');
const scrollCircle = document.getElementById('scrollCircle');
const colorSwitchEl = document.getElementById('color-switch');

let scrollChart = null;

if (scrollCircle) {
  const ctx = scrollCircle.getContext('2d');

  scrollChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [100, 0], // Start voll
        backgroundColor: ['#d8d8d8', '#ce7a00'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '60%',
      animation: false,
      rotation: 35,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
}

let ticking = false;

function updateChart(progress) {
  if (!scrollChart) return;

  let percent;
  let color = '#ce7a00';

  if (progress <= 0.3) {
    percent = (progress / 0.3) * 30;
    colorSwitchEl?.classList.remove("text-primary");
  } else {
    const relative = (progress - 0.3) / 0.7;
    percent = 30 * (1 - relative * 0.5);
    color = '#1b834b';
    colorSwitchEl?.classList.add("text-primary");
  }

  percent = Math.max(0, Math.min(100, percent));

  scrollChart.data.datasets[0].data = [percent, 100 - percent];

  if (scrollChart.data.datasets[0].backgroundColor[1] !== color) {
    scrollChart.data.datasets[0].backgroundColor[1] = color;
  }

  scrollChart.update();
}

function onScroll() {
  if (!circleContainer) return;

  const rect = circleContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const start = windowHeight;
  const end = -rect.height;

  let progress = (start - rect.top) / (start - end);
  progress = Math.min(Math.max(progress, 0), 1);

  if (!ticking) {
    requestAnimationFrame(() => {
      updateChart(progress);
      ticking = false;
    });
    ticking = true;
  }
}

if (circleContainer) {
  window.addEventListener('scroll', onScroll);
  onScroll(); // initial
}

// Fade-In Effekt
const fadeIns = document.querySelectorAll(".primary-on-fade");

function handleScrollFade() {
  const viewportHeight = window.innerHeight;

  fadeIns.forEach(el => {
    const rect = el.getBoundingClientRect();
    const triggerPoint = viewportHeight / 5;

    if (rect.top < viewportHeight - triggerPoint && rect.bottom > triggerPoint) {
      el.classList.add("text-primary", "has-icon");
    } else {
      el.classList.remove("text-primary", "has-icon");
    }
  });
}

if (fadeIns.length) {
  window.addEventListener("scroll", handleScrollFade);
  window.addEventListener("resize", handleScrollFade);
  handleScrollFade(); // initial
}

const counters = document.querySelectorAll(".counter");

  if (counters.length > 0) {
    const formatNumber = (num) =>
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const animateCounter = (el) => {
      const target = parseInt(el.dataset.number, 10) || 0;
      let current = 0;

      // Dynamische Dauer: kleine Zahlen länger, große kürzer – max. 1000ms
      // Beispiel: 100 → ~1000ms, 1000 → ~700ms, 100000 → ~200ms
      const duration = Math.max(200, 1000 - Math.log10(target + 1) * 150);

      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        current = Math.floor(progress * target);
        el.textContent = formatNumber(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = formatNumber(target);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.33 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }