const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const myId = urlParams.get('id')

// ID récupéré

get("http://localhost:3000/api/teddies/" + myId , function(response) {

            document.getElementById('image').innerHTML +=
            '<img src ="' + response.imageUrl + '" alt="' + response.name + '"/>'
            document.getElementById('description').innerHTML +=
            '<div class="infos_produit">' +
                '<p class="nom_produit" id="nom">' + response.name + '</p>' +
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
                '<a href="../panier/panier.html"><div class="btn-cde btn_produit">Ajouter au panier</div></a>'
            '</div>'
            
})
