/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  // It displays the phrase characters on the board.
  addPhraseToDisplay() {
    const ul = $("#phrase ul");
    const splitPhrase = this.phrase.split("");
    splitPhrase.forEach(character => {
      let li = $(`<li>${character}</li>`);

      character == " "
        ? li.prop("class", "space")
        : li.prop("class", `hide letter ${character}`);

      ul.append(li);
    });
  }
  // It checks the character is there in a phrase.
  checkLetter(character) {
    return this.phrase.includes(character);
  }
  // It shows the character on the board.
  showMatchedLetter(letter) {
    $(`.${letter}`).toggleClass("hide show");
  }
}
