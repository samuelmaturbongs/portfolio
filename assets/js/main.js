/* ============================================
   PORTFOLIO - Main JavaScript
   Clean & Modular Code
   ============================================ */

// ===========================================
// 1. DOM ELEMENTS
// ===========================================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const header = document.getElementById('header');
const scrollUp = document.getElementById('scroll-up');
const sections = document.querySelectorAll('section[id]');
const accordionHeaders = document.querySelectorAll('.accordion__header');
const contactForm = document.getElementById('contact-form');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const langToggle = document.getElementById('lang-toggle');
const langLabel = document.getElementById('lang-label');

// ===========================================
// 2. MOBILE NAVIGATION
// ===========================================
function openMenu() {
  navMenu?.classList.add('show-menu');
  navToggle?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu?.classList.remove('show-menu');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// Toggle menu
navToggle?.addEventListener('click', openMenu);
navClose?.addEventListener('click', closeMenu);

// Close menu when clicking nav links
navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu?.classList.contains('show-menu') && 
      !navMenu.contains(e.target) && 
      !navToggle?.contains(e.target)) {
    closeMenu();
  }
});

// ===========================================
// 3. HEADER SCROLL EFFECT
// ===========================================
function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header?.classList.add('scroll-header');
  } else {
    header?.classList.remove('scroll-header');
  }
}

window.addEventListener('scroll', handleHeaderScroll);

// ===========================================
// 4. SCROLL UP BUTTON
// ===========================================
function handleScrollUp() {
  if (window.scrollY > 400) {
    scrollUp?.classList.add('show-scroll');
  } else {
    scrollUp?.classList.remove('show-scroll');
  }
}

window.addEventListener('scroll', handleScrollUp);

// ===========================================
// 5. ACTIVE LINK ON SCROLL
// ===========================================
function setActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active-link');
    } else {
      navLink?.classList.remove('active-link');
    }
  });
}

window.addEventListener('scroll', setActiveLink);

// ===========================================
// 6. ACCORDION FUNCTIONALITY
// ===========================================
function initAccordion() {
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const targetId = header.getAttribute('data-accordion');
      const content = document.getElementById(targetId);
      const isActive = header.classList.contains('active');

      // Close all accordions first
      accordionHeaders.forEach(h => {
        h.classList.remove('active');
        const c = document.getElementById(h.getAttribute('data-accordion'));
        c?.classList.remove('show');
      });

      // Open clicked accordion if it wasn't active
      if (!isActive && content) {
        header.classList.add('active');
        content.classList.add('show');
      }
    });
  });
}

initAccordion();

// ===========================================
// 7. CONTACT FORM HANDLING
// ===========================================
async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  
  // Show loading state
  submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Success
      submitBtn.innerHTML = '<i class="bx bx-check"></i> Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, #3EF4A2, #10B981)';
      form.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    } else {
      throw new Error('Failed to send');
    }
  } catch (error) {
    // Error
    submitBtn.innerHTML = '<i class="bx bx-x"></i> Failed!';
    submitBtn.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  }
}

contactForm?.addEventListener('submit', handleFormSubmit);

// ===========================================
// 8. SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = targetId === '#' ? document.body : document.querySelector(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('motion-paused') ? 'auto' : 'smooth'
      });
    }
  });
});

// ===========================================
// 9. INTERSECTION OBSERVER (Animations)
// ===========================================
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const animateElements = document.querySelectorAll(
    '.fade-up, .project__card, .book__content'
  );
  
  animateElements.forEach(el => {
    el.classList.add('reveal-ready');
    observer.observe(el);
  });
}

// Add animation class styles
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// Initialize animations after DOM loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ===========================================
// 10. LANGUAGE PROGRESS BAR ANIMATION
// ===========================================
function animateLanguageBars() {
  const languageSection = document.querySelector('.language__list');
  if (!languageSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.language__progress');
        bars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(languageSection);
}

document.addEventListener('DOMContentLoaded', animateLanguageBars);

// ===========================================
// 11. PRELOADER (Optional)
// ===========================================
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===========================================
// 12. KEYBOARD NAVIGATION
// ===========================================
document.addEventListener('keydown', (e) => {
  // Close menu with Escape
  if (e.key === 'Escape' && navMenu?.classList.contains('show-menu')) {
    closeMenu();
  }
});

// ===========================================
// 13. THROTTLE UTILITY
// ===========================================
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Apply throttle to scroll events for performance
window.addEventListener('scroll', throttle(() => {
  handleHeaderScroll();
  handleScrollUp();
  setActiveLink();
}, 100));

/* ================= ROBUST CAROUSEL SCRIPT ================= */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.c-slide');
    const dots = document.querySelectorAll('.c-dot');
    let activeIndex = 0;
    let autoPlayTimer;

    // Fungsi Ganti Slide
    function setActiveSlide(index) {
        // Hapus class active lama
        slides.forEach(el => el.classList.remove('active'));
        dots.forEach(el => el.classList.remove('active'));

        // Tambah class active baru
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        activeIndex = index;
    }

    // Fungsi Next Slide Otomatis
    function nextSlide() {
        let nextIndex = activeIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        setActiveSlide(nextIndex);
    }

    // Event Listener untuk Dots (Klik Manual)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            setActiveSlide(index);
            resetTimer(); // Reset waktu agar tidak langsung ganti setelah klik
        });
    });

    // Setup Auto Play (3.5 Detik)
    function startTimer() {
        if (!slides.length || document.documentElement.classList.contains('motion-paused')) return;
        autoPlayTimer = setInterval(nextSlide, 3500); 
    }

    function resetTimer() {
        clearInterval(autoPlayTimer);
        startTimer();
    }

    // Jalankan pertama kali
    if(slides.length > 0) {
        startTimer();
    }
    document.addEventListener('motionchange', () => {
      clearInterval(autoPlayTimer);
      if (!document.documentElement.classList.contains('motion-paused')) startTimer();
    });
});
/* ================= SMOOTH PARALLAX (SUBTLE VERSION) ================= */
document.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.cinematic-card');
    const blob = document.querySelector('.aurora-blob');
    
    if(!card) return;

    // Angka pembagi lebih besar (50) agar gerakan lebih sedikit/halus
    const x = (window.innerWidth / 2 - e.pageX) / 50; 
    const y = (window.innerHeight / 2 - e.pageY) / 50;

    // Kartu bergerak sedikit berlawanan arah mouse
    card.style.transform = `translate(${x}px, ${y}px)`;
    
    // Cahaya belakang bergerak lebih banyak (efek kedalaman)
    if(blob) {
        blob.style.transform = `translate(${-x*2}px, ${-y*2}px) scale(1.1)`;
    }
});

/* ================= VISITOR COUNTER LOGIC ================= */
// Fungsi untuk animasi angka (Count Up Animation)
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Fungsi Fetch API Counter
// Ganti 'samuel-portfolio-v1' dengan nama unik lain jika mau mereset counter
const namespace = 'samuel-portfolio-main-v1'; 
const key = 'visits';

if (document.getElementById('visitor-count')) fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(res => res.json())
    .then(res => {
        const countElement = document.getElementById('visitor-count');
        // Jalankan animasi dari 0 sampai angka total pengunjung
        // Durasi 2000ms (2 detik)
        animateValue(countElement, 0, res.value, 2000);
    })
    .catch(err => {
        console.log("Counter Error:", err);
        // Fallback jika API down, tampilkan angka dummy atau text
        document.getElementById('visitor-count').innerText = "Active";
    });

/* ===========================================
   THEME SWITCHER (DARK / LIGHT MODE)
   =========================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme');
  const currentTheme = savedTheme || 'dark';
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
  }
}

themeToggle?.addEventListener('click', () => {
  const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

/* ===========================================
   MULTI-LANGUAGE (i18n) SWITCHER (ID / EN)
   =========================================== */
const translations = {
  en: {
    "creative.scroll": "SCROLL TO EXPLORE",
    "home.headline": "Network &<br>Software <em>Engineer.</em>",
    "home.discipline": "ENGINEERING & DESIGN",
    "home.behind": "THE PERSON BEHIND THE SYSTEMS",
    "home.toolbox": "THE TOOLS BEHIND THE WORK",
    "motion.pause": "Pause motion",
    "motion.resume": "Resume motion",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "home.status": "Available for Projects",
    "home.role_pill": "Network & Software Engineer",
    "home.greeting": "Hi, I'm <strong class=\"highlight-name\">Kevin Samuel</strong> 👋",
    "home.quote": "“Inspired by problems. Driven by purpose”",
    "home.desc": "I’m <strong>Samuel</strong>, working across networks, hardware, software, and design. I combine technical precision with creativity to deliver reliable digital solutions.",
    "home.stat_exp": "Experience",
    "home.stat_cert": "Certified",
    "home.stat_uptime": "Lab Uptime",
    "home.btn_projects": "Explore Projects",
    "home.btn_contact": "Contact Me",
    "home.uptime": "Home Server",
    "side_project.title": "Side Project",
    "side_project.subtitle": "For Featured Work",
    "side_project.card_title": "Home Server",
    "side_project.card_desc": "The website you are accessing now is handled by a simple Home Server that I designed. A simple Home server is made using an old laptop by installing Ubuntu Server. This laptop can be used to store files, run web applications, or as a media server for streaming.",
    "about.title_gradient": "About",
    "about.title_rest": "Me",
    "about.subtitle": "Professional & Personal Life",
    "about.tag_tech": "💻 Tech Enthusiast",
    "about.tag_runner": "🏃‍♂️ Active Lifestyle",
    "about.tag_beyond": "Beyond Code",
    "about.story_title": "Story & Philosophy",
    "about.story_desc": "I’m Kevin Samuel. I believe balance is essential.<br>On one hand, I’m deeply passionate about <span class=\"highlight\">Servers & Code</span>.<br>On the other hand, I maintain my routine and well-being through my hobby in sports.<br><br>“Stay hungry, stay foolish.” — Steve Jobs",
    "about.exp": "Years Exp",
    "about.certified": "Certified",
    "about.spotify": "On Repeat",
    "book.section_title": "Currently Reading",
    "book.section_subtitle": "Insight & Inspiration",
    "book.tag": "Recommended Read",
    "book.desc": "The <span class=\"highlight\">Mavericks</span> who brought AI to Google, Facebook, and the World.<br><br>This book captures the rise of modern AI through vivid, human-centered storytelling. It reveals the rivalry among tech giants like Google and OpenAI as they raced to secure talent. What stood out to me is how Metz weaves in the ethical implications—bias and privacy—without sounding preachy. It’s a reminder that AI progress isn’t just about algorithms, but the ambition and dilemmas of the people behind them.",
    "skills.title_prefix": "Technical",
    "skills.title_highlight": "Expertise",
    "skills.subtitle": "My Capabilities & Tools",
    "skills.soft_title": "Software<br>Development",
    "skills.soft_desc": "Fullstack Web Apps, Database Architecture, API Integration.",
    "skills.net_title": "Network<br>Engineer",
    "skills.net_desc": "Routing, Switching, Mikrotik, VPN, Enterprise Security.",
    "skills.hard_title": "Hardware & Server",
    "skills.hard_desc": "Proxmox, Ubuntu Server, Maintenance, IoT Setup.",
    "skills.des_title": "UI/UX Design",
    "skills.des_desc": "Wireframing, High-Fidelity Prototyping & Modern Glass UI.",
    "work.title_prefix": "Featured",
    "work.title_highlight": "Projects",
    "work.subtitle": "Recent Works",
    "work.card1_badge": "Web Application",
    "work.card1_title": "Centralized Healthcare Data System",
    "work.card1_desc": "Secure, scalable centralized platform to manage medical records, patient queues, and clinical analytics in real-time.",
    "work.card2_badge": "DevOps & Network",
    "work.card2_title": "Monitoring & Alerting Infrastructure",
    "work.card2_desc": "Real-time metrics and network telemetry visualization using Prometheus and Grafana with proactive alerting thresholds.",
    "work.card3_badge": "Server & Cloud",
    "work.card3_title": "Custom Home Server & Self-Hosted Lab",
    "work.card3_desc": "Energy-efficient private cloud environment for automated backup workflows, local web services, and internal media streaming.",
    "work.btn_details": "View Case Study",
    "work.source_soon": "Source code coming soon",
    "contact.title": "Contact Me",
    "contact.subtitle": "Get in Touch",
    "contact.email_placeholder": "Your Email",
    "contact.msg_placeholder": "Your Message",
    "contact.btn_send": "Send Message",
    "footer.copy": "© 2025 Samuel. All rights reserved. V.1.0"
  },
  id: {
    "creative.scroll": "GULIR UNTUK JELAJAHI",
    "home.headline": "Jaringan &<br>Software <em>Engineer.</em>",
    "home.discipline": "TEKNOLOGI & DESAIN",
    "home.behind": "SOSOK DI BALIK SISTEM",
    "home.toolbox": "TEKNOLOGI DI BALIK KARYA",
    "motion.pause": "Jeda animasi",
    "motion.resume": "Putar animasi",
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.skills": "Keahlian",
    "nav.projects": "Proyek",
    "nav.contact": "Kontak",
    "home.status": "Tersedia untuk Proyek",
    "home.role_pill": "Teknisi Jaringan & Software",
    "home.greeting": "Halo, saya <strong class=\"highlight-name\">Kevin Samuel</strong> 👋",
    "home.quote": "“Terinspirasi oleh tantangan. Digerakkan oleh tujuan”",
    "home.desc": "Saya <strong>Samuel</strong>, berfokus di bidang jaringan, perangkat keras, pengembangan perangkat lunak, dan desain. Saya memadukan presisi teknis dengan kreativitas untuk menghadirkan solusi digital yang andal.",
    "home.stat_exp": "Pengalaman",
    "home.stat_cert": "Tersertifikasi",
    "home.stat_uptime": "Uptime Lab",
    "home.btn_projects": "Jelajahi Proyek",
    "home.btn_contact": "Hubungi Saya",
    "home.uptime": "Home Server",
    "side_project.title": "Proyek Sampingan",
    "side_project.subtitle": "Karya Unggulan",
    "side_project.card_title": "Home Server",
    "side_project.card_desc": "Website yang sedang Anda akses saat ini dijalankan di atas Home Server sederhana yang saya rancang sendiri. Home server ini memanfaatkan laptop lama dengan sistem operasi Ubuntu Server. Laptop ini dapat digunakan untuk menyimpan data, menjalankan aplikasi web, atau sebagai media streaming.",
    "about.title_gradient": "Tentang",
    "about.title_rest": "Saya",
    "about.subtitle": "Karier & Kehidupan Pribadi",
    "about.tag_tech": "💻 Penggiat Teknologi",
    "about.tag_runner": "🏃‍♂️ Gaya Hidup Aktif",
    "about.tag_beyond": "Di Luar Kode",
    "about.story_title": "Cerita & Filosofi",
    "about.story_desc": "Saya Kevin Samuel. Saya meyakini pentingnya keseimbangan hidup.<br>Di satu sisi, saya sangat antusias dengan <span class=\"highlight\">Server & Kode</span>.<br>Di sisi lain, saya menjaga rutinitas dan kebugaran tubuh melalui hobi olahraga.<br><br>“Stay hungry, stay foolish.” — Steve Jobs",
    "about.exp": "Tahun Pengalaman",
    "about.certified": "Tersertifikasi",
    "about.spotify": "Diputar Berulang",
    "book.section_title": "Sedang Dibaca",
    "book.section_subtitle": "Wawasan & Inspirasi",
    "book.tag": "Buku Rekomendasi",
    "book.desc": "Para <span class=\"highlight\">Pemberontak</span> yang membawa revolusi AI ke Google, Facebook, dan Dunia.<br><br>Buku ini menggambarkan kebangkitan era kecerdasan buatan melalui sudut pandang manusia dan fakta sejarah yang nyata. Menyoroti persaingan sengit antara raksasa teknologi seperti Google dan OpenAI dalam merebut talenta terbaik dunia, serta dilema etika dan privasi di baliknya.",
    "skills.title_prefix": "Keahlian",
    "skills.title_highlight": "Teknis",
    "skills.subtitle": "Kemampuan & Perangkat Kerja",
    "skills.soft_title": "Pengembangan<br>Perangkat Lunak",
    "skills.soft_desc": "Aplikasi Web Fullstack, Arsitektur Database, Integrasi API.",
    "skills.net_title": "Teknisi<br>Jaringan",
    "skills.net_desc": "Routing, Switching, Mikrotik, VPN, Keamanan Jaringan Enterprise.",
    "skills.hard_title": "Hardware & Server",
    "skills.hard_desc": "Proxmox, Ubuntu Server, Pemeliharaan Perangkat, Setup IoT.",
    "skills.des_title": "Desain UI/UX",
    "skills.des_desc": "Wireframing, Prototyping High-Fidelity & Desain Modern Glass UI.",
    "work.title_prefix": "Karya",
    "work.title_highlight": "Unggulan",
    "work.subtitle": "Proyek Terbaru",
    "work.card1_badge": "Aplikasi Web",
    "work.card1_title": "Sistem Informasi Manajemen Data Terpusat",
    "work.card1_desc": "Sistem terpusat untuk memproses, menyimpan, dan menyajikan data rekam medis dan administrasi layanan kesehatan secara aman, terstruktur, dan real-time.",
    "work.card2_badge": "DevOps & Jaringan",
    "work.card2_title": "Infrastruktur Monitoring & Alerting",
    "work.card2_desc": "Implementasi stack visualisasi metrik server dan jaringan secara real-time dengan dashboard dinamis serta notifikasi otomatis saat terjadi anomali beban sistem.",
    "work.card3_badge": "Server & Cloud",
    "work.card3_title": "Custom Home Server & Lab Mandiri",
    "work.card3_desc": "Pembangunan infrastruktur private cloud mandiri hemat energi untuk backup otomatis, web hosting lokal, dan media streaming internal.",
    "work.btn_details": "Detail Proyek",
    "work.source_soon": "Kode sumber segera tersedia",
    "contact.title": "Hubungi Saya",
    "contact.subtitle": "Mari Terhubung",
    "contact.email_placeholder": "Email Anda",
    "contact.msg_placeholder": "Pesan Anda",
    "contact.btn_send": "Kirim Pesan",
    "footer.copy": "© 2025 Samuel. Hak cipta dilindungi undang-undang. V.1.0"
  }
};

function initLanguage() {
  const savedLang = localStorage.getItem('portfolio-lang') || 'en';
  applyLanguage(savedLang);
}

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;
  
  // Update data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Update attributes like placeholder
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const raw = el.getAttribute('data-i18n-attr');
    const [attr, key] = raw.split(':');
    if (attr && key && dict[key]) {
      el.setAttribute(attr, dict[key]);
    }
  });

  if (langLabel) {
    langLabel.textContent = lang === 'en' ? 'EN' : 'ID';
  }
  document.documentElement.lang = lang;
  localStorage.setItem('portfolio-lang', lang);
}

langToggle?.addEventListener('click', () => {
  const currentLang = localStorage.getItem('portfolio-lang') || 'en';
  const newLang = currentLang === 'en' ? 'id' : 'en';
  applyLanguage(newLang);
});

// Initialize on DOM load
initTheme();
initLanguage();

// One control governs decorative motion, the carousel, and the project video.
const motionToggle = document.getElementById('motion-toggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
function applyMotion(paused) {
  document.documentElement.classList.toggle('motion-paused', paused);
  if (motionToggle) {
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.dataset.i18n = paused ? 'motion.resume' : 'motion.pause';
    const lang = document.documentElement.lang === 'id' ? 'id' : 'en';
    motionToggle.textContent = translations[lang][motionToggle.dataset.i18n];
  }
  document.querySelectorAll('video').forEach(video => {
    if (paused) video.pause();
    else video.play().catch(() => {});
  });
  document.dispatchEvent(new Event('motionchange'));
}
motionToggle?.addEventListener('click', () => applyMotion(!document.documentElement.classList.contains('motion-paused')));
reducedMotion.addEventListener('change', event => applyMotion(event.matches));
document.addEventListener('DOMContentLoaded', () => applyMotion(reducedMotion.matches));

console.log('🚀 Portfolio loaded successfully with Glassmorphism, Dark/Light Theme & Multi-Language!');
