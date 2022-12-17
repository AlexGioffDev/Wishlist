let buttonCreate = document.getElementById("button-create");

let storage = localStorage.getItem("wishlist");


if(storage == null) {
    buttonCreate.innerText = "Create your Wishlist";
} else {
    buttonCreate.innerText = "See your Wishlist";
}

