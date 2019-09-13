
//Henter kanppen ind i en lokal variabel
let btn = document.querySelector("#btn");

//Tilføjer et event til knappen, så når der klikkes på knappen så går funktionen "beregner" igang
btn.addEventListener("click", beregner);


//Denne kommer uden for funktionen, fordi denne skal køre inden der bliver klikket på knappen
//Tager variablen og tilføjer en evenlisterer som går ind og validere det som er i value feltet. 
//ValidateText er en funktion som hentes neden for.
fornavn.addEventListener("keyup", function(){
    ValidateText(this);
});

efternavn.addEventListener("keyup", function(){
    ValidateText(this);
});

beloeb.addEventListener("keyup", function(){
    ValidateNumber(this);
});

//Her tjekker den om value feltet lever op til kravende og giver enten et grøn eller rød udfald.
function ValidateText(event){
if(event.value.length >= 2 && event.value.length <= 30){
    event.style.backgroundColor = "#D3FFB9";
    } else { 
    event.style.backgroundColor = "#FFB3B8";
    }   			  
} 

function ValidateNumber(event){
    if(event.value.length >= 1){
        event.style.backgroundColor = "#D3FFB9";
        } else { 
        event.style.backgroundColor = "#FFB3B8";
        }   			  
    }  



//Dette array er p.t. tomt. Det skal bruges til at gemme den løn som der bliver skrevet ind i browseren
let lonArray = [];
let skatArray = [];



//Denne funktion går igang når der klikkes på knappen
//DET ER HER ALT UDREGNING MED MERE SKER
function beregner(){

    //Henter felterne ind i variabler
    let fornavn = document.querySelector("#fornavn");
    let efternavn = document.querySelector("#efternavn");
    let beloeb = document.querySelector("#beloeb");

    let region = document.querySelector("#region");
    let msg = document.querySelector("#msg");

    let gennemsnitMsg = document.querySelector("#gennemsnit");
    let gennemsnitSkat = document.querySelector("#gennemsnit-skat");

    let total;


    //I stedet for If else. Tjekker hvad der er valgt i select.option og gange det intastede beløb med den skate takst som der er i det område
    switch(region.value){
        case "hovedstaden": 
            total = beloeb.value * 0.2;
            break;
        case "sjaeland": 
            total = beloeb.value * 0.25;
            break;
        case "syddanmark": 
            total = beloeb.value * 0.3;
            break;
        case "midtjylland": 
            total = beloeb.value * 0.35;
            break;
        case "nordjylland": 
            total = beloeb.value * 0.4;
            break;
        default: 
            total = "ukendt";
            break;
    }


    //Validering, som giver fejl besked, eller printer den ønskede tekst ud.
    if(fornavn.value.length <= 1 || fornavn.value.length >= 15) {
        msg.innerHTML = "Dit fornavn skal være minimum på 2 og max på 15 tegn";
    }
    else if(efternavn.value.length <= 1 || efternavn.value.length >=25  ) {
        msg.innerHTML = "Dit efternavn skal være minimum på 2 og max på 25 tegn";
    }
    else if( beloeb.value.length <= 0 ) {
        msg.innerHTML = "Dit beløb skal være minimum på 1";
    }
    else{
        msg.innerHTML = "Hej " + fornavn.value.charAt(0).toUpperCase() + fornavn.value.slice(1).toLowerCase() + " " + efternavn.value.charAt(0).toUpperCase() + efternavn.value.slice(1).toLowerCase()+ 
        "<br>Du bor i region " + region.value.charAt(0).toUpperCase() + region.value.slice(1).toLowerCase() + 
        "<br>Din månedelig løn er " + beloeb.value +" kr." + 
        "<br>Her af skal du betale " + total.toFixed(2) + " kr. til skat";

        
        
        //overføre det som er skrevet i løn felter over til arrayen.
        lonArray.push(parseInt(beloeb.value));

        //Skriver ud resultate fra min function 
        gennemsnitMsg.innerHTML = "Gennemsnits lønnen: "+ lonArray.reduce(resultGennemsnit) + " kr.";

        //min funktion som udregner gennemsnitslønnen
        function resultGennemsnit(total1, num1) {
            let antalIArray = lonArray.length; //Gennem antalet af elementer/argumenter i arrayen
            let sum = total1 + num1; //gemmer udregning af det totale beløb lagt sammen med det nye indtastede

            return sum /antalIArray // her udregnes gennemsnittet som returneres til funktionen.
        }

        //Her sker det samme som med løn, bare med skat istedet.
        skatArray.push(parseInt(total));
        gennemsnitSkat.innerHTML = "I gennemsnit skal der betales "+ skatArray.reduce(resultGennemsnitSkat)+" kr. til skat.";

        function resultGennemsnitSkat(total2, num2) {
            let antalIArray = lonArray.length; 
            let sum = total2 + num2; 

            return sum /antalIArray 
        }


    }



    


    //tømmer felterne for informationer.
    fornavn.value = "";
    efternavn.value = "";
    beloeb.value = "";
}


