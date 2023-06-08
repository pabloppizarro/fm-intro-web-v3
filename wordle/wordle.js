console.log("Hi Wordle People");

const GET_API_URL = "https://words.dev-apis.com/word-of-the-day";
const POST_API_URL = "https://words.dev-apis.com/validate-word";
const ANSWER_LENGTH = 5;
const ROUNDS = 6;
window.addEventListener("keydown", pressKeyHandler, false);
const statusTextElement = document.querySelector(".status-text");

const letters = document.querySelectorAll(".scoreboard-letter");

const statusText = new Map();
statusText.set("LOADING", "⏳ Loading word from API...");
statusText.set("NOPE", "Nice try but, GAME OVER...");
statusText.set("TRY", "🥵 Almost, keep trying ...");
statusText.set("READY", "Ready to play, start typing");
statusText.set("WIN", "🥳🥳YEEEEY!! CONGRATS WINNER🥳🥳");

let lastWord = "";
let currentIndex = 0;
let wordOfTheDay = null;
//Brian variables:
let wordsOfTheDayParts = "";
let done = false;
let currentRow = 0;
//

fetchWordleWordOfTheDay();

async function fetchWordleWordOfTheDay() {
    showStatusText("LOADING");
    const response = await fetch(GET_API_URL).then((res) => res.json());
    // console.log("WORD OF THE DAY -> ", response);
    wordOfTheDay = response.word.toUpperCase();
    wordsOfTheDayParts = wordOfTheDay.split("");
    showStatusText("READY");
}

function pressKeyHandler(event) {
    // console.log(event.key);
    if (done) return;
    if (isLetter(event.key)) {
        handleLetter(event.key.toUpperCase());
    } else if (event.key === "Enter") {
        handleEnter();
    } else if (event.key === "Backspace") {
        handleBackspace();
    } else {
        // do nothing
    }
}

function handleLetter(key) {
    if (lastWord.length < ANSWER_LENGTH) {
        lastWord += key;
        showStatusText("READY");
        currentIndex++;
    } else {
        lastWord = lastWord.substring(0, lastWord.length - 1) + key;
    }
    letters[ANSWER_LENGTH * currentRow + lastWord.length - 1].innerText = key;
}

async function handleEnter() {
    if (lastWord.length !== ANSWER_LENGTH) return;
    showStatusText("LOADING");
    const res = await fetch(POST_API_URL, {
        method: "POST",
        body: JSON.stringify({ word: lastWord }),
    });
    const validWord = await res.json().then((r) => r.validWord);
    if (!validWord) {
        markInvalidWord();
        showStatusText("READY");
        return;
    }
    //Brian solution... he said that this took him a few iterations to get a more precise solution.
    const splitCurrentWord = lastWord.split("");
    const map = makeMap(wordsOfTheDayParts);
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        if (splitCurrentWord[i] === wordsOfTheDayParts[i]) {
            const currIndex = currentRow * ANSWER_LENGTH + i;
            addColorClass(currIndex, "correct");
            map[splitCurrentWord[i]]--;
        }
    }

    for (let i = 0; i < ANSWER_LENGTH; i++) {
        const currIndex = currentRow * ANSWER_LENGTH + i;
        if (splitCurrentWord[i] === wordsOfTheDayParts[i]) {
            //do nothing
        } else if (
            wordsOfTheDayParts.includes(splitCurrentWord[i]) &&
            map[splitCurrentWord[i]] > 0
        ) {
            addColorClass(currIndex, "close");
            map[splitCurrentWord[i]]--;
        } else {
            addColorClass(currIndex, "wrong");
        }
    }
    currentRow++;
    showStatusText("READY");
    if (lastWord === wordOfTheDay) {
        statusTextElement.classList.add("rainbow");
        document.querySelector(".main-title").classList.add("rainbow");
        showStatusText("WIN");
        // alert("Yea you WIN!!");
        done = true;
    } else if (currentRow === ROUNDS) {
        showStatusText("NOPE");
        alert("you lose, the word was " + wordOfTheDay);
        done = true;
    }
    lastWord = "";
}
function markInvalidWord() {
    for (let i = 0; i < ANSWER_LENGTH; i++) {
        const currIndex = currentRow * ANSWER_LENGTH + i;
        letters[currIndex].classList.remove("invalid");
        setTimeout(() => {
            addColorClass(currIndex, "invalid");
        }, 10);
    }
}

function handleBackspace() {
    lastWord = lastWord.substring(0, lastWord.length - 1);
    letters[ANSWER_LENGTH * currentRow + lastWord.length].innerText = "";
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

function makeMap(array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        if (obj[letter]) {
            obj[letter]++;
        } else {
            obj[letter] = 1;
        }
    }
    return obj;
}

function addColorClass(index, colorClass) {
    letters[index].classList.add(colorClass);
    // currLetter.classList.add(colorClass);
}
