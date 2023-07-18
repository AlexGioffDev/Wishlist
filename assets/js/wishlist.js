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

if (!localStorage.getItem("wishlist") || localStorage.getItem("wishlist").length <= 0) {
    localStorage.setItem("wishlist", JSON.stringify([
        {
            "imageProduct": "https://m.media-amazon.com/images/P/B0997XX2BW.01._SCLZZZZZZZ_SX500_.jpg",
            "titleProduct": "Spiderman Comics",
            "priceProduct": 19.00,
            "linkProduct": "https://www.amazon.it/Potere-responsabilit%C3%A0-Ultimate-Spider-Man-Michael/dp/8828703083/ref=sr_1_3?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=7XPWW26GHMFV&keywords=spiderman+number+1+comics&qid=1689673724&sprefix=spiderman+number+1+comic%2Caps%2C111&sr=8-3",
            "numbersProduct": 1
        },
        {
            "imageProduct": "https://m.media-amazon.com/images/I/71dpTXFz+dL._AC_SL1500_.jpg",
            "titleProduct": "Iphone 13",
            "priceProduct": 763.00,
            "linkProduct": "https://www.amazon.it/Apple-iPhone-13-128GB-Azzurro/dp/B09G9DMQ7M/ref=sr_1_1_sspa?keywords=iphone+13&qid=1689673930&sprefix=iphone%2Caps%2C213&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
            "numbersProduct": 2
        },
    ]))
}



const generateWish = () => {
    if (!imageProduct.checkValidity()
        || !titleProduct.checkValidity()
        || !priceProduct.checkValidity()
        || !linkPorduct.checkValidity()
        || !numbersProduct.checkValidity()) {
            console.log(imageProduct.validationMessage)
            console.log(titleProduct.validationMessage)
            console.log(priceProduct.validationMessage)
            console.log(linkPorduct.validationMessage)
            console.log(numbersProduct.validationMessage)
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
        cardPrice.innerHTML = `Price: <span>${parseFloat(wishlist.priceProduct).toFixed(2)}</span>`

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

        let cardButtons = document.createElement("div");
        cardButtons.classList.add("card-buttons");

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("card-delete")
        deleteButton.innerText = "Delete";
        deleteButton.onclick = deleteItem;
        let cardLink = document.createElement("a");
        cardLink.classList.add("card-link");
        cardLink.target = "_blank";
        cardLink.innerText = "Link";
        cardLink.href = wishlist.linkProduct;

        cardButtons.appendChild(deleteButton);
        cardButtons.appendChild(cardLink);

        

        cardInfo.appendChild(cardTitle);
        cardInfo.appendChild(cardPrice);
        cardInfo.appendChild(cardNumbers);
        cardInfo.appendChild(cardButtons);
        

        cardDiv.appendChild(cardInfo);
        cards.appendChild(cardDiv);

    })
}

const formPosition = () => {
    if(cards.childElementCount < 1){
        form.style.gridRow = 3;
    } else {
        form.style.gridRow = 11;
    }
}

const loadCard = () => {
   cards.replaceChildren();

    generateCards();
    formPosition();
    calculateTotal();
}

const deleteItem = (event) => {
   let children = Object.values(cards.children);
   let wishItem = Object.values(JSON.parse(localStorage.getItem("wishlist")));
   console.log(event.target.parentNode.parentNode.parentNode)
   let index = 0;
   children.forEach((child, idx) => {
        if(child == event.target.parentNode.parentNode.parentNode)
        {
            index = idx
            cards.removeChild(event.target.parentNode.parentNode.parentNode);
        }
   })

   let newWishItem = wishItem.filter((wish, idx) => {
        if(idx !== index){
            return wish;
        }
   })


   localStorage.setItem("wishlist", JSON.stringify(newWishItem));
   loadCard();
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

const clearAll = () => {
    localStorage.setItem("wishlist", JSON.stringify([]));

    loadCard();
}

loadCard();
