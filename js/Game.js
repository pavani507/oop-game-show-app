/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    (this.missed = 0),
      (this.phrases = this.createPhrases()),
      (this.activePhrase = null);
  }

  createPhrases() {
    const phrases = [
      new Phrase("My life is my message"),
      new Phrase("Enjoy Today"),
      new Phrase("You are Enough"),
      new Phrase("Go Wild For a While"),
      new Phrase("Live what you love")
    ];

    return phrases;
  }
  // Get the Phrase randomly from phrases object.
  getRandomPhrase() {
    var random = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[random];
  }
  // This method is used for stating the Game.
  startGame() {
    const hideStartScreen = $("#overlay");
    hideStartScreen.hide();
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }
  /* It checks to see if the onscreen keyboard button clicked by the player matches a letter in the phrase, and
then directs the game based on a correct or incorrect guess.*/
  handleInteraction(letter) {
    let guess = game.activePhrase.checkLetter(letter.text());

    if (guess === false) {
      letter.addClass("wrong");
      $(letter).prop("disabled", true);
      this.removeLife();
    } else if (guess === true) {
      letter.addClass("chosen");
      $(letter).prop("disabled", true);
      game.activePhrase.showMatchedLetter(letter.text());
      let win = game.checkForWin();
      if (win === true) {
        let isWon = true;
        this.gameOver(isWon);
      }
    }
  }
  // It is checks the all phrase letters active or inactive on the board.
  checkForWin() {
    const isActive = document.getElementsByClassName("hide");
    if (isActive.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  // Remove liveHeart.png to lostHeart.png.
  removeLife() {
    // it select first image element that matches the 'img[src='images/liveHeart.png']'.
    const heartLose = document.querySelector("img[src='images/liveHeart.png']");
    this.missed += 1;
    heartLose.src = "images/lostHeart.png";
    if (this.missed > 4) {
      let isWon = false;
      this.gameOver(isWon);
    }
  }

  // It displays the winning status.
  gameOver(isWon) {
    const overlay = $("#overlay");
    const displayMessage = $("#game-over-message");

    if (isWon === true) {
      overlay.addClass("win");
      overlay.css({ background: "#78CF82" });
      displayMessage.text("Great JOb!");
      overlay.show();
    } else if (isWon === false) {
      overlay.addClass("lose");
      overlay.css({ background: "#FF8C00" });
      displayMessage.text("Nice try! Play again?");
      overlay.show();
    }
    this.gameReset();
  }

  // Reset Game.
  gameReset() {
    //Remove all li elements form phrase
    let removePhrases = document.querySelectorAll("ul li");
    removePhrases.forEach(liPhrase => liPhrase.remove());
    //Reset liveHeart.png.
    let resetHeartLife = document.querySelectorAll(
      "img[src='images/lostHeart.png']"
    );
    resetHeartLife.forEach(
      heartLife => (heartLife.src = "images/liveHeart.png")
    );
    // Reset missed value to zero
    this.missed = 0;
    //Remove a disabled attribute from the buttons and remove wrong and chosen classes from the buttons.
    $(".key").each(function(index, item) {
      $(item).removeAttr("disabled");
      $(item).removeClass("wrong chosen");
    });
  }
}
