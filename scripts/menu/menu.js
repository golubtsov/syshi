const blc_products = document.querySelector('.col-md-6');

function getURL() {
    let url_param = new URL(window.location).search.substring(6);
    console.log(url_param);
    get_prod_by_param(url_param)
}
getURL();

async function get_prod_by_param(param) {
    await fetch(`../menu_db/${param}.json`)
        .then(res => res.json())
        .then(res => {
            for (const el of res) {
                create_card_prod(el, param);
            }
        })
    btns_add_basket();
}

function create_card_prod(prod, category) {
    blc_products.innerHTML += `
    <div class="card-prod row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">${prod.name}</h3>
            <p class="card-text mb-auto">${prod.menu}</p>
            <p class="card-text price">${prod.price}</p>
            <input data-category="${category}" id="${prod.id}" type="button" class="stretched-link btn-add" value="Заказать">
        </div>
        <div class="card-img col-auto d-lg-block">
            <img src="${prod.img}" alt="${prod.name}" width="200px" height="250px">
        </div>
    </div>
    `;
}

function btns_add_basket() {
    const btns_add_basket = document.querySelectorAll('.btn-add');
    for (const el of btns_add_basket) {
        el.addEventListener('click', add_basket);
    }
}

async function add_basket() {
    let id_prod = this.id;;
    let cat_prod = this.getAttribute('data-category');
    let prod = await get_prod_by_id(cat_prod, id_prod);
    let basket = get_basket();
    if(check_basket(basket, prod)){
        alert('Блюдо уже добавлено!');
    } else {
        basket = [...basket, prod];
        send_basket(basket);
        alert('Блюдо добавлено в корзину!');
    }

}

async function get_prod_by_id(category, id) {
    let result = {};
    await fetch(`../menu_db/${category}.json`)
        .then(res => res.json())
        .then(res => {
            for (const el of res) {
                if(el.id == id){
                    el.count = 1;
                    result = el;
                }
            }
        })
    return result;
}

function get_basket(){
    return JSON.parse(localStorage.basket);
}

function send_basket(data) {
    localStorage.basket = JSON.stringify(data);
}

function check_basket(basket, prod){
    let res = false;
    for (const el of basket) {
        if(el.name == prod.name){
            res = true;
        }
    }
    return res;
}