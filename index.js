

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
            if (Array.isArray(response)) { 
                for (let i= 0; i < response.length + 1; i++) {
                var teddyJSON = response[i];
                console.log(teddyJSON);

                document.getElementById('liste').innerHTML += 
                '<a href="./produit.html/?id=' + response[i]._id + '">' +
                    '<img src ="' + response[i].imageUrl + '" alt="' + response[i].name + '"/>' +
                    '<p class="nom_produit">' + response[i].name + '</p>' +
                    '<p class="prix">' + response[i].price/100 + '€</p>' + 
                '</a>'

                }
            }
    }
};
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();


