function create_basket_localstorage(){
    if(localStorage.basket == undefined || localStorage.basket == null){
        localStorage.basket = JSON.stringify([]);
    }
}
create_basket_localstorage();