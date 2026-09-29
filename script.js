// ========== 1. МАСКА ДЛЯ ТЕЛЕФОНА ==========
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, ''); // Убираем всё кроме цифр
    
    if (value.startsWith('8')) {
        value = '7' + value.substring(1);
    }
    if (!value.startsWith('7') && value.length > 0) {
        value = '7' + value;
    }
    
    let formatted = '';
    if (value.length > 0) formatted = '+7';
    if (value.length > 1) formatted += ' (' + value.substring(1, 4);
    if (value.length >= 5) formatted += ') ' + value.substring(4, 7);
    if (value.length >= 8) formatted += '-' + value.substring(7, 9);
    if (value.length >= 10) formatted += '-' + value.substring(9, 11);
    
    e.target.value = formatted;
});

phoneInput.addEventListener('focus', function(e) {
    if (!e.target.value) e.target.value = '+7 (';
});

phoneInput.addEventListener('blur', function(e) {
    if (e.target.value === '+7 (') e.target.value = '';
});


// ========== 2. ОТПРАВКА НА ПОЧТУ ==========
const form = document.getElementById('leadForm');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Останавливаем стандартную перезагрузку страницы
    
    // Проверка телефона (должно быть 11 цифр: 7 + 10 цифр номера)
    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
        alert('Пожалуйста, введите корректный номер телефона полностью');
        return;
    }

    // Блокируем кнопку, чтобы не нажали дважды
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    // Собираем данные формы
    const formData = new FormData(form);

    try {
        // Отправляем данные на FormSubmit (ваша почта уже встроена в URL)
        const response = await fetch("https://formsubmit.co/ajax/yydjdjd955@gmail.com", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert('✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
            form.reset(); // Очистить форму
        } else {
            throw new Error('Ошибка сервиса');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('❌ Произошла ошибка при отправке. Пожалуйста, попробуйте позже или напишите нам напрямую.');
    } finally {
        // Возвращаем кнопку в исходное состояние
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить заявку';
    }
});
