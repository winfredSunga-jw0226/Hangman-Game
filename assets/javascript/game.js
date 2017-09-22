//Pseudocode :
//variables for - score, current word to guess, words to guess,  guesses remaining, letters guessed, valid letters (alphabet only, exclude any other keys)
var hangMan = {
  serengetiAnimals : ["porcupine","hedgehog","badger","hippopotamus","gazelle","rhinoceros","waterbuck","wildebeest","flamingo","antelope","hornbill","chameleon","babboon","buffalo","lion","monkey","tiger", "cheetah", "impala"],
  wins : 0,
  loses : 0,
  // wordsAvailableForGuessing : ['lion'],
  wordsAlreadyUsed : [],
  currentWordString : "",
  currentWordLetters : [], //this.currentWordString.split(''),
  invisibleLetters : [], // will have '_' to replace letters
  displayWord : [], //this.invisibleLetters.split('').join(' '),
  remainingGuesses : 12,
  alphabet : 'abcdefghijklmnopqrstuvwxyz'.split(''),
  lettersGuessed : [],
  displayWins : function() {
    document.querySelector("#wins").innerHTML = this.wins;  
  },
  displayLoses : function() {
    document.querySelector("#loses").innerHTML = this.loses;
  },
  addWordToUsedList : function(word) {
    this.wordsAlreadyUsed.push(word);
  },
  hideLetters : function(word) {
    var invisibleWord = "";

    for(var i = 0; i < word.length; i++) {
      invisibleWord += "_";
    }
    
    this.updateDisplayWord(invisibleWord);
    return invisibleWord;
  },
  updateDisplayWord : function(word) {
    this.displayWord = word.split('').join(' ');
  },
  pickRandomWord : function() {
    var randomWord = this.serengetiAnimals[Math.floor(Math.random() * this.serengetiAnimals.length)];

    for (var i = 0; i < 1000 ; i++) {
      if(this.wordsAlreadyUsed.length = 0) {
        this.currentWordString = randomWord;
      } else if(this.wordsAlreadyUsed.length < this.serengetiAnimals.length && this.wordsAlreadyUsed.indexOf(randomWord) === -1) {
        this.currentWordString = randomWord;  
      } else { //(this.wordsAlreadyUsed.length < this.serengetiAnimals.length && wordsAlreadyUsed.indexOf(randomWord) === 1) {
        randomWord = Math.floor(Math.random() * this.serengetiAnimals.length);
        continue;
      }
    }
    
    //each time a new word gets picked, add that word into wordsAlreadyUsed 
    this.addWordToUsedList(randomWord);

    //replace the individual letters with "_" and display on the game console
    this.displayWordToGuess(this.hideLetters(randomWord));


  },
  displayWordToGuess : function(word) {
    this.invisibleLetters = word;
    document.getElementById("current_word").innerHTML = this.displayWord;
  },
  displayRemainingGuesses : function() {
    document.getElementById("remaining_guesses").innerHTML = this.remainingGuesses;
  },
  decrementRemainingGuesses : function() {
    this.remainingGuesses--; // = this.remainingGuesses - 1;
  }
};

hangMan.displayWins();
hangMan.displayLoses();
hangMan.pickRandomWord();
//hangMan.displayWordToGuess();
hangMan.displayRemainingGuesses();
hangMan.decrementRemainingGuesses();

//hangMan.listWordsAvailableForGuessing();
console.log(hangMan.currentWordString);
console.log('random # : ' + Math.floor(Math.random() * hangMan.serengetiAnimals.length));
console.log('word already used : ' + hangMan.wordsAlreadyUsed);
console.log('invisible word : ' + hangMan.invisibleWord);
console.log('remaining guesses : ' + hangMan.remainingGuesses);

//hangMan.listWordsAvailableForGuessing();

//render the # of wins, initialize to zero -- I can just hardcode this initial value in html

// render the # of loses, initialize to zero -- I can just hardcode this initial value in html

//pick a word to guess
  //if there are words not yet guessed
    //grab a word from the list 
    //assign the picked word to a variable
    //add the word to the collection of words already used
    //use another variable for replacing individual letters with "_"

//display the word to guess but hide the letters with "_"

//capture the letters the player guesses
  //if the key pressed is not a letter of the alphabet 
    //display error message if the key is not valid
  //if the letter was already guessed, do not add it into the list of letters guessed
    //display an error message if the player guessed the same letter more than once
  // else add the guessed letter into the list 

//decrement the guesses remaining each time a letter is guessed

//display the letter if the letter guessed is correctly

//choose a new word to guess if the user guesses the word or if the # of guesses reaches 0

//Display Game Over if we run out of words to guess



