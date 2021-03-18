
window.onload = function () {
    //console.log("Oldal betöltve...");
    
    for (var i = 0; i < 10; i++) {
        var sor = document.createElement("div");
        document.getElementById("pascal").appendChild(sor);
        //sor.innerText = i;
        sor.className = "sor";
        
        for (var j = 0; j < 10; j++) {
            //var c = 1;
            var elem = document.createElement("div");

            while (j <= i) {
                sor.appendChild(elem);
                elem.innerText = (faktoriális(i) / (faktoriális(j) * faktoriális(i - j)));
                console.log(faktoriális(i) / (faktoriális(j) * faktoriális(i - j)))
                break;
            }

            elem.className = "elem";
            //elem.style.backgroundColor = "#" + (9-j) + "8C8C8";
        }
    }
}

var faktoriális = function (n) {
    let er = 1;
    for (let i = 2; i <= n; i++) {
        er = er * i;
    }
    return er;
}
