const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const myId = urlParams.get('id')
// ID dans l'URL récupéré

get("http://localhost:3000/api/teddies/" + myId , function(response) {

            document.title = response.name

            document.getElementById('image').innerHTML +=
            '<img src ="' + response.imageUrl + '" alt="' + response.name + '"/>'
            document.getElementById('description').innerHTML +=
            '<div class="infos_produit">' +
                '<p class="nom_produit" id="name">' + response.name + '</p>' +
                '<p class="prix_produit" id="prix">' + response.price/100 + '€</p>' +
                '<div class="color_choice">' +
               ' <label for="colors">Choisissez une couleur : </label>' +
               ' <select id="colors">' 

                for (i =0; i < response.colors.length; i++) {
                    document.getElementById('colors').options.add(new Option(response.colors[i], response.colors[i])) 
                } 

                document.getElementById('description').innerHTML +=
                '</select>' +
                '</div>' +
                '<p>' + response.description + '</p>' +
                '<a href="../panier/panier.html"><div class="btn-cde btn_produit" id="btn_panier">Ajouter au panier</div></a>'
            '</div>'

            document.getElementById('btn_panier').addEventListener('click', function(event) { // Ajoute le produit dans le panier
                
                    var getColor = document.getElementById('colors')
                    var clrUser = getColor.options[getColor.selectedIndex].text
                    var cart = JSON.parse(localStorage.getItem("cart") || "[]");

                    let product = cart.find(product => myId === product.id && clrUser === product.color)
                    
                
                    if (product) {
                        product.qty ++
                    }

                    else {
                     product = {
                        name: response.name,
                        price: response.price/100,
                        image: response.imageUrl,
                        color: clrUser,
                        qty: 1,
                        id: myId
                        }
                    cart.push(product)
                    }
                    
                    localStorage.setItem("cart", JSON.stringify(cart))
            })          
})





