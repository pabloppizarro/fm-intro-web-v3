console.log("Hi Wordle People");

const GET_API_URL = "https://words.dev-apis.com/word-of-the-day";
const POST_API_URL = "https://words.dev-apis.com/validate-word";

window.addEventListener("keydown", pressKeyHandler, false);
const statusTextElement = document.querySelector(".status-text");

const statusText = new Map();
statusText.set("LOADING", "⏳ Loading word from API...");
statusText.set("NOPE", "Nice try but, GAME OVER...");
statusText.set("TRY", "🥵 Almost, keep trying ...");
statusText.set("READY", "Ready to play, start typing");
statusText.set("WIN", "🥳🥳YEEEEY!! CONGRATS WINNER🥳🥳");

let lastWord = "";
let currentIndex = 0;
let wordOfTheDay = null;
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
        lastWordMap.set(currentIndex, key);
        // console.log(lastWordMap);
        currentIndex++;
    }
}

function handleEnter() {
    if (currentIndex < 30) {
        if (lastWord.length === 5) {
            console.log("Enter here!");
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
    validateLetters(lastWord, wordOfTheDay);
    lastWord = "";
    lastWordMap = new Map();
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

function validateLetters(lastWord, wordOfTheDay) {
    // console.log(lastWordMap);
    // console.log(wordOfTheDay);
    console.log(currentIndex);
    wordOfTheDay.split("").forEach((letter, index) => {
        if (lastWordMap.has(letter)) {
            const index = lastWordMap.get(letter);
            addColorClass(index, "close");
        } else {
            addColorClass(index, "wrong");
        }
    });
}

// O C T A L
// S O T L A

function addColorClass(index, colorClass) {
    const currLetter = document.querySelector(`#letter-${index}`);
    currLetter.classList.add(colorClass);
}
