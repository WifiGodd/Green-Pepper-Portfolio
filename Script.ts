<script>
        // Particles System
        class ParticleSystem {
            constructor() {
                this.canvas = document.getElementById('particles');
                if (!this.canvas) return;
                this.ctx = this.canvas.getContext('2d');
                this.particles = [];
                this.particleCount = 50;

                this.resizeCanvas();
                this.createParticles();
                this.animate();

                window.addEventListener('resize', () => {
                    this.resizeCanvas();
                    this.resetParticles();
                });
            }

            resizeCanvas() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }

            createParticles() {
                this.particles = [];
                for (let i = 0; i < this.particleCount; i++) {
                    this.particles.push({
                        x: Math.random() * this.canvas.width,
                        y: Math.random() * this.canvas.height,
                        vx: (Math.random() - 0.5) * 0.5,
                        vy: (Math.random() - 0.5) * 0.5,
                        size: Math.random() * 3 + 1,
                        opacity: Math.random() * 0.5 + 0.2
                    });
                }
            }

            resetParticles() {
                this.createParticles();
            }

            updateParticles() {
                this.particles.forEach(particle => {
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

                    particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
                    particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
                });
            }

            drawParticles() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

                this.particles.forEach(particle => {
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fillStyle = `rgba(0, 255, 0, ${particle.opacity})`;
                    this.ctx.shadowColor = '#00FF00';
                    this.ctx.shadowBlur = 10;
                    this.ctx.fill();
                    this.ctx.restore();
                });
            }

            animate() {
                this.updateParticles();
                this.drawParticles();
                requestAnimationFrame(() => this.animate());
            }
        }

        // Navigation System
        class Navigation {
            constructor() {
                this.pages = document.querySelectorAll('.page');
                this.navItems = document.querySelectorAll('.nav-item');
                this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
                this.navMenu = document.getElementById('nav-menu');

                this.bindEvents();
            }

            bindEvents() {
                this.navItems.forEach(item => {
                    item.addEventListener('click', (e) => {
                        const pageName = e.target.getAttribute('data-page');
                        this.showPage(pageName);
                        if (this.navMenu) this.navMenu.classList.remove('active');
                    });
                });

                if (this.mobileMenuBtn) {
                    this.mobileMenuBtn.addEventListener('click', () => {
                        this.toggleMobileMenu();
                    });
                }
            }

            showPage(pageName) {
                // Hide all pages
                this.pages.forEach(page => page.classList.remove('active'));

                // Show target page
                const targetPage = document.getElementById(pageName);
                if (targetPage) {
                    targetPage.classList.add('active');
                }

                // Update nav items
                this.navItems.forEach(item => item.classList.remove('active'));
                const activeNavItem = document.querySelector(`[data-page="${pageName}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }

            toggleMobileMenu() {
                if (this.navMenu) this.navMenu.classList.toggle('active');
            }
        }

        // Portfolio System
        class Portfolio {
            constructor() {
                this.projects = [
                    {
                        title: "E-Commerce Platform",
                        image: "🛒 E-Commerce Site",
                        description: "A fully responsive e-commerce platform with modern design, shopping cart functionality, and secure payment integration.",
                        review: "Amazing work! The website exceeded our expectations and our sales increased by 150% after launch. Highly recommended!"
                    },
                    {
                        title: "Restaurant Website",
                        image: "🍕 Restaurant Site",
                        description: "Modern restaurant website with online ordering system, menu showcase, and reservation booking functionality.",
                        review: "Professional and beautiful design. Our customers love the new website and online ordering has boosted our revenue significantly."
                    },
                    {
                        title: "Corporate Portfolio",
                        image: "💼 Corporate Site",
                        description: "Clean and professional corporate website with portfolio showcase, team profiles, and contact management system.",
                        review: "Green Pepper delivered exactly what we needed. The site is fast, looks great, and has helped us land new clients."
                    },
                    {
                        title: "Fitness App Landing",
                        image: "💪 Fitness Landing",
                        description: "High-converting landing page for a fitness app with animated elements, testimonials, and mobile-first design.",
                        review: "The landing page converted 35% better than our old one. Great attention to detail and user experience!"
                    },
                    {
                        title: "Creative Agency Site",
                        image: "🎨 Agency Portfolio",
                        description: "Creative agency website with stunning animations, portfolio galleries, and interactive design elements.",
                        review: "Absolutely stunning! The animations and overall design perfectly represent our creative brand. Outstanding work!"
                    },
                    {
                        title: "Tech Startup Platform",
                        image: "🚀 Startup Platform",
                        description: "Modern tech startup website with product showcases, investor information, and team presentation.",
                        review: "The website helped us secure our Series A funding. Professional, modern, and exactly what we needed for our pitch."
                    },
                    {
                        title: "Real Estate Portal",
                        image: "🏠 Real Estate Site",
                        description: "Comprehensive real estate website with property listings, search functionality, and agent profiles.",
                        review: "Property inquiries doubled after launching the new site. The search functionality is incredibly user-friendly."
                    },
                    {
                        title: "Educational Platform",
                        image: "📚 Learning Platform",
                        description: "Online learning platform with course management, progress tracking, and interactive learning modules.",
                        review: "The platform is intuitive and engaging. Our student completion rates improved by 60% after the redesign."
                    },
                    {
                        title: "Photography Portfolio",
                        image: "📷 Photo Portfolio",
                        description: "Elegant photography portfolio with gallery showcases, client testimonials, and booking system.",
                        review: "My photography business has grown tremendously thanks to this beautiful portfolio site. Perfect showcase for my work!"
                    },
                    {
                        title: "Music Artist Site",
                        image: "🎵 Music Site",
                        description: "Dynamic music artist website with audio players, tour dates, merchandise store, and fan engagement features.",
                        review: "The site perfectly captures my artistic vision. Fan engagement and merchandise sales have increased significantly!"
                    }
                ];

                this.modal = document.getElementById('project-modal');
                this.generatePortfolio();
            }

            generatePortfolio() {
                const portfolioGrid = document.getElementById('portfolio-grid');
                if (!portfolioGrid) return;

                this.projects.forEach((project, index) => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';
                    projectCard.onclick = () => this.openModal(index);

                    projectCard.innerHTML = `
                        <div class="project-image">${project.image}</div>
                        <div class="project-info">
                            <h3 class="project-title">${project.title}</h3>
                        </div>
                    `;

                    portfolioGrid.appendChild(projectCard);
                });
            }

            openModal(projectIndex) {
                if (!this.modal) return;
                const project = this.projects[projectIndex];

                document.getElementById('modal-image').textContent = project.image;
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-review').textContent = project.review;

                this.modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            closeModal() {
                if (!this.modal) return;
                this.modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        // Global Functions
        function showPage(pageName) {
            if (navigation) navigation.showPage(pageName);
        }

        function closeModal() {
            if (portfolio) portfolio.closeModal();
        }

        // Initialize Everything
        let particleSystem, navigation, portfolio;

        document.addEventListener('DOMContentLoaded', () => {
            particleSystem = new ParticleSystem();
            navigation = new Navigation();
            portfolio = new Portfolio();
        });

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('project-modal');
            if (modal && e.target === modal && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    </script>