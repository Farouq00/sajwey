/**
 * SAJWEY — main.js  v2
 * - Navbar scroll state
 * - Compact dropdown mobile menu (NOT full-screen)
 * - Scroll reveal via IntersectionObserver
 * - Smooth anchor scroll
 */

(function () {
  'use strict';

  /* ── NAVBAR ── */
  const navbar     = document.getElementById('navbar');
  const navToggle  = document.getElementById('navToggle');
  const navDropdown = document.getElementById('navDropdown');

  function updateNavbar() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // Toggle compact dropdown
  navToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = navDropdown.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navDropdown.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close when clicking anywhere outside
  document.addEventListener('click', function (e) {
    if (!navbar.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close when a dropdown link is tapped
  navDropdown.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeDropdown);
  });

  function closeDropdown() {
    navDropdown.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navDropdown.setAttribute('aria-hidden', 'true');
  }


  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }


  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight - 8;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();

window.onload = function() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};
