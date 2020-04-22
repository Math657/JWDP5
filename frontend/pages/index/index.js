get("http://localhost:3000/api/teddies/")
    .then(response => {
        getList(response)
    })
    .catch(error =>{
        console.error(error)
    })

