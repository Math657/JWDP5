var storage = window.localStorage
console.log(storage) 
var json = JSON.parse(storage.getItem('product'))

var empty = 0





if (typeof(Storage) !== "undefined") {
    

    document.getElementById('content').innerHTML += '<h3>' + json.name + '</h3>' +
    '<img src ="' + json.image + '" alt="' + json.name + '"/>' + 
    '<p>' + json.price + '€</p>' + '<p>' + json.color + '</p>' +
    '<button id="delete">Supprimer du panier</button>' 

    empty ++

    document.getElementById('delete').addEventListener('click', function(event) {
        empty --
        storage.removeItem('product')
        location.reload();
    })

    console.log("c'est égale à" + empty)
} 
else {
    document.getElementById('content').innerHTML = "Désolé, votre navigateur ne supporte pas le stockage de données..."
}




if (empty === 0) {  // Affichage formulaire 
    document.getElementById('form_panier').style.visibility="hidden"
    document.getElementById('content').innerHTML = "Votre panier est vide."
}
else {
    document.getElementById('form_panier').style.visibility="visible"
} 