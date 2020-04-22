const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const myId = urlParams.get('id') // ID dans l'URL récupéré

get("http://localhost:3000/api/teddies/" + myId)
    .then(response => {
        document.title = response.name
        getImg(response)
        getDescription(response)
        addToCart(response)
    })
    .catch(error => {
        console.error(error)
    })