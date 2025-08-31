// Preloader
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1500);
        });

        // Initialize Swiper
        function initSwiper() {
            const swiper = new Swiper('.swiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },
            });
        }

        // Stats counter animation
        function initStatsCounter() {
            const statItems = document.querySelectorAll('.stat-item');
            
            const options = {
                threshold: 0.5,
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statNumber = entry.target.querySelector('.stat-number');
                        const target = parseInt(statNumber.getAttribute('data-count'));
                        let count = 0;
                        const duration = 2000;
                        const increment = target / (duration / 20);
                        
                        const updateCount = () => {
                            if (count < target) {
                                count += increment;
                                statNumber.textContent = Math.round(count);
                                setTimeout(updateCount, 20);
                            } else {
                                statNumber.textContent = target;
                            }
                        };
                        
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            }, options);
            
            statItems.forEach(item => {
                observer.observe(item);
            });
        }

        // Mobile menu toggle
        function initMobileMenu() {
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');

            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.innerHTML = navLinks.classList.contains('active') ?
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
                // Prevent body scroll when menu is open
                if (navLinks.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close menu when clicking on a link (mobile)
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                    document.body.style.overflow = '';
                });
            });
        }

        // Form submission with Formspree
        function initForm() {
            const form = document.getElementById('contactForm');
            const formSuccess = document.getElementById('formSuccess');
            
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const formData = new FormData(form);
                    
                    try {
                        const response = await fetch(form.action, {
                            method: 'POST',
                            body: formData,
                            headers: {
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (response.ok) {
                            form.style.display = 'none';
                            formSuccess.style.display = 'block';
                            form.reset();
                            
                            // Hide success message after 5 seconds
                            setTimeout(() => {
                                form.style.display = 'block';
                                formSuccess.style.display = 'none';
                            }, 5000);
                        } else {
                            throw new Error('Form submission failed');
                        }
                    } catch (error) {
                        alert('There was a problem sending your message. Please try again later.');
                    }
                });
            }
        }

        // Certificate modal functionality
        function initCertificateModal() {
            const modal = document.getElementById('certificateModal');
            const modalImg = document.getElementById('modalImage');
            const closeBtn = document.querySelector('.close');
            
            if (modal && modalImg && closeBtn) {
                const certificateImgs = document.querySelectorAll('.certificate-img');
                
                certificateImgs.forEach(img => {
                    img.addEventListener('click', () => {
                        modal.classList.add('show');
                        modalImg.src = img.src;
                        modalImg.alt = img.alt;
                    });
                });
                
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('show');
                });
                
                window.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('show');
                    }
                });
            }
        }

        // Scroll animations
        function initScrollAnimations() {
            const scrollElements = document.querySelectorAll('.skill, .timeline-item, .certificate-item, .contact-item, .social-link, .stat-item, .contact-form');
            const sections = document.querySelectorAll('section');
            
            const elementInView = (el, dividend = 1) => {
                const elementTop = el.getBoundingClientRect().top;
                return (
                    elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
                );
            };
            
            const displayScrollElement = (element) => {
                element.classList.add('visible');
            };
            
            const handleScrollAnimation = () => {
                scrollElements.forEach((el) => {
                    if (elementInView(el, 1.2)) {
                        displayScrollElement(el);
                    }
                });
                
                sections.forEach((section) => {
                    if (elementInView(section, 1.1)) {
                        section.classList.add('visible');
                    }
                });
                
                // Header scroll effect
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                // Scroll to top button
                const scrollToTopBtn = document.querySelector('.scroll-to-top');
                if (window.scrollY > 500) {
                    scrollToTopBtn.classList.add('active');
                } else {
                    scrollToTopBtn.classList.remove('active');
                }
            };
            
            window.addEventListener('scroll', () => {
                handleScrollAnimation();
            });
            
            // Trigger once on load
            handleScrollAnimation();
        }

        // Scroll to top functionality
        function initScrollToTop() {
            const scrollToTopBtn = document.querySelector('.scroll-to-top');
            
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Dark mode toggle
        function initDarkMode() {
            const themeToggle = document.querySelector('.theme-toggle');
            const icon = themeToggle.querySelector('i');
            
            // Check for saved theme preference
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-mode');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
            
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    localStorage.setItem('theme', 'light');
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            });
        }

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            initSwiper();
            initStatsCounter();
            initMobileMenu();
            initForm();
            initCertificateModal();
            initScrollAnimations();
            initScrollToTop();
            initDarkMode();

            // Make sure contact form is visible on mobile
            if (window.innerWidth <= 992) {
                const contactForm = document.querySelector('.contact-form');
                if (contactForm) {
                    contactForm.classList.add('visible');
                    contactForm.style.display = 'block';
                    contactForm.style.opacity = 1;
                    contactForm.style.transform = 'translateX(0)';
                }
            }
        });
