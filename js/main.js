/**
 * SHANKAR LASHKARE — DEVELOPER PORTFOLIO
 * Clean, modular vanilla JavaScript with zero external dependencies.
 */

/**
 * Editable Portfolio Configuration
 * Replace any empty/placeholder values below with your real links and resume file path.
 */
const PORTFOLIO_CONFIG = {
  email: 'shankarlashkare357@gmail.com',
  resumeUrl: '', // e.g. 'assets/Shankar-Lashkare-Resume.pdf' once your PDF is placed in assets/
  links: {
    github: 'https://github.com/shankarlashkare',
    leetcode: '',       // e.g. 'https://leetcode.com/u/your-username'
    linkedin: '',       // e.g. 'https://www.linkedin.com/in/your-profile'
    compilerXRepo: '',  // e.g. 'https://github.com/your-username/compiler-x'
    portfolioRepo: 'https://github.com/shankarlashkare/portfolio',
    javaDsaRepo: ''     // e.g. 'https://github.com/your-username/java-dsa'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initNavigation();
  initScrollReveal();
  initSkillsFilter();
  initConfigurableLinks();
  initResumeDownload();
  initContactSection();
  initModalControls();
  updateFooterYear();
  initHeroTypewriter();
});

/* ==========================================================================
   1. THEME SYSTEM (WHITE / DARK / SYSTEM)
   ========================================================================== */
const THEME_STORAGE_KEY = 'portfolio-theme-mode';

function resolveTheme(mode) {
  if (mode === 'system') {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
  return mode === 'dark' ? 'dark' : 'light';
}

function applyThemeMode(mode, persist = true) {
  const validMode = ['light', 'dark', 'system'].includes(mode) ? mode : 'light';
  const resolved = resolveTheme(validMode);

  document.documentElement.setAttribute('data-theme', resolved);
  document.documentElement.setAttribute('data-theme-mode', validMode);

  const metaThemeColor = document.getElementById('meta-theme-color');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', resolved === 'dark' ? '#09090b' : '#ffffff');
  }

  document.querySelectorAll('.theme-btn').forEach(btn => {
    const isSelected = btn.getAttribute('data-theme-option') === validMode;
    btn.setAttribute('aria-pressed', String(isSelected));
  });

  if (persist) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, validMode);
    } catch (e) {
      // Ignore storage failures in restricted contexts
    }
  }
}

function initThemeSwitcher() {
  let savedMode = 'light';
  try {
    savedMode = localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  } catch (e) {
    savedMode = 'light';
  }

  applyThemeMode(savedMode, false);

  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextMode = btn.getAttribute('data-theme-option');
      applyThemeMode(nextMode, true);
      const labelMap = { light: 'White', dark: 'Dark', system: 'System' };
      showToast(`Theme switched to ${labelMap[nextMode] || nextMode} mode.`);
    });
  });

  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      const currentMode = document.documentElement.getAttribute('data-theme-mode');
      if (currentMode === 'system') {
        applyThemeMode('system', false);
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleSystemChange);
    }
  }
}

/* ==========================================================================
   2. NAVIGATION, MOBILE HAMBURGER MENU & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const trackedSections = document.querySelectorAll('main section[id]');

  function setDrawerOpen(isOpen) {
    if (!menuToggle || !mobileDrawer) return;
    mobileDrawer.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const nextState = !mobileDrawer.classList.contains('open');
      setDrawerOpen(nextState);
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });

    document.addEventListener('click', (event) => {
      if (
        mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        setDrawerOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        setDrawerOpen(false);
        menuToggle.focus();
      }
    });
  }

  function updateOnScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 12);
    }

    const scrollPosition = window.scrollY + 140;
    let activeId = 'home';

    trackedSections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        activeId = section.getAttribute('id');
      }
    });

    // Map #journey and #profiles highlight cleanly to the nearest primary nav item
    if (activeId === 'journey') activeId = 'education';
    if (activeId === 'profiles') activeId = 'projects';

    allNavLinks.forEach(link => {
      const matches = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('active', matches);
    });
  }

  window.addEventListener('scroll', updateOnScroll, { passive: true });
  updateOnScroll();
}

/* ==========================================================================
   3. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. SKILLS CATEGORY FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('[data-skill-filter]');
  const skillCards = document.querySelectorAll('[data-skill-category]');
  if (!filterButtons.length || !skillCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-skill-filter');

      filterButtons.forEach(button => {
        const isActive = button === btn;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
      });

      skillCards.forEach(card => {
        const category = card.getAttribute('data-skill-category');
        const show = filter === 'all' || category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });
}

/* ==========================================================================
   5. CONFIGURABLE PLACEHOLDER LINKS
   ========================================================================== */
function initConfigurableLinks() {
  document.querySelectorAll('[data-handle-key]').forEach(el => {
    const key = el.getAttribute('data-handle-key');
    const configuredUrl = PORTFOLIO_CONFIG.links[key];
    if (configuredUrl) {
      el.textContent = configuredUrl.replace(/^https?:\/\/(www\.)?/, '');
    }
  });

  document.querySelectorAll('.placeholder-link').forEach(link => {
    const key = link.getAttribute('data-link-key');
    const label = link.getAttribute('data-placeholder-label') || 'Link';
    const configuredUrl = PORTFOLIO_CONFIG.links[key];

    if (configuredUrl) {
      link.setAttribute('href', configuredUrl);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      return;
    }

    link.addEventListener('click', (event) => {
      event.preventDefault();
      openInfoModal({
        title: `${label} — Editable Placeholder`,
        bodyHtml: `
          <p>This link is intentionally set as a safe editable placeholder so no fake URLs are used.</p>
          <p>To activate your live <strong>${escapeHtml(label)}</strong> link, add your URL inside <code>PORTFOLIO_CONFIG.links.${escapeHtml(key)}</code> in <code>js/main.js</code>.</p>
          <div class="modal-code-hint">PORTFOLIO_CONFIG.links.${escapeHtml(key)} = 'https://...'</div>
        `
      });
    });
  });
}

/* ==========================================================================
   6. DOWNLOADABLE RESUME HANDLER
   ========================================================================== */
function initResumeDownload() {
  const resumeBtn = document.getElementById('download-resume-btn');
  if (!resumeBtn) return;

  resumeBtn.addEventListener('click', () => {
    const resumeUrl = PORTFOLIO_CONFIG.resumeUrl.trim();

    if (resumeUrl) {
      const tempLink = document.createElement('a');
      tempLink.href = resumeUrl;
      tempLink.setAttribute('download', 'Shankar-Lashkare-Resume.pdf');
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
      showToast('Downloading resume...');
      return;
    }

    openInfoModal({
      title: 'Shankar Lashkare — Resume',
      bodyHtml: `
        <div class="resume-modal-content">
          <div class="resume-header">
            <h2>SHANKAR LASHKARE</h2>
            <p class="resume-sub">Aspiring Full-Stack Developer</p>
            <div class="resume-contacts">
              <span>📞 8432028668</span>
              <span>✉️ <a href="mailto:shankarlashkare357@gmail.com">shankarlashkare357@gmail.com</a></span>
              <span>🔗 <a href="https://github.com/shankarlashkare" target="_blank" rel="noopener">github.com/shankarlashkare</a></span>
              <span>📍 Maharashtra, India</span>
            </div>
          </div>

          <div class="resume-section">
            <h3>PROFESSIONAL SUMMARY</h3>
            <p>Motivated Computer Engineering Diploma student with a strong interest in Full-Stack Web Development and Software Engineering. Familiar with Java, OOP, HTML, CSS, and JavaScript. Eager to build practical applications and contribute as a Full-Stack Developer.</p>
          </div>

          <div class="resume-section">
            <h3>EDUCATION</h3>
            <p><strong>Diploma in Computer Engineering</strong><br>Balaghat Polytechnic College | MSBTE | Third Year (Currently Pursuing)</p>
            <table class="resume-table">
              <tr><th>Semester</th><th>Percentage</th></tr>
              <tr><td>Semester 1</td><td>77.60%</td></tr>
              <tr><td>Semester 2</td><td>77.80%</td></tr>
              <tr><td>Semester 3</td><td>70.30%</td></tr>
              <tr><td>Semester 4</td><td>73.27%</td></tr>
            </table>
          </div>

          <div class="resume-section">
            <h3>TECHNICAL SKILLS</h3>
            <ul>
              <li><strong>Programming:</strong> Java, JavaScript</li>
              <li><strong>Web Development:</strong> HTML5, CSS3</li>
              <li><strong>Core Concepts:</strong> Object-Oriented Programming (OOP)</li>
              <li><strong>Tools:</strong> Git, GitHub</li>
              <li><strong>Currently Learning:</strong> Data Structures & Algorithms (Java), Full-Stack Development</li>
            </ul>
          </div>

          <div class="resume-section">
            <h3>INTERNSHIP EXPERIENCE</h3>
            <p><strong>Web Development Intern – Skillsway</strong></p>
            <ul>
              <li>Gained exposure to web development concepts</li>
              <li>Practiced building and designing web pages</li>
              <li>Worked with HTML, CSS, and JavaScript</li>
              <li>Improved understanding of website structure and development</li>
            </ul>
          </div>

          <div class="resume-section">
            <h3>PROJECTS</h3>
            <p><strong>1. Personal Portfolio Website</strong></p>
            <ul>
              <li>Developed a personal portfolio to showcase technical skills and projects</li>
              <li>Used HTML and CSS for website structure and styling</li>
              <li>🔗 <a href="https://github.com/shankarlashkare/portfolio" target="_blank" rel="noopener">github.com/shankarlashkare/portfolio</a></li>
            </ul>
            <p><strong>2. Compiler X – Intelligent Login</strong></p>
            <ul>
              <li>Worked on an application interface with an intelligent login concept</li>
              <li>Used HTML, CSS, and Firebase authentication-related technologies</li>
              <li>Focused on login interface design and functionality</li>
            </ul>
          </div>

          <div class="resume-section">
            <h3>AREAS OF INTEREST</h3>
            <ul>
              <li>Full-Stack Web Development</li>
              <li>Java Programming</li>
              <li>Data Structures and Algorithms</li>
              <li>Software Engineering & Problem Solving</li>
            </ul>
          </div>

          <div class="resume-section">
            <h3>CAREER OBJECTIVE</h3>
            <p>To begin my professional journey as a Full-Stack Developer, strengthen my software development skills, and contribute to real-world projects while continuously learning new technologies.</p>
          </div>

          <p class="resume-pdf-note">💡 To enable PDF download, place your resume PDF in <code>assets/</code> and set <code>PORTFOLIO_CONFIG.resumeUrl</code> in <code>js/main.js</code>.</p>
        </div>
      `
    });
  });
}

/* ==========================================================================
   7. CONTACT SECTION (WORKING MAILTO & CLIPBOARD COPY)
   ========================================================================== */
function initContactSection() {
  const email = PORTFOLIO_CONFIG.email;
  const emailLink = document.getElementById('contact-email-link');
  const directContactBtn = document.getElementById('direct-contact-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactForm = document.getElementById('contact-form');

  if (emailLink) {
    emailLink.textContent = email;
    emailLink.setAttribute('href', `mailto:${email}`);
  }

  if (directContactBtn) {
    directContactBtn.setAttribute('href', `mailto:${email}?subject=${encodeURIComponent('Hello Shankar')}`);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(
          () => showToast(`Copied ${email} to clipboard.`),
          () => showToast(`Email: ${email}`)
        );
      } else {
        showToast(`Email: ${email}`);
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const subjectInput = document.getElementById('sender-subject');
      const messageInput = document.getElementById('sender-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !subject || !message) {
        showToast('Please fill in your name, subject, and message.');
        return;
      }

      const fullBody = `Hi Shankar,\n\n${message}\n\nBest regards,\n${name}`;
      const mailtoHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
      window.location.href = mailtoHref;
      showToast('Opening your email client...');
    });
  }
}

/* ==========================================================================
   8. MODAL & TOAST HELPERS
   ========================================================================== */
let lastFocusedElement = null;

function openInfoModal({ title, bodyHtml }) {
  const backdrop = document.getElementById('info-modal');
  const titleEl = document.getElementById('info-modal-title');
  const bodyEl = document.getElementById('info-modal-body');
  const closeBtn = document.getElementById('info-modal-close');

  if (!backdrop || !titleEl || !bodyEl) return;

  lastFocusedElement = document.activeElement;
  titleEl.textContent = title;
  bodyEl.innerHTML = bodyHtml;
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  if (closeBtn) closeBtn.focus();
}

function closeInfoModal() {
  const backdrop = document.getElementById('info-modal');
  if (!backdrop || !backdrop.classList.contains('open')) return;

  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

function initModalControls() {
  const backdrop = document.getElementById('info-modal');
  const closeBtn = document.getElementById('info-modal-close');
  const okBtn = document.getElementById('info-modal-ok');

  if (!backdrop) return;

  if (closeBtn) closeBtn.addEventListener('click', closeInfoModal);
  if (okBtn) okBtn.addEventListener('click', closeInfoModal);

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) closeInfoModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && backdrop.classList.contains('open')) {
      closeInfoModal();
    }
  });
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function updateFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ==========================================================================
   10. HERO TYPEWRITER ANIMATION (slow, looping, single-line)
   ========================================================================== */
function initHeroTypewriter() {
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;

  const fullText = nameEl.textContent.trim();
  nameEl.textContent = '';

  // Add blinking cursor (stays forever during loop)
  const cursor = document.createElement('span');
  cursor.className = 'hero-name-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  nameEl.appendChild(cursor);

  const TYPE_SPEED  = 120;  // ms per char while typing  (slower)
  const ERASE_SPEED =  60;  // ms per char while erasing (faster)
  const PAUSE_AFTER = 2000; // ms pause when fully typed
  const PAUSE_EMPTY =  500; // ms pause before restarting

  let charNodes = []; // track text nodes so we can erase cleanly

  function typeChar() {
    const idx = charNodes.length;
    if (idx < fullText.length) {
      const node = document.createTextNode(fullText[idx]);
      nameEl.insertBefore(node, cursor);
      charNodes.push(node);
      setTimeout(typeChar, TYPE_SPEED);
    } else {
      // Fully typed — pause then erase
      setTimeout(eraseChar, PAUSE_AFTER);
    }
  }

  function eraseChar() {
    if (charNodes.length > 0) {
      const last = charNodes.pop();
      last.remove();
      setTimeout(eraseChar, ERASE_SPEED);
    } else {
      // Fully erased — pause then retype
      setTimeout(typeChar, PAUSE_EMPTY);
    }
  }

  // Start after short delay so greeting fades in first
  setTimeout(typeChar, 700);
}
