var cart = JSON.parse(localStorage.getItem("cart") || "[]");
var prixTotal = 0
var ids = []

if (typeof(Storage) !== "undefined") {
    if (window.localStorage.getItem('cart') !== null && window.localStorage.getItem('cart') !== "[]") {
        document.getElementById('content').innerHTML += 
            '<table id ="myTable">' +
            '<tr id="labels"><th>Produit</th><th>Prix</th><th>Quantité</th><th>Total</th><th></th></tr>' +
            '</table>'

                for (let i = 0; i < cart.length ; i++) {

                    var total = cart[i].price * cart[i].qty   

                            document.getElementById('myTable').innerHTML += 
                            '<tr id = "ensemble">' +
                            '<td>' + cart[i].name + '<br>' + '<p>Couleur : ' + cart[i].color + '<br>' + '<img src ="' + cart[i].image + '" alt="' + cart[i].name + '"/></td>' +
                            '<td>' + cart[i].price + '€</td>' +
                            '<td>'+ cart[i].qty + '</td>' +
                            '<td>'+ total + '€</td>' +
                            '<td><button data-id= "' + cart[i].id + '" data-color= "' + cart[i].color + '" class = "btn-delete">Retirer du panier</button></td>' +
                            '</tr>'

                            var myBtn = document.querySelectorAll('[data-id]')
                            for (let j = 0; j < myBtn.length; j++) {
                                myBtn[j].addEventListener('click', function() {

                                    var myProduct = cart.find(obj => obj.id === myBtn[j].dataset.id && obj.color === myBtn[j].dataset.color)
                                    console.log(myProduct)
                                    var indexFound = cart.indexOf(myProduct)
                            
                                    if (indexFound > -1) {  
                                        if (cart[j].qty > 1) {
                                            cart[j].qty --
                                            localStorage.setItem('cart', JSON.stringify(cart))
                                            location.reload()
                                        }
                                        else {
                                            cart.splice(indexFound, 1)      
                                            localStorage.setItem('cart', JSON.stringify(cart))
                                            location.reload()
                                        }
                                    }     
                                })
                            }  

                        ids.push(cart[i].id)
                        prixTotal += total 

                        document.getElementById('btn-vider').addEventListener('click', function() {
                        window.localStorage.clear()
                        location.reload()
                    })                   
                } 
                document.getElementById('prixTotal').innerHTML += 'Total : ' + prixTotal + '€'
    }
    else {
        document.getElementById('form_panier').style.visibility="hidden"
        document.getElementById('content').innerHTML = '<p id= panier_vide>Votre panier est vide.</p>'
    }
}
else {
    document.getElementById('content').innerHTML = "Désolé, votre navigateur ne supporte pas le stockage de données..."
}

////////// Requete POST //////////

document.getElementById('form1').addEventListener('submit', function(e) {
     
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
        
    window.localStorage.setItem('prixTotal', JSON.stringify(prixTotal))

    var request = new XMLHttpRequest()
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200 || this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                var orderId = JSON.parse(this.responseText)
                window.localStorage.setItem('orderId', JSON.stringify(orderId))
            }
        }
    request.open("POST", "http://localhost:3000/api/teddies/order")
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(JsonObject))

    setTimeout(function() { 
        window.location.assign("../commande/commande.html") 
    }, 2000);
}) 
