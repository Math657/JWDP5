var cart = JSON.parse(localStorage.getItem("cart") || "[]");
var prixTotal = 0
var ids = []


///////////// Affichage du panier //////////////////
if (typeof(Storage) !== "undefined") {
    if (window.localStorage.getItem('cart') !== null && window.localStorage.getItem('cart') !== "[]") {  // Check si le localStorage a des produits 
        document.getElementById('content').innerHTML += 
            '<table id ="myTable">' +
            '<tr id="labels"><th>Produit</th><th>Prix</th><th class="full-text">Quantité</th><th class="short-text">Qté<th/><th>Total</th><th></th></tr>' +
            '</table>'

                for (let i = 0; i < cart.length ; i++) {

                    var total = cart[i].price * cart[i].qty   

                            document.getElementById('myTable').innerHTML += 
                            '<tr id = "ensemble">' +
                            '<td><span class="nom_produit">' + cart[i].name + '</span><br>' + '<p>Couleur : ' + cart[i].color + '<br>' + '<img src ="' + cart[i].image + '" alt="' + cart[i].name + '"/></td>' +
                            '<td>' + cart[i].price + '€</td>' +
                            '<td>'+ cart[i].qty + '</td>' +
                            '<td>'+ total + '€</td>' +
                            '<td><button data-id= "' + cart[i].id + '" data-color= "' + cart[i].color + '" class = "btn-delete">Retirer du panier</button></td>' +
                            '</tr>'

                            var myBtn = document.querySelectorAll('[data-id]')
                            for (let j = 0; j < myBtn.length; j++) {
                                myBtn[j].addEventListener('click', function() {

                                    var indexFound = cart.findIndex(obj => obj.id === myBtn[j].dataset.id && obj.color === myBtn[j].dataset.color) // Trouve l'index du produit associé au bouton
                            
                                    if (indexFound > -1) {   
                                        if (cart[j].qty > 1) {
                                            cart[j].qty --
                                            localStorage.setItem('cart', JSON.stringify(cart))
                                            location.reload()
                                        }
                                        else {    // Retire le produit du panier
                                            cart.splice(indexFound, 1)      
                                            localStorage.setItem('cart', JSON.stringify(cart))
                                            location.reload()
                                        }
                                    }     
                                })
                            }  

                        ids.push(cart[i].id)
                        prixTotal += total 

                        document.getElementById('btn-vider').addEventListener('click', function() { // Vide le panier
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

document.getElementById('form1').addEventListener('submit', function(e) {  /// Valide le formulaire et passe la commande
     
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
        window.localStorage.setItem('prixTotal', JSON.stringify(prixTotal))
        window.location.assign("../commande/commande.html")
    })
    .catch(error => {
        console.error(error)
    })
})


