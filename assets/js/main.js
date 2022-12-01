let buttonCreate = document.getElementById("button-create");

let storage = localStorage.getItem("wishlist");

console.log(storage);

if(storage == null) {
    buttonCreate.innerText = "Create your Wishlist";
} else {
    buttonCreate.innerText = "See your Wishlist";
}

