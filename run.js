var inquirer = require('inquirer');

const numGuesses = 8;
const wordBank = ["paraguas", "helicoptero", "ferrocarril", "piano", "escuela", "maestro"];

function getRandomWord(){
    return wordBank[Math.floor(Math.random() * wordBank.length)];
}

function Word(){
    this.word = getRandomWord().split("");
    this.guessedWords = [];
    this.printFormat = function(){
        let builder = "";
        let arrayWord = this.guessedWords;
        this.word.map(function(letter){
            if (arrayWord.includes(letter)){
                builder += letter + " ";
            } else {
                builder += "_ ";
            }
        })
        console.log(builder);
        console.log();
    };
    this.remainingGuesses = numGuesses;
}

function userChoice(obj, choice){
    if (obj.word.includes(choice)){
        obj.guessedWords.push(choice);
        console.log();
        console.log("CORRECT!")
    } else {
        console.log();
        console.log("You have ", obj.remainingGuesses, "guesses left.")
        obj.remainingGuesses--;
    }
    obj.completed = true;
    var all = true;
    obj.word.map(function(word){
        if (!obj.guessedWords.includes(word)){
            obj.completed = false;
        }
    })
    if (obj.completed) {
        console.log("Congratulations, you won!")
    }
    return obj;
}

function hangmanGame(){
    console.log("HANGMAN GAME!!! You have", numGuesses, "left.")
    var word = new Word();
    function prompt(){
        inquirer.prompt([
            {
              name: "letter",
              message: "Guess a letter:",
              type: "input"
            }
          ]).then(function(answers) {

            word = userChoice(word, answers.letter);
            word.printFormat();


            if (word.remainingGuesses <= 0){
                console.log("Runned out of guesses!")
                console.log("You have lost.");
            } else {
                if (!word.completed){
                    prompt();
                }
            }
          });
    }
    prompt();

}
hangmanGame();