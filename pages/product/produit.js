const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const myId = urlParams.get('id')

// ID récupéré


get("http://localhost:3000/api/teddies/" + myId , function(response) {

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

            

            document.getElementById('btn_panier').addEventListener('click', function(event) {
                var getColor = document.getElementById('colors')
                var clrUser = getColor.options[getColor.selectedIndex].text

                class ted {
                    constructor(name, price, image, color) {
                        this.name = name
                        this.price = price
                        this.image = image
                        this.color = color
                    }
                }
                
                const teddy = {
                    name: response.name,
                    price: response.price/100,
                    image: response.imageUrl,
                    color: clrUser
                }
                
                window.localStorage.setItem('product', JSON.stringify(teddy))
                console.log(teddy)
            })  // Store l'objet "teddy"
            
})





