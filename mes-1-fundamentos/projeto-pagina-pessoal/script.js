// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll suave para seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animação de digitação no título
    const titleElement = document.querySelector('.hero-content h1');
    const originalText = titleElement.innerHTML;
    
    function typeWriter() {
        titleElement.innerHTML = '';
        let i = 0;
        let isTag = false;
        let currentText = '';
        
        function type() {
            if (i < originalText.length) {
                const char = originalText.charAt(i);
                
                if (char === '<') isTag = true;
                if (char === '>') isTag = false;
                
                currentText += char;
                
                if (!isTag) {
                    titleElement.innerHTML = currentText;
                } else {
                    titleElement.innerHTML = currentText;
                }
                
                i++;
                setTimeout(type, isTag ? 0 : 100);
            }
        }
        
        type();
    }
    
    // Executar animação após um pequeno delay
    setTimeout(typeWriter, 1000);
    
    // Animação dos contadores na seção About
    function animateCounters() {
        const counters = document.querySelectorAll('.stat h3');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let count = 0;
            const increment = target / 50; // Velocidade da animação
            
            function updateCounter() {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count) + (target === 100 ? '%' : '+');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (target === 100 ? '%' : '+');
                }
            }
            
            updateCounter();
        });
    }
    
    // Observador para animações quando elementos entram na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar contadores quando a seção About aparecer
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observar seções para animação
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Mudar cor do header ao fazer scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Botão voltar ao topo (criar dinamicamente)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0,123,255,0.3);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Mostrar/ocultar botão voltar ao topo
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Funcionalidade do botão voltar ao topo
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efeito de hover nos cards de projeto
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Mensagem de console para desenvolvedores
    console.log('%c🚀 Olá, desenvolvedor!', 'color: #007bff; font-size: 20px; font-weight: bold;');
    console.log('%cEste site foi feito com muito ❤️ e ☕', 'color: #666; font-size: 14px;');
    console.log('%cSe você está vendo isso, provavelmente é um dev também! 😄', 'color: #28a745; font-size: 14px;');
    
});