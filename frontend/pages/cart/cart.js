var cart = JSON.parse(localStorage.getItem("cart") || "[]");
var totalPrice = 0
var ids = []

if (typeof(Storage) !== "undefined") {
    if (window.localStorage.getItem('cart') !== null && window.localStorage.getItem('cart') !== "[]") {  // Vérifie si le localStorage a des produits dans cart
        document.getElementById('content').innerHTML += 
            '<table id ="myTable">' +
            '<tr id="labels"><th>Produit</th><th>Prix</th><th class="full-text">Quantité</th><th class="short-text">Qté<th/><th>Total</th><th></th></tr>' +
            '</table>'

                displayCartTable(cart)
                clearCart()
                
                document.getElementById('totalPrice').innerHTML += 'Total : ' + totalPrice + '€'
    }
    else {   
        document.getElementById('cart_form').style.visibility="hidden"
        document.getElementById('content').innerHTML = '<p id= "empty_cart">Votre panier est vide.</p>'
    }
}
else {
    document.getElementById('content').innerHTML = "Désolé, votre navigateur ne supporte pas le stockage de données..."
}

document.getElementById('form1').addEventListener('submit', function(e) {  /// Valide le formulaire et passe la commande si il est correcte
     
    e.preventDefault()
    const JsonObject = {
        contact: {
            lastname: form1.lastname.value,
            name: form1.name.value,
            email: form1.email.value,
            phone: form1.phone.value,
            adress: form1.adress.value,
            zipcode: form1.zip.value,
            city : form1.city.value,
            country: form1.country.value
        },
        products: [ids]
    }
        
    postRequest("http://localhost:3000/api/teddies/order", JsonObject)
    .then(result => {
        window.localStorage.setItem('orderId', JSON.stringify(result))
        window.localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
        window.location.assign("../order/order.html")
    })
    .catch(error => {
        console.error(error)
    })
})


