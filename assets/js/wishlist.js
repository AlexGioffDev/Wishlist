let buttonWish = document.getElementById("buttonWish");
let errorForm = document.getElementById("error");
let form = document.getElementById("form")
let totalPrice = document.getElementById("total-price");
let imageProduct = document.getElementById("imageProduct");
let titleProduct = document.getElementById("titleProduct");
let priceProduct = document.getElementById("priceProduct");
let linkPorduct = document.getElementById("linkProduct");
let numbersProduct = document.getElementById("numberProduct");
let cards = document.getElementById("cards");

if (!localStorage.getItem("wishlist")) {
    localStorage.setItem("wishlist", JSON.stringify([]))
}



const generateWish = () => {
    if (!imageProduct.checkValidity()
        || !titleProduct.checkValidity()
        || !priceProduct.checkValidity()
        || !linkPorduct.checkValidity()
        || !numbersProduct.checkValidity()) {
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
        "numbersProduct": numbersProduct.value
    }
    let storage = JSON.parse(localStorage.getItem("wishlist"));

    storage.push(productForStorage);
    localStorage.setItem("wishlist", JSON.stringify(storage));
    console.log(JSON.parse(localStorage.getItem("wishlist")));
    loadCard();
    imageProduct.value = "";
    titleProduct.value = "";
    priceProduct.value = 0;
    linkPorduct.value = "";
    numbersProduct.value = 1;
}


const generateCards = () => {
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

        let cardNumbers = document.createElement("div");
        cardNumbers.classList.add("card-numbers");

        let buttonMinus = document.createElement("button");
        buttonMinus.classList.add("card-numbers-button")
        buttonMinus.innerText = "-";
        buttonMinus.onclick = decrement;

        let valueNumbers = document.createElement("h2");
        valueNumbers.classList.add("card-numbers-value");
        valueNumbers.innerText = parseInt(wishlist.numbersProduct);

        let buttonPlus = document.createElement("button");
        buttonPlus.classList.add("card-numbers-button")
        buttonPlus.innerText = "+";
        buttonPlus.onclick = increment;

        cardNumbers.appendChild(buttonMinus);
        cardNumbers.appendChild(valueNumbers);
        cardNumbers.appendChild(buttonPlus);

        let cardLink = document.createElement("a");
        cardLink.classList.add("card-link");
        cardLink.target = "_blank";
        cardLink.innerText = "Link";
        cardLink.href = wishlist.linkProduct;

        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(cardPrice);
        cardInfo.appendChild(cardNumbers);
        cardInfo.appendChild(cardLink);

        cardDiv.appendChild(cardInfo);
        cards.appendChild(cardDiv);

    })
}

const loadCard = () => {
    cards.replaceChildren();

    generateCards();
    if(cards.childElementCount < 1){
        form.style.gridRow = 3;
    } else {
        form.style.gridRow = 11;
    }
    calculateTotal();
}

const calculateTotal = () => {
    if (cards.childElementCount < 1) {
        totalPrice.innerText = "0.00";
        return;
    }
    let total = parseFloat('0.00');
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist"));

    let wishlistArr = Object.values(wishlistItems);

    wishlistArr.forEach(wish => {
        total += parseFloat(wish.priceProduct) * parseInt(wish.numbersProduct);
        totalPrice.innerText = total.toFixed(2);
    })


}


const decrement = (event) => {
    event.preventDefaultEvent = true;
    const title = event.path[2].children[0].innerText;
    let elementsArr = Object.values(JSON.parse(localStorage.getItem("wishlist")));

    elementsArr.forEach(wish => {
        if(wish.titleProduct.toLowerCase() === title.toLowerCase())
        {
            let preValue = parseInt(wish.numbersProduct);
            let newValue = preValue - 1;
            wish.numbersProduct = parseInt(newValue);
            if(wish.numbersProduct == 0)
            {
               wish.numbersProduct = parseInt(1);
            }
            return
        }
    })
    localStorage.setItem("wishlist", JSON.stringify(elementsArr));
    loadCard();


}

const increment = (event) => {
    event.preventDefaultEvent = true;
    const title = event.path[2].children[0].innerText;
    let elementsArr = Object.values(JSON.parse(localStorage.getItem("wishlist")));

    elementsArr.forEach(wish => {
        if(wish.titleProduct.toLowerCase() === title.toLowerCase())
        {
            let preValue = parseInt(wish.numbersProduct);
            let newValue = preValue + 1;
            wish.numbersProduct = parseInt(newValue);
            return
        }
    })

    localStorage.setItem("wishlist", JSON.stringify(elementsArr));
    loadCard();

}

loadCard();
