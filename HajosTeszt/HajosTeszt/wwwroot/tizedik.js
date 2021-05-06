var kerdesek;
var kep;
var correctAnswer;
var questionId;
var kerdesszam;
var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timeoutHandler;


var valasz1 = document.getElementById("1")
var valasz2 = document.getElementById("2")
var valasz3 = document.getElementById("3")



window.onload = init()

function kérdésBetöltés(id, destination) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()

            }
        }
    )
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${id}. kérdés letöltve a hot list ${destination}. helyére`)
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        });
}

function init() {
    let l = window.localStorage.getItem("lista")
    let nx = window.localStorage.getItem("next")
    if (l && nx) {
        console.log("van lista")
        console.log(nx+"a kövi kérdés")
        hotList = JSON.parse(l)
        nextQuestion = nx/*JSON.parse(nx)*/
        displayedQuestion = 0
        kérdésMegjelenítés()
    }
    else {
        for (var i = 0; i < questionsInHotList; i++) {
                let q = {
                    question: {},
                    goodAnswers : 0
                } 
                hotList[i] = q
            }

            for (var i = 0; i < questionsInHotList; i++) {
                kérdésBetöltés(nextQuestion, i);
                nextQuestion++
            }
    }

    fetch("questions/count")
        .then(result => result.text() )
        .then(n => { numberOfQuestions = parseInt(n) })
}

function kérdésMegjelenítés() {

    let kérdés = hotList[displayedQuestion].question
    document.getElementById("kerdes").innerHTML = kérdés.questionText;
    valasz1.innerHTML = kérdés.answer1
    valasz2.innerHTML = kérdés.answer2
    valasz3.innerHTML = kérdés.answer3
    var kepkeret = document.getElementById("kepkeret")

    valasz1.style.pointerEvents = "auto"
    valasz2.style.pointerEvents = "auto"
    valasz3.style.pointerEvents = "auto"


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
    timeoutHandler = setTimeout(tovabb, 3000);

    //window.localStorage.setItem("nextQ", nextQuestion)

    var valaszid = valasz1.id
    valasz1.style.pointerEvents = "none"
    valasz2.style.pointerEvents = "none"
    valasz3.style.pointerEvents = "none"
    valasz1.classList.remove("kattinthato")
    console.log(hotList[displayedQuestion].goodAnswers+1 + "x válaszolt jól erre")
    if (correctAnswer === parseInt(valaszid)) {        
        valasz1.style.backgroundColor = "#99ff99"
        hotList[displayedQuestion].goodAnswers++
        window.localStorage.setItem("lista", JSON.stringify(hotList))

        if (hotList[displayedQuestion].goodAnswers == 3) {
                kérdésBetöltés(nextQuestion, displayedQuestion)

                hotList[displayedQuestion].goodAnswers = 0;
                window.localStorage.setItem("next", nextQuestion)

            if (nextQuestion == numberOfQuestions) {
                console.log("Elfogytak a kérdések. Az 1. kérdés lesz betöltve.");
                nextQuestion = 1
            }
            else { nextQuestion++ }
            //else {
            //    console.log("nincs több kérdés")
            //    return;
            //        }
            
            
        }
    }
    else {
        valasz1.style.backgroundColor = "#ff9999"
        hotList[displayedQuestion].goodAnswers = 0
    }
}

valasz2.onclick = function () {
    timeoutHandler = setTimeout(tovabb, 3000);
    //window.localStorage.setItem("lista", JSON.stringify(hotList))
    //window.localStorage.setItem("nextQ", nextQuestion)

    var valaszid = valasz2.id
    valasz1.style.pointerEvents = "none"
    valasz2.style.pointerEvents = "none"
    valasz3.style.pointerEvents = "none"
    valasz2.classList.remove("kattinthato")    
    valasz2.classList.remove("kattinthato")
    console.log(hotList[displayedQuestion].goodAnswers+1 + "x válaszolt jól erre")
    if (correctAnswer === parseInt(valaszid)) {        
        valasz2.style.backgroundColor = "#99ff99"
        hotList[displayedQuestion].goodAnswers++
        window.localStorage.setItem("lista", JSON.stringify(hotList))

        if (hotList[displayedQuestion].goodAnswers == 3) {   
            //if (numberOfQuestions != nextquestion-1) {
                kérdésBetöltés(nextQuestion, displayedQuestion)
                hotList[displayedQuestion].goodAnswers = 0;
                window.localStorage.setItem("next", nextQuestion)
                //nextQuestion++
            if (nextQuestion == numberOfQuestions) {
                console.log("Elfogytak a kérdések.Az 1. kérdés lesz betöltve.");
                nextQuestion = 1 }
                else { nextQuestion++ }
            //}
            //else {
            //    console.log("nincs több kérdés")
            //    return;
            //}    
        }
    }
    else {
        valasz2.style.backgroundColor = "#ff9999"
        hotList[displayedQuestion].goodAnswers = 0
    }
}

valasz3.onclick = function () {
    timeoutHandler = setTimeout(tovabb, 3000);
    //window.localStorage.setItem("lista", JSON.stringify(hotList))
    //window.localStorage.setItem("nextQ", nextQuestion)


    var valaszid = valasz3.id
    valasz1.style.pointerEvents = "none"
    valasz2.style.pointerEvents = "none"
    valasz3.style.pointerEvents = "none"
    valasz3.classList.remove("kattinthato")
    
    if (correctAnswer === parseInt(valaszid)) {  
        console.log(hotList[displayedQuestion].goodAnswers+1 + "x válaszolt jól erre")
        valasz3.style.backgroundColor = "#99ff99"
        hotList[displayedQuestion].goodAnswers++
        window.localStorage.setItem("lista", JSON.stringify(hotList))

        if (hotList[displayedQuestion].goodAnswers == 3) {
            //if (numberOfQuestions != nextquestion-1) {
                kérdésBetöltés(nextQuestion, displayedQuestion)
                hotList[displayedQuestion].goodAnswers = 0;
                window.localStorage.setItem("next", nextQuestion)
            if (nextQuestion == numberOfQuestions) {
                console.log("Elfogytak a kérdések. Az 1. kérdés lesz betöltve.");
                nextQuestion = 1 }
                else { nextQuestion++ }
                //nextQuestion++
            //}
            //else {
            //    console.log("nincs több kérdés")
            //    return;
            //}
        }
    }
    else {
        valasz3.style.backgroundColor = "#ff9999"
        hotList[displayedQuestion].goodAnswers = 0
    }
}

//VISSZA
document.getElementById("vissza").onclick = vissza;

function vissza() {
    window.localStorage.setItem("next", nextQuestion)
    window.localStorage.setItem("lista", JSON.stringify(hotList))
    clearTimeout(timeoutHandler)
    displayedQuestion--
    if (displayedQuestion == (-1)) {
        displayedQuestion = 2
    }  
    kérdésMegjelenítés()
    
}

////ELŐRE
document.getElementById("elore").onclick = tovabb;
function tovabb() { 
    window.localStorage.setItem("next", nextQuestion)
    window.localStorage.setItem("lista", JSON.stringify(hotList))
    clearTimeout(timeoutHandler)
    displayedQuestion++
    if (displayedQuestion == questionsInHotList) {
          displayedQuestion = 0
    }
    kérdésMegjelenítés()
}