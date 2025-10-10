const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const playGame = () => {
  console.log(`
        Welcome to the Number Guessing Game!
        I am thinking of a number between 1 and 100.
        You have 5 chances to guess the correct number
  
        Please select the difficulty level:
        1. Easy(10 chances)
        2. Medium(5 chances)
        3. Hard(3 chances)
        `);
  let tries;
  rl.question('Enter your choice: ', (answer) => {
    if (answer === '1') tries = 10;
    else if (answer === '2') tries = 5;
    else if (answer === '3') tries = 3;
    else {
      console.log('Invalid choice! Exiting...');
      rl.close();
      return;
    }

    const number = Math.floor(Math.random() * 100) + 1;
    let chances = 1;

    const gameProgress = () => {
      if (chances > tries) {
        console.log(`You lost! The number was ${number}`);
        rl.close();
        return;
      }

      rl.question(
        `\nAttempt ${chances}/${tries} — Enter your guess: `,
        (answer) => {
          const guess = parseInt(answer);

          if (guess === number) {
            console.log(
              `Congratulations! You guessed the correct number in ${chances} attempts.`
            );
            chances++;
            rl.close();
          } else if (guess < number) {
            console.log(`Incorrect! The number is greater than ${guess}`);
            chances++;
            gameProgress();
          } else if (guess > number) {
            console.log(`Incorrect! The number is lesser than ${guess}`);
            chances++;
            gameProgress();
          } else {
            console.log('Invalid input! Please enter a valid number.');
            gameProgress();
          }
        }
      );
    };
    gameProgress();
  });
};

playGame();
