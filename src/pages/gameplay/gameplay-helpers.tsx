export const getRoundMessage = (roundNumber: number) => {
  switch (roundNumber) {
    case 1:
      return 'Round 1: Say as many clues as you like';
    case 2:
      return 'Round 2: One-word clues only';
    case 3:
      return 'Round 3: No talking--act your clues out!';
    default:
      console.error(`Invalid round number ${roundNumber}`)
  }
}