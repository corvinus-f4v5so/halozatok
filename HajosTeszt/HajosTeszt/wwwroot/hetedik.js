var kerdesek;
var kep;
var correctAnswer;
var questionId
var kerdesszam

var valasz1 = document.getElementById("1")
var valasz2 = document.getElementById("2")
var valasz3 = document.getElementById("3")


//function letoltes() {
//    fetch('/question/all')
//        .then(r => r.json())
//        .then(data => {
//            kerdesszam = data.length
//            console.log("összesen " + kerdesszam)
//        })
//};

window.onload = kérdésBetöltés(10);

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
                
            }
        })
        .then(data => kérdésMegjelenítés(data))
}

function kérdésMegjelenítés(kérdés) {
    
    console.log(kérdés)
    document.getElementById("kerdes").innerHTML = kérdés.questionText;
    valasz1.innerHTML = kérdés.answer1
    valasz2.innerHTML = kérdés.answer2
    valasz3.innerHTML = kérdés.answer3
    var kepkeret = document.getElementById("kepkeret")
    
    
    if (elementExists = document.getElementById("kep")) {
        var keptorles = document.getElementById("kep")
        keptorles.parentElement.removeChild(keptorles)
    }
    
    var kep = document.createElement("img")
    kep.setAttribute("id", "kep")
    if (kérdés.image !== "") {
        kepkeret.appendChild(kep)
        kep.src = "https://szoft1.comeback.hu/hajo/" + kérdés.image
    }
    correctAnswer = kérdés.correctAnswer
    questionId = kérdés.questionId
    console.log(questionId)

    
    valasz1.style.backgroundColor = "#b2c2bf"
    valasz1.classList.add("kattinthato")
    valasz2.style.backgroundColor = "#b2c2bf"
    valasz2.classList.add("kattinthato")
    valasz3.style.backgroundColor = "#b2c2bf"
    valasz3.classList.add("kattinthato")
}

valasz1.onclick = function () {
    var valaszid = valasz1.id
    valasz1.classList.remove("kattinthato")
    if (correctAnswer === parseInt(valaszid)) {
        valasz1.style.backgroundColor = "#99ff99"
    }
    else {
    valasz1.style.backgroundColor = "#ff9999"
    }
}

valasz2.onclick = function () {
    var valaszid = valasz2.id
    valasz2.classList.remove("kattinthato")
    if (correctAnswer === parseInt(valaszid)) {
        valasz2.style.backgroundColor = "#99ff99"
    }
    else {
        valasz2.style.backgroundColor = "#ff9999"
    }
}

valasz3.onclick = function () {
    var valaszid = valasz3.id
    valasz3.classList.remove("kattinthato")
    if (correctAnswer === parseInt(valaszid)) {
        valasz3.style.backgroundColor = "#99ff99"
    }
    else {
        valasz3.style.backgroundColor = "#ff9999"
    }
}

//VISSZA
document.getElementById("vissza").onclick = function () {
    kérdésBetöltés(questionId - 1)
}

//ELŐRE
document.getElementById("elore").onclick = function () { 
    if ( questionId == kerdesszam) {
          kérdésBetöltés(1)
    }
    else {
        kérdésBetöltés(questionId + 1)
    }  
    console.log(kerdesszam)
}