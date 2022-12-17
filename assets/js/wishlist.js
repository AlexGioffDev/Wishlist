let buttonWish = document.getElementById("buttonWish");
let errorForm = document.getElementById("error");


let imageProduct = document.getElementById("imageProduct");
let titleProduct = document.getElementById("titleProduct");
let priceProduct = document.getElementById("priceProduct");
let linkPorduct = document.getElementById("linkProduct");
let cards = document.getElementById("cards");

if(!localStorage.getItem("wishlist")){
    localStorage.setItem("wishlist", JSON.stringify([]))
}



const generateWish = () => {
    if (!imageProduct.checkValidity()
        || !titleProduct.checkValidity()
        || !priceProduct.checkValidity()
        || !linkPorduct.checkValidity()) {
            errorForm.style.display = "block";
        setTimeout(() => {
            errorForm.style.display = "none";
        }, 3000)
        errorForm.innerText = "Error! check the form and try again!"
        return;
    } 

    let productForStorage = {
        "imageProduct": imageProduct.value,
        "titleProduct": titleProduct.value,
        "priceProduct": priceProduct.value,
        "linkProduct": linkPorduct.value,
    }
    let storage = JSON.parse(localStorage.getItem("wishlist"));

    storage.push(productForStorage);
    localStorage.setItem("wishlist", JSON.stringify(storage));
    console.log(JSON.parse(localStorage.getItem("wishlist")));
    loadCard();
}

const loadCard = () => {
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist"));

    let wishlistArr = Object.values(wishlistItems);
    wishlistArr.forEach(wishlist => {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card")

        let cardImageCont = document.createElement("div");
        cardImageCont.classList.add("card-image-container")

        let image = document.createElement("img");
        image.classList.add("card-image")
        image.src = wishlist.imageProduct;

        cardImageCont.appendChild(image);

        cardDiv.appendChild(cardImageCont);

        let cardInfo = document.createElement("div");
        cardInfo.classList.add("card-info");


        let cardTitle = document.createElement("h2");
        cardTitle.classList.add("card-title");
        cardTitle.innerText = wishlist.titleProduct;

        let cardPrice = document.createElement("h2");
        cardPrice.classList.add("card-price");
        cardPrice.innerHTML = `Price - <span>${parseFloat(wishlist.priceProduct).toFixed(2)}</span>`

        let cardLink = document.createElement("a");
        cardLink.classList.add("card-link");
        cardLink.target = "_blank";
        cardLink.innerText = "Link";
        cardLink.href = wishlist.linkProduct;

        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(cardPrice);
        cardInfo.appendChild(cardLink);

        cardDiv.appendChild(cardInfo);
        cards.appendChild(cardDiv);

    })

}

loadCard();