var kerdesek;
var kep;
var kerdesszam = 0;

var valasz1 = document.getElementById("1")
var valasz2 = document.getElementById("2")
var valasz3 = document.getElementById("3")

window.onload = letoltes();


function letoltes() {
    fetch('/questions.json')
        .then(r => r.json())
        .then(data => letoltesBefejezodott(data))
};

function letoltesBefejezodott(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d
    kérdésMegjelenítés(0)
}

function kérdésMegjelenítés(kérdés) {
    document.getElementById("kerdes").innerHTML = kérdések[kérdés].questionText;
    document.getElementById("1").innerHTML = kérdések[kérdés].answer1
    document.getElementById("2").innerHTML = kérdések[kérdés].answer2
    document.getElementById("3").innerHTML = kérdések[kérdés].answer3
    var kepkeret = document.getElementById("kepkeret")
    
    
    if (elementExists = document.getElementById("kep")) {
        var keptorles = document.getElementById("kep")
        keptorles.parentElement.removeChild(keptorles)
    }
    
    var kep = document.createElement("img")
    kep.setAttribute("id", "kep")
    if (kérdések[kérdés].image !== "") {
        kepkeret.appendChild(kep)
        kep.src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image
    }

    valasz1.style.backgroundColor = "#b2c2bf"
    valasz2.style.backgroundColor = "#b2c2bf"
    valasz3.style.backgroundColor = "#b2c2bf"
}

valasz1.onclick = function() {
    var valaszid = document.getElementById("1").id
    if (kérdések[kerdesszam].correctAnswer === parseInt(valaszid)) {
        valasz1.style.backgroundColor = "#99ff99"
    }
    else {
        valasz1.style.backgroundColor = "#ff9999"
    }
}

valasz2.onclick = function () {
    var valaszid = document.getElementById("2").id
    if (kérdések[kerdesszam].correctAnswer === parseInt(valaszid)) {
        valasz2.style.backgroundColor = "#99ff99"
    }
    else {
        valasz2.style.backgroundColor = "#ff9999"
    }
}

valasz3.onclick = function () {
    var valaszid = document.getElementById("3").id
    if (kérdések[kerdesszam].correctAnswer === parseInt(valaszid)) {
        valasz3.style.backgroundColor = "#99ff99"
    }
    else {
        valasz3.style.backgroundColor = "#ff9999"
    }
}

document.getElementById("vissza").onclick = function () {
    if (kerdesszam === 0)  {
        kerdesszam = ((kérdések.length) - 1)
    }
    else {
        kerdesszam--
    }    
    console.log(kerdesszam)
    kérdésMegjelenítés(kerdesszam)
}

document.getElementById("elore").onclick = function () { 
    if (kerdesszam === (kérdések.length) - 1) {
        kerdesszam = 0
    }
    else {
        kerdesszam++
    }  
    console.log(kerdesszam)
    kérdésMegjelenítés(kerdesszam)
}