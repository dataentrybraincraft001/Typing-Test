// Random quotes api Url

const quoteApiurl ="https://api.quotable.io/random?minLength=100&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 30;
let timer = "";
let mistakes = 0;

// Display Random Quotes

const renderNewQuote = async () => {
    // Fetch contents from url
    const response = await fetch(quoteApiurl);

    // Store response
    let data = await response.json();

    // Access quote
    quote = data.content;

    // array of characters in the quote
    let arr = quote.split("").map((value) =>{
        // wrap the characters in a span tag
        return "<span class ='quote-chars'>" + value + "</span>"
    });
    // join array for display
    quoteSection.innerHTML += arr.join("");
};


// Logic for comparing  input words with quote
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");

    // Create an arrat from received apan tage
    quoteChars = Array.from(quoteChars);

    // array of user input acharacters
    let userInputChars = userInput.value.split("");

    // lop throught eacj charecter in quote
    quoteChars.forEach((char, index) =>{
        // Chwck if char(quote character) = userInputChars[index](input character)
        if(char.innerText == userInputChars[index]){
            char.classList.add("success");
        }
        // if user hasn't entered anything or backspaced
        else if(userInputChars[index] == null){
            // removed class if any
            if(char.classList.contains("success")){
                char.classList.remove("success");
            }
            else{
                char.classList.remove("fail");
            }
        }
        // if user enter wrong character
        else{
            // checks if we alreasy have added fail class
            if(!char.classList.contains("fail")){
                // increment and display mistakes
                mistakes += 1;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }
        // returns ture is all the characters are entered correctly
        let check = quoteChars.every(element=>{
            return element.classList.contains("success");
        });
        // ends test if all charaters are corresct
        if(check){
            displayResult();
        }
    });

})
// updata timer on sceen
function updateTimer() {
    if (time == 0){
        // end text if timer reaches 0
        displayResult();
    }
    else{
        document.getElementById("timer").innerText = --time + "s";
    }
}

// sets timer
const timeReduce = () => {
    time = 30;
    timer = setInterval(updateTimer, 1000);
};


// end test 
const displayResult =() =>{
    // display result div
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display ="none";
    userInput.disabled = true;
    let timeTaken = 1;
    if(time != 0){
        timeTaken = (60 - time)/100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
    document.getElementById("accuracy").innerText =Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
}


// start test
const startTest = () => {
    mistakes= 0;
    timer ="";
    userInput.disabled =false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
}

window,onload= () =>{
    userInput.value= "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}