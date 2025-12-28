var title = document.getElementById('t');
title.style.cssText = "color: rgba(16, 23, 80, 1);margin:0;font-size:40px"
var el = document.createElement("div");
var txt = document.createTextNode("Home.pages");
var span = document.createElement("span");
span.style.color = "#f44f91";
span.textContent = ".Product Details";
el.setAttribute('style', 'font-size:17px;');
el.appendChild(txt);
el.appendChild(span);
document.getElementById('d').appendChild(el);


const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var product = xhr.responseText;
        displayProduct(product);
    }
};
var url = "https://fakestoreapi.com/products/" + productId;
xhr.open("get", url, true);
xhr.send();

function getStars(rate) {
    window.initialProductRating = rate;
    window.userRating = 0;

    let starsHtml = '<div class="star-rating" style="display: inline-block; margin-right: 5px;" onmouseout="resetStars()">';
    let roundedRate = Math.round(rate);

    for (let i = 1; i <= 5; i++) {
        let color = i <= roundedRate ? '#FFC416' : '#B2B2B2';
        starsHtml += `<span class="star" data-value="${i}" 
            onclick="rateProduct(${i})" 
            onmouseover="highlightStars(${i})" 
            style="color: ${color}; cursor: pointer; font-size: 20px;">★</span>`;
    }
    starsHtml += '</div>';
    return starsHtml;
}

window.highlightStars = function (count) {
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        if (value <= count) {
            star.style.color = '#FFC416';
        } else {
            star.style.color = '#B2B2B2';
        }
    });
}

window.resetStars = function () {
    const ratingToDisplay = window.userRating > 0 ? window.userRating : Math.round(window.initialProductRating);
    window.highlightStars(ratingToDisplay);
}

window.rateProduct = function (count) {
    window.userRating = count;
    window.highlightStars(count);
    localStorage.setItem('userRating', count);
    console.log(`User rated product: ${count} stars`);
}

function displayProduct(p) {
    var prod = JSON.parse(p);
    console.log(prod);

    document.getElementById("prod").innerHTML = `
     <div style="display: flex; height: 100%; width: 100%;">
        <img src="${prod.image}" style="width: 30%; height: 100%; object-fit: contain;"/>
        
        <div class="d">
            <h2>${prod.title}</h2>
            <div style="display: flex; align-items: center;">
                ${getStars(prod.rating.rate)}
                <span style="margin-left: 5px;">${prod.rating.rate} (${prod.rating.count} reviews)</span>
            </div>
            <p>$${prod.price}</p>
            <p style="color:rgba(169, 172, 198, 1)">${prod.description}</p>
            <div style="text-align:center">
                <button id="add-to-cart"
                style="background-color: #f44f91; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;"
                >Add to cart</button>
            </div>
            <p>Category: ${prod.category}</p>
        </div>
    </div>
    `;

    const addToCartBtn = document.getElementById("add-to-cart");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function () {
            const newItem = {
                id: prod.id,
                name: prod.title,
                price: prod.price,
                image: prod.image,
                color: "Default",
                size: "M",
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItemIndex = cart.findIndex(item => item.id === newItem.id);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(newItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert("Item added to cart!");
        });
    }
}