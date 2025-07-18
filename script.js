document.addEventListener('DOMContentLoaded', function() {
    // ============= التحقق من وجود العناصر أولاً =============
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // إذا لم تكن العناصر موجودة، نوقف التنفيذ
    if (!navbar || !menuToggle || !navLinks) return;

    // ============= شريط التنقل المتحرك =============
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            navbar.style.backgroundColor = 'rgba(43, 88, 118, 0.95)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.backgroundColor = 'transparent';
        }
    });

    // ============= القائمة الهاتفية =============
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });

    // ============= إغلاق القائمة عند النقر على رابط =============
    const navLinksList = document.querySelectorAll('.nav-links a');
    if (navLinksList.length > 0) {
        navLinksList.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // ============= التمرير السلس =============
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    if (smoothScrollLinks.length > 0) {
        smoothScrollLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - navbar.offsetHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============= تحميل فريق العمل ديناميكياً =============
    const loadTeam = () => {
        const teamContainer = document.getElementById('teamContainer');
        if (!teamContainer) return;

        const teamMembers = [
            { img: 'images/team-1.jpg', name: 'عضو الفريق 1', role: 'منسق المشاريع' },
            { img: 'images/team-2.jpg', name: 'عضو الفريق 2', role: 'المسؤول المالي' }
        ];

        teamMembers.forEach(member => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <img src="${member.img}" alt="${member.name}" loading="lazy">
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                </div>
            `;
            teamContainer.appendChild(card);
        });
    };

    loadTeam();

    // ============= تأثير عد الأرقام (المضاف حديثاً) =============
    const animateCounters = () => {
        const counters = document.querySelectorAll('[data-count]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-count');
                    const duration = 2000; // مدة العد 2 ثانية
                    const startValue = 0;
                    const startTime = performance.now();

                    const updateCounter = (currentTime) => {
                        const elapsedTime = currentTime - startTime;
                        const progress = Math.min(elapsedTime / duration, 1);
                        const currentValue = Math.floor(progress * target);
                        
                        counter.textContent = currentValue.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counter.textContent = '0'; // تهيئة القيمة
            observer.observe(counter);
        });
    };

    // تأخير تشغيل العد حتى يتم تحميل كل شيء
    setTimeout(animateCounters, 500);
});