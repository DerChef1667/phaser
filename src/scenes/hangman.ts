import Phaser from "phaser";

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const words = ["Test", "Baum", "Computer", "Mathematik"];
const maxGuesses = 10;

/**
 * Tauscht einen bestimmten Index
 * in einer Zeichenkette aus.
 * 
 * @param origString Zu bearbeitende Zeichenkette
 * @param replaceChar Buchstabe, der plaziert wird
 * @param index Index, an dem getauscht wird
 * @returns Ausgetauschte Zeichenkette
 */
function replaceChar(origString: string, replaceChar: string, index: number) {
  const firstPart = origString.substr(0, index);
  const lastPart = origString.substr(index + 1);

  const newString = firstPart + replaceChar + lastPart;
  return newString;
}

export class HangmanScene extends Phaser.Scene {
  private progress: Phaser.GameObjects.Text;
  private wrongLetters: Phaser.GameObjects.Text[] = [];

  private word: string;

  constructor() {
    super({ key: "HangmanScene" })
  }

  /**
   * Setzt zufällig ein neues Wort.
   */
  private setNewWord(): void {
    this.word = words[Math.floor(Math.random() * words.length)];
    this.progress.setText(this.word.split("").map((_) => "-").join(""))
  }

  /**
   * Prüfen, ob Buchstabe im gesuchten Wort vorkommt.
   * Wenn ja, wird der Platzhalter in der UI durch den 
   * Buchstaben ersetzt.
   * 
   * @param letter Zu prüfene Buchstabe
   */
  private checkSelectedLetter(letter: string): void {
    this.word.split("").forEach((letterToCheck, index) => {
      if (letter.toLowerCase() === letterToCheck.toLowerCase()) {
        const newProgress = replaceChar(this.progress.text, letter, index)
        this.progress.setText(newProgress)
      } else {
        this.wrongLetters.push(this.add.text(300 + 20 * this.wrongLetters.length, 300, letter))
      }
    });
  }

  public create() {
    this.progress = this.add.text(100, 200, "")
    this.setNewWord()
    
    letters.forEach((letter, index) => {
      const btn = this.add.text(100 + index * 20, 100, letter);
      btn.setInteractive();
      btn.on("pointerdown", () => { this.checkSelectedLetter(letter) });
    })
  }
}
