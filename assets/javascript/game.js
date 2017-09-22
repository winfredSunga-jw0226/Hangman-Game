var hangMan = {
  serengetiAnimals : ["porcupine","hedgehog","badger","hippopotamus","gazelle","rhinoceros","waterbuck","wildebeest","flamingo","antelope","hornbill","chameleon","babboon","buffalo","lion","monkey","tiger", "cheetah", "impala"],
  wins : 0,
  loses : 0,
  // wordsAvailableForGuessing : ['lion'],
  wordsAlreadyUsed : [],
  currentWordString : "",
  currentWordLetters : [], //this.currentWordString.split(''),
  invisibleLetters : "", // will have '_' to replace letters
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
  updateCurrentWordLetters : function() {
    this.currentWordLetters = this.currentWordString.split('');
  },
  updateInvisibleLetters : function(word) {
    this.invisibleLetters = word;
  },
  hideLetters : function(word) {
    var invisibleWord = "";

    for(var i = 0; i < word.length; i++) {
      invisibleWord += "_";
    }
    
    //update invisible letters
    this.updateInvisibleLetters(invisibleWord);

    //update display word
    this.updateDisplayWord();

    //return invisibleWord;
  },
  convertCurrentWordIntoArray : function(word) {
    this.invisibleLetters = word;
  },
  updateDisplayWord : function() {
    this.displayWord = this.invisibleLetters.split('');
  },
  pickRandomWord : function() {
    var randomWord = this.serengetiAnimals[Math.floor(Math.random() * this.serengetiAnimals.length)];

    for (var i = 0; i < 1000 ; i++) {
      if(this.wordsAlreadyUsed.length = 0) {
        this.currentWordString = randomWord;
      } else if(this.wordsAlreadyUsed.length < this.serengetiAnimals.length && this.wordsAlreadyUsed.indexOf(randomWord) === -1) {
        this.currentWordString = randomWord;  
      } else if (this.wordsAlreadyUsed.length === this.serengetiAnimals.length){
        alert("You ran out of words to guess. Game Over!");
        break;
      } else { //(this.wordsAlreadyUsed.length < this.serengetiAnimals.length && wordsAlreadyUsed.indexOf(randomWord) === 1) {
        randomWord = this.serengetiAnimals[Math.floor(Math.random() * this.serengetiAnimals.length)];
        continue;
      }
    }
    
    //convert the current word into an array
    this.convertCurrentWordIntoArray(randomWord);

    //update current word letters
    this.updateCurrentWordLetters();

    //each time a new word gets picked, add that word into wordsAlreadyUsed 
    this.addWordToUsedList(randomWord);

    //hide the letters with "_"
    this.hideLetters(randomWord);

    // display word on the game console
    this.displayWordToGuess();



  },
  displayWordToGuess : function() {
    
    document.getElementById("current_word").innerHTML = this.displayWord.join(' ');
  },
  displayGuessedLetters : function() {
    document.getElementById("letters_guessed").innerHTML = this.lettersGuessed.join(' , ');
  },
  unhideLetter : function(letter) {
    for(var i = 0; i < this.currentWordLetters.length; i++) {
      if(letter === this.currentWordLetters[i]) {
        this.displayWord[i] = letter;
        this.invisibleLetters = this.displayWord.join('');
        console.log("letter : " + letter);
        console.log("display word's type is : " + typeof(this.displayWord));
        console.log('current word letters : ' + this.currentWordLetters);
        console.log("invisible letter : " + this.invisibleLetters);
        console.log("display word : " + this.displayWord);
        console.log("does it even go in here?");
      }
    }
    //updateInvisibleLetters();
    this.updateDisplayWord();
  }
  ,
  displayRemainingGuesses : function() {
    document.getElementById("remaining_guesses").innerHTML = this.remainingGuesses;
  },
  decrementRemainingGuesses : function() {
    this.remainingGuesses--; // = this.remainingGuesses - 1;
  },
  resetLettersGuessed : function() {
    this.lettersGuessed = [];
  },
  resetRemainingGuesses : function() {
    this.remainingGuesses = 12;
  }

};

hangMan.displayWins();
hangMan.displayLoses();
hangMan.pickRandomWord();
//hangMan.displayWordToGuess();
hangMan.displayRemainingGuesses();
//hangMan.decrementRemainingGuesses();

//hangMan.listWordsAvailableForGuessing();
console.log(hangMan.currentWordString);
console.log('word already used : ' + hangMan.wordsAlreadyUsed);
console.log('invisible letters : ' + hangMan.invisibleLetters);
console.log('remaining guesses : ' + hangMan.remainingGuesses);

document.onkeyup = function(event) {
  var playerInput = event.key.toLowerCase();

  if(hangMan.alphabet.indexOf(playerInput) === -1) {
    alert("You pressed an invalid key! Please choose another letter...");
  } else if(hangMan.lettersGuessed.indexOf(playerInput) !== -1) {
    alert("You have already guessed letter " + playerInput + '. Please pick another letter!')
  } else if(hangMan.lettersGuessed.indexOf(playerInput) === -1 && hangMan.currentWordString.indexOf(playerInput) !== -1){
    hangMan.unhideLetter(playerInput);
    hangMan.displayWordToGuess();
    hangMan.lettersGuessed.push(playerInput);
    hangMan.displayGuessedLetters();
    hangMan.decrementRemainingGuesses();
    hangMan.displayRemainingGuesses();
    console.log("remaining guesses: " + hangMan.remainingGuesses)
    console.log("letters guessed : " + hangMan.lettersGuessed);
    console.log("invisible letters " + hangMan.invisibleLetters);
    console.log("display word " + hangMan.displayWord);
    hangMan.displayWordToGuess();

    //check if the player wins or not, and switch to new word
    if(hangMan.displayWord.indexOf("_") === -1 && hangMan.wordsAlreadyUsed.length !== hangMan.serengetiAnimals.length) {
      hangMan.wins++;
      hangMan.remainingGuesses = 12;
      hangMan.pickRandomWord();
      hangMan.displayWins();
      hangMan.displayLoses();
      hangMan.resetLettersGuessed();
      hangMan.resetRemainingGuesses();
      alert("You guessed the word!");
      
      //adding sound effect
      var sound = new Audio('assets/audio/lion_king_chant.mp3'); 
      sound.play();
    }
  } else if(hangMan.lettersGuessed.indexOf(playerInput) === -1 && hangMan.currentWordString.indexOf(playerInput) === -1) {
    hangMan.lettersGuessed.push(playerInput);
    hangMan.displayGuessedLetters();
    hangMan.decrementRemainingGuesses();
    hangMan.displayRemainingGuesses();
    console.log("remaining guesses: " + hangMan.remainingGuesses)
    //console.log("letters guessed : " + hangMan.lettersGuessed);

    //check if the player wins or not, and switch to new word
    if (hangMan.remainingGuesses === 0 && hangMan.wordsAlreadyUsed.length !== hangMan.serengetiAnimals.length) {
    hangMan.loses++;
    hangMan.remainingGuesses = 12;
    hangMan.pickRandomWord();
    hangMan.displayWins();
    hangMan.displayLoses();
    hangMan.resetLettersGuessed();
    hangMan.resetRemainingGuesses();
    alert("You failed to guess the word!");
    }
  }

}
  // //check if the player wins or not, and switch to new word
  // if(hangMan.displayWord.indexOf("_") === -1 && hangMan.wordsAlreadyUsed.length !== hangMan.serengetiAnimals.length) {
  //   hangMan.unhideLetter(playerInput);
  //   hangMan.lettersGuessed.push(playerInput);
  //   hangMan.displayGuessedLetters();
  //   hangMan.decrementRemainingGuesses();
  //   hangMan.displayRemainingGuesses();
  //   alert("You guessed the word!");
  //   hangMan.wins++;
  //   hangMan.remainingGuesses = 12;
  //   hangMan.pickRandomWord();
  //   hangMan.displayWins();
  //   hangMan.displayLoses();
  //   hangMan.resetLettersGuessed();
  //   hangMan.resetRemainingGuesses();
  // } else if (hangMan.remainingGuesses === 0 && hangMan.wordsAlreadyUsed.length !== hangMan.serengetiAnimals.length) {
  //   hangMan.lettersGuessed.push(playerInput);
  //   hangMan.displayGuessedLetters();
  //   hangMan.decrementRemainingGuesses();
  //   hangMan.displayRemainingGuesses();
  //   alert("You failed to guess the word!");
  //   hangMan.loses++;
  //   hangMan.remainingGuesses = 12;
  //   hangMan.pickRandomWord();
  //   hangMan.displayWins();
  //   hangMan.displayLoses();
  //   hangMan.resetLettersGuessed();
  //   hangMan.resetRemainingGuesses();
  // }


//Pseudocode :
//variables for - score, current word to guess, words to guess,  guesses remaining, letters guessed, valid letters (alphabet only, exclude any other keys)

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
    //display an alert
  //if the letter was already guessed
    // display an alert
  // else 
    //add the guessed letter into the list of letters guessed
    //if the letter guessed is correct
      //show the letter in the console

//decrement the guesses remaining each time a letter is guessed

//display the letter if the letter guessed is correctly

//choose a new word to guess if the user guesses the word or if the # of guesses reaches 0

//Display Game Over if we run out of words to guess



