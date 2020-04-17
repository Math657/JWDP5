var payed = JSON.parse(localStorage.getItem('prixTotal'))
var myOrderId = JSON.parse(localStorage.getItem('orderId'))
console.log(myOrderId)

document.getElementById('recap').innerHTML += 
'<h3>Merci pour votre commande!</h3>' +
'<p>Voici votre numéro de commande : <span id="orderId">' + myOrderId.orderId + '</span></p>' +
'<p>Nous préparons votre commande. Vous pourrez suivre votre commande avec ce numéro.</p><br>' +
'<p>Total payé : ' + payed + ' €</p>'

//window.localStorage.removeItem('cart')
window.localStorage.clear()