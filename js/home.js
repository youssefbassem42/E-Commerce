document.addEventListener("DOMContentLoaded", function () {

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

      var products = JSON.parse(xhr.responseText);
      var container = document.getElementById("products");

      for (var i = 0; i < 4; i++) {
        var product = products[i];

        var productDiv = document.createElement("div");
        productDiv.className = "product-card";

        productDiv.innerHTML =
          '<img src="' + product.image + '" alt="' + product.title + '">' +
          '<h3>' + product.title + '</h3>' +
          '<p>Price: $' + product.price + '</p>';
           productDiv.setAttribute(
        "onclick",
        "window.location.href='productDetails.html?id=" + product.id + "'"
    );

        container.appendChild(productDiv);
      }
    }
  };

  xhr.send();


  var links = document.querySelectorAll(".navBar a");
  var currentPage = window.location.pathname.split("/").pop();

  for (var j = 0; j < links.length; j++) {
    if (links[j].getAttribute("href") === currentPage) {
      links[j].style.color = "red";
      break;
    }
  }

});
