document.addEventListener('DOMContentLoaded', () => {

    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        price.style.fontWeight = 'bold';
        price.style.color = '#e63946'; //робимо ціну червоною
    });

    const mainContainer = document.querySelector('main');        //додаєм новий елемент у кінець <main>
    if (mainContainer) {
        const newParagraph = document.createElement('p');
        newParagraph.textContent = 'Дякуємо, що обираєте IronCore! Ми працюємо для вас 24/7 (віртуально).';
        newParagraph.style.textAlign = 'center';
        newParagraph.style.marginTop = '20px';
        newParagraph.style.color = '#666';
        mainContainer.append(newParagraph);
    }

    const footerContainer = document.querySelector('footer .container');       //автоматична дата у футері
    if (footerContainer) {
        const dateBlock = document.createElement('div');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateBlock.textContent = `Сьогодні: ${new Date().toLocaleDateString('uk-UA', options)}`;
        dateBlock.style.fontSize = '0.9em';
        dateBlock.style.marginTop = '10px';
        footerContainer.appendChild(dateBlock);
    }

    const accordionBtn = document.getElementById('accordionBtn');       //акордеон "Показати більше"
    const accordionContent = document.getElementById('accordionContent');

    if (accordionBtn && accordionContent) {
        accordionBtn.addEventListener('click', () => {
            if (accordionContent.style.display === 'none') {
                accordionContent.style.display = 'block';
                accordionBtn.textContent = 'Приховати';
            } else {
                accordionContent.style.display = 'none';
                accordionBtn.textContent = 'Показати більше';
            }
        });
    }


    const headerNav = document.querySelector('.nav-menu');   //dark mode + LocalStorage
    const themeBtn = document.createElement('button');
    themeBtn.textContent = '🌗';
    themeBtn.style.marginLeft = '15px';
    themeBtn.style.cursor = 'pointer';
    themeBtn.style.background = 'transparent';
    themeBtn.style.border = '1px solid currentColor';
    themeBtn.style.borderRadius = '5px';
    themeBtn.style.padding = '5px 10px';

    if (headerNav) {
        const li = document.createElement('li');
        li.appendChild(themeBtn);
        headerNav.appendChild(li);
    }

    const savedTheme = localStorage.getItem('siteTheme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('siteTheme', 'dark');
        } else {
            localStorage.setItem('siteTheme', 'light');
        }
    });

    const navLinks = document.querySelectorAll('.nav-menu a');//підсвітка меню
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.classList.add('active-hover');
        });
        
        link.addEventListener('mouseleave', () => {
            link.classList.remove('active-hover');
        });
    });


    let currentFontSize = 16;
    
    document.addEventListener('keydown', (event) => {        //міняєм розмір шрифту
        if (event.key === 'ArrowUp') {
            currentFontSize += 1;
            document.body.style.fontSize = `${currentFontSize}px`;
        } else if (event.key === 'ArrowDown') {
            if (currentFontSize > 10) {
                currentFontSize -= 1;
                document.body.style.fontSize = `${currentFontSize}px`;
            }
        }
    });

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            clearErrors();
            formMessage.textContent = '';

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const messageValue = messageInput.value.trim();

            let isValid = true;

            if (nameValue.length < 3) {//валідація імені
                showError(nameInput, "Ім'я повинно містити мінімум 3 символи");
                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //валідація емейлу
            if (!emailPattern.test(emailValue)) {
                showError(emailInput, "Введіть коректний email (наприклад, user@domain.com)");
                isValid = false;
            }

            if (messageValue.length < 10) {             // Валідація повідомлення
                showError(messageInput, "Повідомлення занадто коротке (мінімум 10 символів)");
                isValid = false;
            }


            if (isValid) {
                console.log('Дані форми:', {
                    name: nameValue,
                    email: emailValue,
                    message: messageValue
                });

                localStorage.setItem('lastUserName', nameValue);

                contactForm.reset();
                formMessage.textContent = "Форма успішно надіслана! Ми зв'яжемося з вами.";
                formMessage.style.color = "green";

                setTimeout(() => {
                    alert(`Дякуємо, ${nameValue}!`);
                }, 500);
            }
        });
    }

    function showError(inputElement, message) {
        inputElement.classList.add('error');
        const errorDiv = inputElement.nextElementSibling; 
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = message;
        }
    }

    function clearErrors() {
        const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
            const errorDiv = input.nextElementSibling;
            if (errorDiv) errorDiv.textContent = '';
        });
    }
});