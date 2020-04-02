function get(url, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            var response = JSON.parse(this.responseText);
             callback(response) 
             console.log(response)
        }
    };
    request.open("GET", url);
    request.send();
}
// Requête API


/*function store() {  // Stock l'objet teddy
    const teddy = {
        name: response.name,
        price: response.price/100,
        image: response.imageUrl,
        colors: response.colors[i]
    }

    window.localStorage.setItem('product', JSON.stringify(teddy))
}

function display() {  // Renvoie l'objet stocké
    JSON.parse(window.localStorage.getItem('product')) 
}

function remove() {  // Supprime l'objet stocké
    window.localStorage.removeItem('product')
}

function clear() {  // Clear le panier
    window.localStorage.clear();
} */