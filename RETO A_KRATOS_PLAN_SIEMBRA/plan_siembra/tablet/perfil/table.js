
let predict = function () {
    const Http = new XMLHttpRequest();
    const url = 'http://0.0.0.0:3001/getResult';
    Http.open("GET", url);
    Http.setRequestHeader("Content-type", "application/json");
    
    Http.setRequestHeader("H",document.getElementById("hectareas").innerText);
    Http.setRequestHeader("D",document.getElementById("deuda").innerText);
    Http.send();

    
    Http.onreadystatechange = function () {
        if (Http.readyState == 4 && Http.status == 200) {
            console.log(Http.responseText)
        }
    }


    document.getElementById("card").style.display = "block";
    
    
}