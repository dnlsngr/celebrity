export const getRoundMessage = (roundNumber: number) => {
  switch (roundNumber) {
    case 1:
      return "Round 1: Say as many words as you like";
    case 2:
      return "Round 2: One-word clues only";
    case 3:
      return "Round 3: No talking--act your clues out!";
    default:
      console.error(`Invalid round number ${roundNumber}`);
  }
};

export const getRoundRules = (roundNumber: number) => {
  switch (roundNumber) {
    case 1:
      return "In this round, the clue-giver can say as many words as they like to help their team guess the celebrity name, as long as they don't say the name itself.";
    case 2:
      return "In this round, the clue-giver must choose a single word as their clue for the celebrity name. If their team can't figure it out, they have to skip!";
    case 3:
      return "In this round, the clue-giver must act out clues for the celebrity name. They cannot say any words or make any sounds, or it is an illegal clue!";
    default:
      console.error(`Invalid round number ${roundNumber}`);
  }
};
