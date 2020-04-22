const get = (url) => new Promise((resolve, reject) => {  // Requête API GET
    var request = new XMLHttpRequest()
    request.onreadystatechange = () => {
        if (request.readyState !== XMLHttpRequest.DONE) return

        if (request.status === 200) {
            var test = JSON.parse(request.responseText)
            return resolve(test)
        } else {
            return reject()
        }
    }
    request.open("GET", url)
    request.send()
})

const postRequest = (url, body) => new Promise((resolve, reject) => { // Requête POST
    var request = new XMLHttpRequest()
    request.onreadystatechange = () => {
        if (request.readyState !== XMLHttpRequest.DONE) return
    
        if (request.status === 201) {
            return resolve(JSON.parse(request.responseText))
        } else {
            return reject()
        }
    }
    request.open("POST", url)
    request.setRequestHeader("Content-Type", "application/json")
    request.send(JSON.stringify(body))
})

const getList = (data) => {  // Affiche les produits sur la page d'accueil
    if (Array.isArray(data)) { 
        for (let i= 0; i < data.length; i++) {

        document.getElementById('list').innerHTML += 
        '<a href="../product/product.html?id=' + data[i]._id + '">' +
            '<img src ="' + data[i].imageUrl + '" alt="' + data[i].name + '"/>' +
            '<p class="product_name">' + data[i].name + '</p>' +
            '<p class="product_price">' + data[i].price/100 + '€</p>' + 
        '</a>'
        }
    }
}

const getImg = (data) => {  // Affiche l'image pour la page produit
        document.getElementById('image').innerHTML +=
            '<img src ="' + data.imageUrl + '" alt="' + data.name + '"/>'
}

const getDescription = (data) => {  // Affiche la description complète (nom, prix, couleur, quantité et description) pour la page produit
    document.getElementById('description').innerHTML +=
            '<div>' +
            '<p class="product_name" id="name">' + data.name + '</p>' +
            '<p class="product_price" id="price">' + data.price / 100 + '€</p>' +
            '<div class="color_choice">' +
            ' <label for="colors">Choisissez une couleur : </label>' +
            ' <select id="colors">'


        for (i = 0; i < data.colors.length; i++) {
            document.getElementById('colors').options.add(new Option(data.colors[i], data.colors[i]))
        }

        document.getElementById('description').innerHTML +=
            '</select></div>' +
            '<div class="qty_choice">' +
            '<label for="qty">Quantité : </label>' +
            '<input type="number" id="quantity" name="quantity" min="1" max="99" value="1">' +

            '<p>' + data.description + '</p>' +
            '<a href="../cart/cart.html"><div class="btn-order" id="btn_cart">Ajouter au panier</div></a>'
            '</div>'
}

const checkQty = () => { // Vérifie que la quantité ajoutée au panier soit valide
    var myQty = parseInt(document.getElementById("quantity").value)
    if(myQty > 0 && myQty < 100) {
        return myQty
    }
    else return parseInt(document.getElementById("quantity").value = 1)
}

const addToCart = (data) => { // Ajoute le produit dans le panier
    document.getElementById('btn_cart').addEventListener('click', function () { 

        var getColor = document.getElementById('colors')
        var clrUser = getColor.options[getColor.selectedIndex].text
        var cart = JSON.parse(localStorage.getItem("cart") || "[]");

        let product = cart.find(product => myId === product.id && clrUser === product.color)


        if (product) {
            product.qty += checkQty()
        } else {
            product = {
                name: data.name,
                price: data.price / 100,
                image: data.imageUrl,
                color: clrUser,
                qty: checkQty(),
                id: myId
            }
            cart.push(product)
        }

        localStorage.setItem("cart", JSON.stringify(cart))
    })
}

const removeFromCart = (cart) => {
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
}

const displayCartTable = (cart) => {  // Affiche le contenu du panier dans un tableau
    for (let i = 0; i < cart.length ; i++) {

        var total = cart[i].price * cart[i].qty   

                document.getElementById('myTable').innerHTML += 
                '<tr id = "ensemble">' +
                '<td><span class="product_name">' + cart[i].name + '</span><br>' + '<p>Couleur : ' + cart[i].color + '<br>' + '<img src ="' + cart[i].image + '" alt="' + cart[i].name + '"/></td>' +
                '<td>' + cart[i].price + '€</td>' +
                '<td>'+ cart[i].qty + '</td>' +
                '<td>'+ total + '€</td>' +
                '<td><button data-id= "' + cart[i].id + '" data-color= "' + cart[i].color + '" class = "btn-delete">Retirer du panier</button></td>' +
                '</tr>'

                removeFromCart(cart)

            ids.push(cart[i].id)
            totalPrice += total                        
    } 
}

const clearCart = () => {
    document.getElementById('btn-clear').addEventListener('click', function() { // Vide le panier
        window.localStorage.clear()
        location.reload()
        }) 
}