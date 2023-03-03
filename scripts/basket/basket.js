const blc_products = document.querySelector('.col-md-6');
const text_none = document.querySelector('.pusto');

function get_basket() {
    blc_products.innerHTML = '';
    let basket = JSON.parse(localStorage.basket);
    if (basket.length != 0) {
        text_none.style.display = 'none';
    } else {
        text_none.style.display = 'block';
    }
    for (const el of basket) {
        create_card_prod(el);
    }
    return basket;
}
get_basket();
get_price();

function create_card_prod(prod) {
    blc_products.innerHTML += `
    <div class="card-prod row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">${prod.name}</h3>
            <p class="card-text mb-auto">${prod.menu}</p>
            <p class="card-text price">${prod.price}</p>
            <div class="blc-count">
                <input onclick="minus('${prod.name}')" type="button" class="stretched-link" value="-">
                <input oninput="add_count()" type="number" class="count" value="${prod.count}">
                <input onclick="plus('${prod.name}')" type="button" class="stretched-link" value="+">
            </div>
            <input onclick="remove_prod('${prod.name}')" type="button" class="stretched-link btn-remove" value="Удалить">
        </div>
        <div class="card-img col-auto d-lg-block">
            <img src="${prod.img}" alt="${prod.name}" width="200px" height="250px">
        </div>
    </div>
    `;
}

function remove_prod(name) {
    let new_basket = [];
    for (const el of JSON.parse(localStorage.basket)) {
        if (el.name != name) {
            new_basket = [...new_basket, el];
        }
    }
    send_basket(new_basket);
    get_basket();
    let price_el = document.querySelector('.text-price');
    price_el.innerHTML = 0;
    get_price();
}

function send_basket(data) {
    localStorage.basket = JSON.stringify(data);
}

function plus(name) {
    let new_basket = [];
    for (const el of JSON.parse(localStorage.basket)) {
        if (el.name == name) {
            if(el.count != 15) {
                el.count = el.count + 1;
                change_price_plus();
            }
        }
        new_basket = [...new_basket, el];
    }
    send_basket(new_basket);
    get_basket();
}

function minus(name) {
    let new_basket = [];
    for (const el of JSON.parse(localStorage.basket)) {
        if (el.name == name) {
            if (el.count != 1) {
                el.count = el.count - 1;
                change_price_minus();
            }
        }
        new_basket = [...new_basket, el];
    }
    send_basket(new_basket);
    get_basket();
}

function add_count(){
    const val = document.querySelector('.count');
    if(Number(val.value) <= 1){
        val.value = 1;
    }
    if(Number(val.value) >= 15){
        val.value = 15;
    }
}

function change_price_minus(){
    let price_el = document.querySelector('.text-price');
    let price = Number(price_el.innerHTML);
    for (const el of JSON.parse(localStorage.basket)) {
        price -= Number(el.price.substring(-1,6));
    }
    price_el.innerHTML = price;
}

function change_price_plus(){
    let price_el = document.querySelector('.text-price');
    let price = Number(price_el.innerHTML);
    for (const el of JSON.parse(localStorage.basket)) {
        price += Number(el.price.substring(-1,6));
    }
    price_el.innerHTML = price;
}

function get_price(){
    let price_el = document.querySelector('.text-price');
    let price = Number(price_el.innerHTML);
    if(JSON.parse(localStorage.basket) != 0){
        for (const el of JSON.parse(localStorage.basket)) {
            price += Number(el.price.substring(-1,6));
        }
        price_el.innerHTML = price;
    } else {
        price_el.innerHTML = 0;
    }
}