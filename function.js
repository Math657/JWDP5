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

const checkQty = () => { // Vérifie que la quantité ajoutée au panier soit valide
    var myQty = parseInt(document.getElementById("quantity").value)
    if(myQty > 0 && myQty < 100) {
        return myQty
    }
    else return parseInt(document.getElementById("quantity").value = 1)
}