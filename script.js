// ========== 1. МАСКА ДЛЯ ТЕЛЕФОНА ==========
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('8')) value = '7' + value.substring(1);
    if (!value.startsWith('7') && value.length > 0) value = '7' + value;
    
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
    e.preventDefault();
    
    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
        alert('Пожалуйста, введите корректный номер телефона полностью');
        return;
    }
    
    const agreement = form.querySelector('input[name="agreement"]');
    if (!agreement.checked) {
        alert('Пожалуйста, согласитесь с политикой конфиденциальности');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Отправка...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("https://formsubmit.co/ajax/yydjdjd955@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            form.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #8B5CF6, #EC4899); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h2 style="font-size: 1.75rem; margin-bottom: 12px; color: #111827;">Заявка отправлена!</h2>
                    <p style="color: #6B7280; font-size: 1.05rem; line-height: 1.6;">Спасибо за обращение! Мы свяжемся с вами в ближайшее время.</p>
                </div>
            `;
        } else {
            throw new Error('Ошибка отправки');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Отправить заявку <svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M10 3.33333L17.5 10.8333L10 18.3333M3.33333 10.8333H16.6667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
});
