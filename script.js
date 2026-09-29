document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const channel = this.getAttribute('data-channel');
        
        // Сбор данных
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const task = document.getElementById('task').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !phone) {
            alert('Пожалуйста, заполните Имя и Телефон');
            return;
        }

        // Формируем текст заявки
        let text = `Заявка с сайта «Форпост»%0A%0A`;
        text += `Имя: ${name}%0A`;
        text += `Телефон: ${phone}%0A`;
        text += `Задача: ${task}%0A`;
        if (message) text += `Комментарий: ${message}%0A`;

        // ВАЖНО: Замените на свои данные!
        const waNumber = '79991234567'; // Номер WhatsApp без + и пробелов
        const smsNumber = '+79991234567'; // Номер для SMS
        const tgUsername = 'your_telegram_nickname'; // Никнейм в Telegram без @

        let url = '';

        switch(channel) {
            case 'whatsapp':
                url = `https://wa.me/${waNumber}?text=${text}`;
                break;
            case 'sms':
                // Для iOS и Android
                url = `sms:${smsNumber}?body=${text}`;
                break;
            case 'telegram':
                // Telegram не поддерживает предзаполненный текст через обычные ссылки для пользователей.
                // Мы копируем текст в буфер обмена и открываем чат.
                navigator.clipboard.writeText(text.replace(/%0A/g, '\n')).then(() => {
                    alert('Текст заявки скопирован! Сейчас откроется Telegram, просто вставьте текст в чат.');
                    url = `https://t.me/${tgUsername}`;
                }).catch(() => {
                    // Фоллбек, если буфер обмена недоступен
                    url = `https://t.me/${tgUsername}`;
                    alert('Свяжитесь с нами в Telegram!');
                });
                break;
        }

        if (url) window.open(url, '_blank');
    });
});
