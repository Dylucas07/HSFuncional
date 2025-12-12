document.addEventListener('DOMContentLoaded', function () {

    /**
     * Acordeão (FAQ)
     */
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const title = item.querySelector('.accordion-title');
        title.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    /**
     * Relógio de Contagem Regressiva
     */
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        // Defina a data final da sua promoção aqui (Mês Dia, Ano HH:MM:SS)
        const countDownDate = new Date("Mar 1, 2026 00:00:00").getTime();

        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "<div class='countdown-expired'>OFERTA ENCERRADA</div>";
                const enrollButton = document.querySelector('.btn-enroll');
                if (enrollButton) {
                    enrollButton.classList.add('disabled');
                }
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = String(days).padStart(2, '0');
            document.getElementById("hours").innerText = String(hours).padStart(2, '0');
            document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
            document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

        }, 1000);
    }

    /**
     * Animação de Scroll (Fade-in)
     */
    const fadeInElements = document.querySelectorAll('.fade-in');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target); // Animação acontece apenas uma vez
            }
        });
    }, {
        threshold: 0.1 // Animação começa quando 10% do elemento está visível
    });
    fadeInElements.forEach(el => {
        fadeInObserver.observe(el);
    });

    /**
     * Botão "Voltar ao Topo"
     */
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        };

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /**
     * Carrossel de Depoimentos
     */
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.review-card');
        const nextBtn = carousel.querySelector('.next-btn');
        const prevBtn = carousel.querySelector('.prev-btn');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        showSlide(currentSlide); // Mostra o primeiro slide
    }

    /**
     * Menu Mobile e Header com Scroll
     */
    const header = document.querySelector('.main-header');
    const nav = document.querySelector('.main-nav');
    const hamburger = document.querySelector('.hamburger-menu');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen);
            hamburger.querySelector('i').classList.toggle('fa-bars', !isOpen);
            hamburger.querySelector('i').classList.toggle('fa-xmark', isOpen);
        });
    }

    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});