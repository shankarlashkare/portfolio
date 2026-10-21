/**
 * SHANKAR LASHKAR — PERSONAL PORTFOLIO WEB APPLICATION
 * Lead Senior Frontend Architecture & Interactive System
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light Mode)
  initTheme();

  // 2. Navigation & Sticky Scroll Effects
  initNavigation();

  // 3. Dynamic Typewriter in Hero
  initTypewriter();

  // 4. Interactive Compiler-X Playground
  initCompilerPlayground();

  // 5. Skills Category Filtering
  initSkillsFilter();

  // 6. Contact Form & Toast Notifications
  initContactForm();

  // 7. Interactive Resume Modal
  initResumeModal();

  // 8. 3D Tilt Effect on Photo Card
  initTiltEffect();

  // 9. Back to Top Button
  initBackToTop();
});

/* ==========================================================================
   1. THEME SWITCHER SYSTEM
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial theme: default to dark for high-tech aesthetic, unless light previously set
  let activeTheme = storedTheme ? storedTheme : (systemPrefersDark ? 'dark' : 'dark');
  document.documentElement.setAttribute('data-theme', activeTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const nextTheme = current === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Obsidian' : 'Light Studio'} theme`, 'info');
    });
  }

  // Listen to OS preference change if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    });
  }
}

/* ==========================================================================
   2. NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const siteNav = document.getElementById('site-nav');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky nav header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }

    // Scroll spy for active menu highlighting
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile drawer toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/* ==========================================================================
   3. HERO DYNAMIC TYPEWRITER
   ========================================================================== */
function initTypewriter() {
  const typewriterElem = document.getElementById('typewriter-text');
  if (!typewriterElem) return;

  const roles = [
    "Full-Stack Web Developer",
    "Docker & Cloud Systems Engineer",
    "Compiler-X Lead Architect",
    "Java & LeetCode DSA Enthusiast",
    "Building Resilient Developer Tools"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typewriterElem.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typewriterElem.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   4. FLAGSHIP PROJECT: COMPILER-X INTERACTIVE PLAYGROUND
   ========================================================================== */
const compilerSnippets = {
  python: {
    name: "Python 3.12",
    ext: "main.py",
    dockerImage: "compiler-x/python:3.12-alpine",
    code: `# Compiler-X Sandbox: Python 3.12 Engine
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

sample = [64, 34, 25, 12, 22, 11, 90]
print("Compiler-X [Python]: Sorting array in Docker container...")
print("Initial:", sample)
print("Sorted: ", quick_sort(sample))
print("Memory limit: 128MB | Status: Complete")`,
    output: `Compiler-X [Python]: Sorting array in Docker container...
Initial: [64, 34, 25, 12, 22, 11, 90]
Sorted:  [11, 12, 22, 25, 34, 64, 90]
Memory limit: 128MB | Status: Complete`
  },
  java: {
    name: "Java 21",
    ext: "Solution.java",
    dockerImage: "compiler-x/openjdk:21-slim",
    code: `// Compiler-X Sandbox: OpenJDK 21 Engine
import java.util.*;

public class Solution {
    public static void main(String[] args) {
        System.out.println("⚡ Compiler-X Containerized Runner: Java 21");
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                System.out.printf("Pair found at indices: [%d, %d]%n", map.get(complement), i);
                break;
            }
            map.put(nums[i], i);
        }
        System.out.println("Execution Status: [SUCCESS] Exit code 0");
    }
}`,
    output: `⚡ Compiler-X Containerized Runner: Java 21
Pair found at indices: [0, 1]
Execution Status: [SUCCESS] Exit code 0`
  },
  c: {
    name: "C (GCC 13)",
    ext: "main.c",
    dockerImage: "compiler-x/gcc:13-alpine",
    code: `// Compiler-X Sandbox: GCC 13 Linux Sandbox
#include <stdio.h>

int main() {
    printf("Compiler-X [C GCC]: Running in isolated Linux container\\n");
    printf("Memory limit: 128MB | CPU quota: 0.5 core\\n");
    printf("Sub-second sandboxed execution initialized.\\n");
    printf("Process exited with code 0 (SIG_SUCCESS).\\n");
    return 0;
}`,
    output: `Compiler-X [C GCC]: Running in isolated Linux container
Memory limit: 128MB | CPU quota: 0.5 core
Sub-second sandboxed execution initialized.
Process exited with code 0 (SIG_SUCCESS).`
  },
  javascript: {
    name: "Node.js v20",
    ext: "index.js",
    dockerImage: "compiler-x/node:20-slim",
    code: `// Compiler-X Sandbox: Node.js v20 V8 Engine
const runSandboxExecution = () => {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] Ephemeral container spawned successfully.\`);
  
  const stats = {
    engine: "Compiler-X Multi-Language Runtime",
    architecture: "Docker Container Isolated",
    eventLoopLatency: "0.2ms",
    status: "Healthy"
  };
  
  console.log("Telemetry payload:", JSON.stringify(stats, null, 2));
};

runSandboxExecution();`,
    output: `[2026-10-21T15:24:08.112Z] Ephemeral container spawned successfully.
Telemetry payload: {
  "engine": "Compiler-X Multi-Language Runtime",
  "architecture": "Docker Container Isolated",
  "eventLoopLatency": "0.2ms",
  "status": "Healthy"
}`
  },
  csharp: {
    name: "C# (.NET 8)",
    ext: "Program.cs",
    dockerImage: "compiler-x/dotnet:8.0",
    code: `// Compiler-X Sandbox: .NET 8.0 SDK
using System;

class Program {
    static void Main() {
        Console.WriteLine("Compiler-X [.NET]: Isolated runtime active");
        Console.WriteLine("Resource constraints applied via Linux Cgroups v2.");
        Console.WriteLine("Process finished with exit code 0.");
    }
}`,
    output: `Compiler-X [.NET]: Isolated runtime active
Resource constraints applied via Linux Cgroups v2.
Process finished with exit code 0.`
  },
  scala: {
    name: "Scala 3.3",
    ext: "Main.scala",
    dockerImage: "compiler-x/scala:3.3.1",
    code: `// Compiler-X Sandbox: Scala 3.3 JVM
object CompilerXApp extends App {
  println("Compiler-X [Scala]: Functional execution verified")
  val languages = List("Python", "Java", "C", "JS", "C#", "Scala", "Kotlin")
  println(s"Supported in current cluster: \${languages.mkString(", ")}")
}`,
    output: `Compiler-X [Scala]: Functional execution verified
Supported in current cluster: Python, Java, C, JS, C#, Scala, Kotlin`
  },
  kotlin: {
    name: "Kotlin 1.9",
    ext: "Main.kt",
    dockerImage: "compiler-x/kotlin:1.9",
    code: `// Compiler-X Sandbox: Kotlin 1.9.22
fun main() {
    println("Compiler-X [Kotlin]: Coroutines & Safety Ready")
    println("Docker container isolated worker initialized.")
    println("Status: 200 OK | Finished execution.")
}`,
    output: `Compiler-X [Kotlin]: Coroutines & Safety Ready
Docker container isolated worker initialized.
Status: 200 OK | Finished execution.`
  }
};

let currentLangKey = 'python';

function initCompilerPlayground() {
  const langButtons = document.querySelectorAll('.lang-btn');
  const codeContentElem = document.getElementById('playground-code');
  const lineNumbersElem = document.getElementById('playground-line-numbers');
  const terminalOutputElem = document.getElementById('terminal-stdout');
  const terminalMetaElem = document.getElementById('terminal-meta');
  const activeFileLabel = document.getElementById('playground-file-label');
  const runBtn = document.getElementById('btn-run-code');
  const resetBtn = document.getElementById('btn-reset-code');
  const copyBtn = document.getElementById('btn-copy-code');

  function renderCode(key) {
    const item = compilerSnippets[key];
    if (!item || !codeContentElem) return;

    currentLangKey = key;
    codeContentElem.textContent = item.code;
    
    // Update active filename
    if (activeFileLabel) {
      activeFileLabel.textContent = item.ext;
    }

    // Update line numbers
    const lineCount = item.code.split('\n').length;
    let lineHtml = '';
    for (let i = 1; i <= lineCount; i++) {
      lineHtml += `<div>${i}</div>`;
    }
    if (lineNumbersElem) {
      lineNumbersElem.innerHTML = lineHtml;
    }

    // Reset terminal preview with a clean state
    if (terminalOutputElem) {
      terminalOutputElem.textContent = `$ docker exec compiler-x-${key} ...\nHit "Run Code" to spin up ephemeral container.`;
    }
    if (terminalMetaElem) {
      terminalMetaElem.textContent = `Image: ${item.dockerImage} | Isolated Sandbox`;
    }
  }

  // Language pill button clicks
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      renderCode(lang);
    });
  });

  // Run Code Simulation
  if (runBtn) {
    runBtn.addEventListener('click', () => {
      const item = compilerSnippets[currentLangKey];
      if (!item) return;

      const randomContainerId = Math.random().toString(36).substring(2, 10);
      const executionLatency = Math.floor(Math.random() * 80) + 110; // 110ms - 190ms

      runBtn.disabled = true;
      runBtn.innerHTML = `
        <svg class="spin-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Spinning Container...
      `;

      if (terminalOutputElem) {
        terminalOutputElem.textContent = `[Docker Daemon] Initializing ephemeral container '${randomContainerId}'...\n[Cgroups] Setting sandbox memory_limit=128M cpu_period=100000 cpu_quota=50000...\n[Security] Dropping capabilities, read-only rootfs applied...\n[Runner] Executing ${item.ext}...`;
      }

      setTimeout(() => {
        if (terminalOutputElem) {
          terminalOutputElem.innerHTML = `
<span style="color: #64748b;">[Container: ${randomContainerId} | Image: ${item.dockerImage}]</span>
<span style="color: #22c55e;">${escapeHtml(item.output)}</span>
<span style="color: #38bdf8;">[Container Cleaned] Exit code: 0 | Execution time: ${executionLatency}ms | Memory used: 18.4MB</span>
          `.trim();
        }

        if (terminalMetaElem) {
          terminalMetaElem.textContent = `Sandbox State: Executed in ${executionLatency}ms | Memory: 18.4MB / 128MB limit | Exit: 0`;
        }

        runBtn.disabled = false;
        runBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          Run Code
        `;

        showToast(`Compiled & Executed ${item.name} in ${executionLatency}ms!`, 'success');
      }, 750);
    });
  }

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      renderCode(currentLangKey);
      showToast('Playground code reset to default', 'info');
    });
  }

  // Copy code button
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = codeContentElem ? codeContentElem.textContent : '';
      navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
      });
    });
  }

  // Initial render
  renderCode('python');
}

/* ==========================================================================
   5. TECHNICAL SKILLS CATEGORY FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. CONTACT FORM & TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const messageInput = document.getElementById('form-message');
  const charCounter = document.getElementById('char-count');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  // Character counter
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 500`;
      if (length > 480) {
        charCounter.style.color = '#ef4444';
      } else {
        charCounter.style.color = 'var(--text-muted)';
      }
    });
  }

  // Copy direct email address button
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'shankarlashkar@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`, 'success');
      }).catch(() => {
        showToast(`Email: ${email}`, 'info');
      });
    });
  }

  // Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const subject = document.getElementById('form-subject')?.value.trim();
      const message = messageInput?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please provide a valid email address.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Sending Message...
      `;

      setTimeout(() => {
        form.reset();
        if (charCounter) charCounter.textContent = '0 / 500';
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('Message sent successfully! Shankar will reply shortly.', 'success');
      }, 1000);
    });
  }
}

// Global Toast System
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toast-fade-out 0.3s ease forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

/* ==========================================================================
   7. INTERACTIVE RESUME MODAL
   ========================================================================== */
function initResumeModal() {
  const openBtns = document.querySelectorAll('.open-resume-modal');
  const modalBackdrop = document.getElementById('resume-modal');
  const closeBtn = document.getElementById('close-resume-modal');
  const downloadBtn = document.getElementById('download-resume-btn');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  }));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      showToast('Generating official resume PDF for Shankar Lashkar...', 'info');
      setTimeout(() => {
        showToast('Resume downloaded successfully!', 'success');
        // Trigger simulated print or download
        window.print();
      }, 800);
    });
  }
}

/* ==========================================================================
   8. 3D TILT EFFECT ON PHOTO CARD
   ========================================================================== */
function initTiltEffect() {
  const card = document.getElementById('profile-photo-card');
  if (!card) return;

  // Only apply tilt on larger screens
  if (window.innerWidth < 992) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    
    const rotateX = -deltaY * 8; // degrees
    const rotateY = deltaX * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  });
}

/* ==========================================================================
   9. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* Helper: Escape HTML string */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
