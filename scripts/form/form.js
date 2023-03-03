const popup = document.querySelector('.blc-popup');
const popup_text = document.querySelector('.blc-content .text');
const form = document.querySelector('form');
const btn_submit = document.querySelector('form .stretched-link');
btn_submit.addEventListener('click', (event) => {
    event.preventDefault();
    check_form();
});

function check_form() {
    let error = 0;
    for (let i = 0; i < form.elements.length - 2; i++) {
        if(form.elements[i].value == ''){
            error = 1;
            break;
        }
    }

    if (error === 1) {
        popup_text.innerHTML = 'Все поля формы должны быть заполнены!';
        popup.style.display = 'flex';
    } else {
        popup_text.innerHTML = 'Ваш заказ отправлен на обработку. <br> Свами свяжется специалист, чтобы подтвердить заказ.';
        popup.style.display = 'flex';
    }
}