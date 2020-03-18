

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
            if (Array.isArray(response)) { 
                for (let i= 0; i < response.length + 1; i++) {
                var teddyJSON = response[i];
                console.log(teddyJSON);

                document.getElementById('teddy_1').innerHTML = response[0].name;
                document.getElementById('teddy_2').innerHTML = response[1].name;
                document.getElementById('teddy_3').innerHTML = response[2].name;
                document.getElementById('teddy_4').innerHTML = response[3].name;
                document.getElementById('teddy_5').innerHTML = response[4].name;
                }
            }
    }
};
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();
