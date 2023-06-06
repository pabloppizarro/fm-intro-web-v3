console.log("Hi Wordle People");

const GET_API_URL = "https://words.dev-apis.com/word-of-the-day";
const POST_API_URL = "https://words.dev-apis.com/validate-word";
function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

// document
//     .querySelector(".tester-input")
//     .addEventListener("keydown", function (event) {
//         // uses the isLetter function from above
//         if (!isLetter(event.key)) {
//             event.preventDefault();
//         }
//     });