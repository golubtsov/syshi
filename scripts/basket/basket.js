const blc_products = document.querySelector('.col-md-6');

function get_basket() {
    let basket = JSON.parse(localStorage.basket);
    for (const el of basket) {
        create_card_prod(el);
    }
    return basket;
}
get_basket();

function create_card_prod(prod) {
    blc_products.innerHTML += `
    <div class="card-prod row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div class="col p-4 d-flex flex-column position-static">
            <h3 class="mb-0">${prod.name}</h3>
            <p class="card-text mb-auto">${prod.menu}</p>
            <p class="card-text price">${prod.price}</p>
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
    blc_products.innerHTML = '';
    for (const el of JSON.parse(localStorage.basket)) {
        if(!el.name == name){
            new_basket = [...new_basket, el];
        }
    }
    send_basket(new_basket);
    get_basket();
}

function send_basket(data) {
    localStorage.basket = JSON.stringify(data);
}