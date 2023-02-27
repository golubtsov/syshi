function create_basket_localstorage(){
    if(localStorage.basket == undefined){
        localStorage.basket = JSON.stringify([]);
    }
}
create_basket_localstorage();