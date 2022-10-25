export const defaultHangMan = {
   word: "",
   length: 0,
   correctGuesses: ["-", " ", "."],
   incorrectGuesses: [""],
   lives: 5,
   gameOver: "no",
};

export type hangManType = {
   word: string;
   length: number;
   correctGuesses: string[];
   incorrectGuesses: string[];
   lives: number;
   gameOver: string;
};

export const createIncorrectDisplay = (guesses: string[]) => {
   const displayText = guesses
      .map((elem) => ` ${elem.toUpperCase()} `)
      .join("");

   return displayText;
};

export const createDisplayText = (word: string, correctGuesses: string[]) => {
   let displayText = "";
   for (let i = 0; i < word.length; i += 1) {
      if (
         correctGuesses.filter((elem) => elem === word[i].toLowerCase())
            .length >= 1
      ) {
         displayText += word[i];
      } else {
         displayText += "_";
      }
      displayText += " ";
   }
   return displayText.toUpperCase();
};

export function guessALetter(input: string, state: hangManType) {
   if (!/[a-zA-Z1-9]/.test(input) || input.length > 1) {
      return state;
   }
   if (state.gameOver === "win" || state.gameOver === "lose") {
      return state;
   }

   const letter = input.toLowerCase();

   let previouslyGuessed = false;

   state.correctGuesses.forEach((elem) => {
      if (elem === letter) {
         previouslyGuessed = true;
      }
   });
   state.incorrectGuesses.forEach((elem) => {
      if (elem === letter) {
         previouslyGuessed = true;
      }
   });

   if (previouslyGuessed) {
      return state;
   }

   const correctGuesses = state.correctGuesses.slice(0);
   const incorrectGuesses = state.incorrectGuesses.slice(0);
   let { lives } = state;
   let { gameOver } = state;

   let correct = false;
   for (let i = 0; i < state.word.length; i += 1) {
      if (letter === state.word[i].toLowerCase()) {
         correct = true;
         break;
      }
   }

   if (correct) {
      correctGuesses.push(letter);
   } else {
      incorrectGuesses.push(letter);
      lives -= 1;
   }

   if (lives <= 0) {
      gameOver = "lose";
   }

   let winCheck = 0;
   for (let i = 0; i < state.word.length; i += 1) {
      if (
         correctGuesses.filter((elem) => elem === state.word[i].toLowerCase())
            .length >= 1
      ) {
         winCheck += 1;
      }
   }
   if (winCheck >= state.word.length) {
      gameOver = "win";
   }

   const updatedState = {
      word: state.word,
      length: state.length,
      correctGuesses,
      incorrectGuesses,
      lives,
      gameOver,
   };

   return updatedState;
}
