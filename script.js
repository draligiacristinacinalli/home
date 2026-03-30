document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Sticky Header Effect
       ========================================================================== */
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on load
    handleScroll();

    /* ==========================================================================
       2. Parallax Effect for Hero Image
       ========================================================================== */
    const heroBg = document.querySelector('.hero-bg');
    
    const handleParallax = () => {
        const scrolled = window.scrollY;
        // Only apply parallax if we are in the hero section approx
        if (heroBg && scrolled < window.innerHeight) {
            // Move background at half the scroll speed + keep scale for blur padding
            heroBg.style.transform = `translateY(${scrolled * 0.4}px) scale(1.15)`;
        }
    };
    
    window.addEventListener('scroll', handleParallax, { passive: true });

    /* ==========================================================================
       3. Intersection Observer for Micro-Animations
       ========================================================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before it comes into view
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated if we only want it to animate once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    /* ==========================================================================
       4. Mobile Navigation Menu
       ========================================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    const toggleMobileMenu = () => {
        mobileNavOverlay.classList.toggle('active');
        if (mobileNavOverlay.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            document.body.style.overflow = '';
        }
    };

    if (mobileMenuBtn && closeMenuBtn && mobileNavOverlay) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        closeMenuBtn.addEventListener('click', toggleMobileMenu);
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    /* ==========================================================================
       5. Before/After Image Slider Logic
       ========================================================================== */
    const imageComparison = document.querySelector('.image-comparison');
    const sliderHandle = document.querySelector('.slider-handle');
    const imgBeforeWrapper = document.querySelector('.img-before-wrapper');

    if (imageComparison && sliderHandle && imgBeforeWrapper) {
        let isDragging = false;

        const handleDragStart = (e) => {
            isDragging = true;
            sliderHandle.style.backgroundColor = 'var(--primary-light)'; // feedback
            updateSliderPosition(e); // Move immediately on start
        };

        const handleDragEnd = () => {
            isDragging = false;
            sliderHandle.style.backgroundColor = 'white';
        };

        const updateSliderPosition = (e) => {
            if (!isDragging) return;

            // Prevent scrolling on mobile while dragging
            if (e.type === 'touchmove') {
                e.preventDefault();
            }

            // Determine X coordinate for mouse or touch
            let clientX = e.clientX || (e.touches && e.touches[0].clientX);
            if (!clientX && clientX !== 0) return;

            const rect = imageComparison.getBoundingClientRect();
            // Calculate percentage based on bounds
            let x = clientX - rect.left;
            let percent = (x / rect.width) * 100;

            // Clamp between 0 and 100
            percent = Math.max(0, Math.min(percent, 100));

            // Update CSS elements
            sliderHandle.style.left = `${percent}%`;
            imgBeforeWrapper.style.width = `${percent}%`;
        };

        // Mouse Events
        sliderHandle.addEventListener('mousedown', handleDragStart);
        imageComparison.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateSliderPosition(e);
        });
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('mousemove', updateSliderPosition);

        // Touch Events
        sliderHandle.addEventListener('touchstart', handleDragStart, { passive: false });
        imageComparison.addEventListener('touchstart', (e) => {
            isDragging = true;
            updateSliderPosition(e);
        }, { passive: false });
        window.addEventListener('touchend', handleDragEnd);
        window.addEventListener('touchmove', updateSliderPosition, { passive: false });
    }

    /* ==========================================================================
       6. FAQ Accordion Logic - Refined
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');
            const answer = question.nextElementSibling;
            const parentItem = question.parentElement;
            
            // Close all other accordions for a cleaner experience
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                    if (q.parentElement) q.parentElement.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });
            
            // Toggle current
            if (!isActive) {
                question.classList.add('active');
                if (parentItem) parentItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                question.classList.remove('active');
                if (parentItem) parentItem.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });
    /* ==========================================================================
       7. WhatsApp WhatsApp Form Integration 
       ========================================================================== */
    const WHATSAPP_NUMBER = "5562982319870";

    const appointmentForm = document.getElementById("appointment-form");
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const name = document.getElementById("name").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const serviceSelect = document.getElementById("service-type");
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
            const preferredDate = document.getElementById("preferred-date").value;
            
            if(!name || serviceSelect.value === "") return; // Required fields fallback

            const msg = `Olá, Dra. Lígia! Meu nome é *${name}*.\n\nGostaria de dar o primeiro passo e agendar uma avaliação primária.\n\n*Serviço de interesse:* ${serviceText}\n*Data de preferência:* ${preferredDate.split('-').reverse().join('/')}\n*Meu telefone:* ${phone}\n\nAguardo o retorno para confirmarmos!`;
            
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        });
    }

    const footerForm = document.getElementById("footer-chat-form");
    if (footerForm) {
        footerForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const name = document.getElementById("footer-name").value.trim();
            const doubt = document.getElementById("footer-doubt").value.trim();
            
            if(!name || !doubt) return;

            const msg = `Olá, Dra. Lígia. Sou *${name}* e tenho uma dúvida expressa capturada pelo site:\n\n"${doubt}"\n\nPodemos conversar?`;
            
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
        });
    }
});
