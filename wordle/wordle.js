console.log("Hi Wordle People");

const GET_API_URL = "https://words.dev-apis.com/word-of-the-day";
const POST_API_URL = "https://words.dev-apis.com/validate-word";

window.addEventListener("keydown", pressKeyHandler, false);
const statusTextElement = document.querySelector(".status-text");

const letters = document.querySelectorAll(".scoreboard");

const statusText = new Map();
statusText.set("LOADING", "⏳ Loading word from API...");
statusText.set("NOPE", "Nice try but, GAME OVER...");
statusText.set("TRY", "🥵 Almost, keep trying ...");
statusText.set("READY", "Ready to play, start typing");
statusText.set("WIN", "🥳🥳YEEEEY!! CONGRATS WINNER🥳🥳");

let lastWord = "";
let currentIndex = 0;
let wordOfTheDay = null;
let lastWordSet = new Set();
let lastWordMap = new Map();
fetchWordleWordOfTheDay();

async function fetchWordleWordOfTheDay() {
    showStatusText("LOADING");
    const response = await fetch(GET_API_URL).then((res) => res.json());
    console.log("WORD OF THE DAY -> ", response);
    wordOfTheDay = response.word;
    showStatusText("READY");
}

function pressKeyHandler(event) {
    // console.log(event.key);
    if (isLetter(event.key)) {
        handleLetter(event.key);
    }
    if (event.key === "Enter") {
        handleEnter();
    }
    if (event.key === "Backspace") {
        handleBackspace();
    }
}

function handleLetter(key) {
    if (lastWord.length < 5) {
        showStatusText("READY");
        render(currentIndex, key);
        lastWord += key;
        lastWordSet.add(key);
        lastWordMap.set(currentIndex, key);
        currentIndex++;
    }
}

function handleEnter() {
    if (currentIndex < 30) {
        if (lastWord.length === 5) {
            console.log("Enter here!");
            validateLetters();
            if (wordOfTheDay === lastWord) {
                handleWin();
            } else {
                //go to next letter row
                handleLose();
            }
        }
    } else {
        console.log("You probably lost eheh ");
        handleLose();
        showStatusText("NOPE");
        alert("you lose, the word was " + wordOfTheDay);
    }
}

function handleWin() {
    showStatusText("WIN");
    lastWord = "";
    currentIndex = 0;
    alert("Yea you WIN!!");
}
function handleLose() {
    showStatusText("TRY");
    // validateLetters();
    lastWord = "";
}

function handleBackspace() {
    if (lastWord.length > 0) {
        console.log("backspace");
        lastWord = lastWord.substring(0, lastWord.length - 1);
        currentIndex--;
        render(currentIndex, "");
    }
}

function render(index, value) {
    const currLetter = document.querySelector(`#letter-${index}`);
    currLetter.innerHTML = value;
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function showStatusText(keyText) {
    statusTextElement.innerText = statusText.get(keyText);
    statusTextElement.style.display = "unset";
}
function hideStatusText() {
    statusTextElement.style.visibility = "hidden";
}

function validateLetters() {
    // console.log(lastWordSet);
    // console.log(wordOfTheDay);
    let startWordCurrIndex = currentIndex - 5;
    console.log(currentIndex);
    let boardWordIndex = 0;
    for (let i = startWordCurrIndex; i < currentIndex; i++) {
        const triedWord = lastWordMap.get(i);
        if (wordOfTheDay.includes(triedWord)) {
            let wordIndex = wordOfTheDay.indexOf(triedWord);
            console.log(wordIndex);
            if (wordIndex === boardWordIndex) {
                addColorClass(i, "correct");
            } else {
                addColorClass(i, "close");
            }
        } else {
            addColorClass(i, "wrong");
        }
        boardWordIndex++;
    }
    // wordOfTheDay.split("").forEach((letter, index) => {
    //     startWordCurrIndex++;
    // });
}

// O C T A L
// S O T L A

function addColorClass(index, colorClass) {
    const currLetter = document.querySelector(`#letter-${index}`);
    currLetter.classList.add(colorClass);
}
