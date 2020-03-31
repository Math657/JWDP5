
get("http://localhost:3000/api/teddies/", function(response) {
    if (Array.isArray(response)) { 
        for (let i= 0; i < response.length; i++) {
        var teddyJSON = response[i];
        console.log(teddyJSON);

        document.getElementById('liste').innerHTML += 
        '<a href="../product/produit.html?id=' + response[i]._id + '">' +
            '<img src ="' + response[i].imageUrl + '" alt="' + response[i].name + '"/>' +
            '<p class="nom_produit">' + response[i].name + '</p>' +
            '<p class="prix_produit">' + response[i].price/100 + '€</p>' + 
        '</a>'
        }
    }
})
