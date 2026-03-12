document.addEventListener('DOMContentLoaded', function() {
    initSmartHeader();
    initFooterYear();
    initMobileSideMenu(); // только новое меню
    console.log('SEO полигон — JavaScript загружен');
});

function initSmartHeader() {
    const header = document.querySelector('.smart-header');
    if (!header) return;
    
    let lastScrollTop = 0;
    const headerHeight = 70;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > headerHeight && Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                header.classList.add('smart-header--hidden');
            } else {
                header.classList.remove('smart-header--hidden');
            }
            lastScrollTop = scrollTop;
        }
        
        if (scrollTop < headerHeight) {
            header.classList.remove('smart-header--hidden');
        }
    });
}

function initFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initMobileSideMenu() {
    const burger = document.getElementById('mobileBurger');
    const overlay = document.querySelector('.mobile-overlay');
    const menu = document.querySelector('.mobile-menu');

    if (!burger || !overlay || !menu) {
        console.log('❌ Элементы мобильного меню не найдены');
        return;
    }

    console.log('✅ Мобильное меню инициализировано');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        overlay.classList.remove('active');
    });

    // Закрытие при клике на ссылку
    const links = menu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            menu.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
}

function initSmartHeader() {
    const header = document.querySelector('.smart-header');
    const burger = document.querySelector('.mobile-burger');
    if (!header) return;
    
    let lastScrollTop = 0;
    const headerHeight = 70;
    const scrollThreshold = 50;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > headerHeight && Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
            if (scrollTop > lastScrollTop) {
                // Скролл вниз — скрываем шапку и бургер
                header.classList.add('smart-header--hidden');
                if (burger) burger.style.opacity = '0';
            } else {
                // Скролл вверх — показываем шапку и бургер
                header.classList.remove('smart-header--hidden');
                if (burger) burger.style.opacity = '1';
            }
            lastScrollTop = scrollTop;
        }
        
        if (scrollTop < headerHeight) {
            header.classList.remove('smart-header--hidden');
            if (burger) burger.style.opacity = '1';
        }
    });
}

// Защита от копирования (правая кнопка мыши)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Защита от выделения и копирования (дополнительно)
document.addEventListener('copy', function(e) {
    e.preventDefault();
    alert('❌ Копирование материалов запрещено. Если вам нужны данные для ознакомления, свяжитесь со мной.');
    return false;
});

document.addEventListener('cut', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('paste', function(e) {
    e.preventDefault();
    return false;
});