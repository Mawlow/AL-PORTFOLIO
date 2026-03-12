/**
 * Personal Portfolio - Businessman
 * Handles: sticky navbar, mobile menu, smooth scroll, scroll reveal, form, footer year
 */

(function () {
  'use strict';

  // ---------- DOM refs ----------
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.navbar__link');
  const contactForm = document.getElementById('contactForm');
  const yearEl = document.getElementById('year');

  // ---------- Sticky navbar (add shadow/opacity on scroll) ----------
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', function () {
    updateNavbar();
  }, { passive: true });
  updateNavbar();

  // ---------- Mobile hamburger menu ----------
  function openMenu() {
    navMenu.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);
  }

  // Close menu when clicking a nav link (smooth scroll still works via href)
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth < 600) closeMenu();
    });
  });

  // Close menu on escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) closeMenu();
  });

  // ---------- Smooth scroll (enhance for anchor links) ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---------- Scroll reveal animation (with optional stagger) ----------
  const revealEls = document.querySelectorAll('.reveal');
  const revealOffset = 80;
  const revealThreshold = 0.1;
  const staggerParents = document.querySelectorAll('.services__grid, .portfolio__grid, .testimonials__grid, .about__content');

  function applyStaggerDelays() {
    staggerParents.forEach(function (parent) {
      var children = parent.querySelectorAll('.reveal');
      children.forEach(function (el, i) {
        el.style.setProperty('--reveal-delay', String(i));
      });
    });
  }

  applyStaggerDelays();

  function reveal() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    revealEls.forEach(function (el) {
      const top = el.getBoundingClientRect().top + scrollY;
      const trigger = scrollY + windowHeight - revealOffset;
      if (trigger > top - windowHeight * revealThreshold) {
        el.classList.add('revealed');
      }
    });
  }

  // Run once and on scroll (throttled)
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        reveal();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', reveal);
  reveal(); // initial check

  // ---------- Contact form (prevent default, optional message) ----------
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // In production you would send to a server or email service
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sent!';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 2000);
    });
  }

  // ---------- Footer year ----------
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
