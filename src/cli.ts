#!/usr/bin/env node

import * as program from 'commander';
import Parser from './parser';

// Default CLI
program
  .name('poker-cli')
  .description("Poker card Game using CLI. Use '-f' to learn more about expected hand format specifications.")
  .option('-f, --format', "output specification for expected hand format in commands")
  .on('option:format', function() {
    // Output specification for expected hand format in commands when '-f' is specified
    console.log(`Hands should be formatted as a string of cards (e.g. "KS 2H 5C JD TD").
  
        Specifications:
        - Card separator = 1 space.
        - 5 cards of 2 characters each.
          - 1st character = value. Valid characters: 2, 3, 4, 5, 6, 7, 8, 9, T(en), J(ack), Q(ueen), K(ing), A(ce).
          - 2nd character = suit. Valid characters: S(pades), H(earts), C(lubs), D(iamonds).\n`);
  })
  .on('--help', function() {
    // Append example usage to '-h' output
    console.log(`
  Examples:
    poker-cli compare "TS JS QS KS AS" "KS 2H 2D JD TD" "JS JH JC JD TD"
    poker-cli winner "KS 2H 2D JD TD" "JS JH JC JD TD" "TS JS QS KS AS" "6S 2H 5C 3D 4D"`);
  })
  .on('command:*', function() {
    // Display help when using unknown commands
    console.error(`Unknown command: ${program.args.join(' ')}`);
    console.error("Use '-h' to see usage.");
  })

// Compare one hand to several hands
program
  .command('compare <yourHand> <opponentHands...>')
  .description("compare your hand with one or several opponent hands")
  .action(function(yourHand: string, opponentHands: string[]) {
    try {
      const you = Parser.parse(yourHand);
      for (let opponentHand of opponentHands) {
        const opponent = Parser.parse(opponentHand);
        you.compareWith(opponent);
        console.log();
      }
    }
    catch (e) {
      console.error(e.message);
    }
  });

// Find the winner out of several hands
program
  .command('winner <hands...>')
  .description("compare two or more hands (for example, all hands on a table) to determine which one wins")
  .action(function(hands: string[]) {
    if (hands.length < 2) {
      console.error("You need to provide at least 2 hands for the 'winner' command to work.");
      console.error("Use '-h' to see usage.");
      process.exitCode = 1;
    }
    else {
      try {
        let first = Parser.parse(hands[0]);
        for (let i = 1; i < hands.length; i++) {
          const opponent = Parser.parse(hands[i]);
          let result = first.compareWith(opponent);
          if (result === 2) {
            first = opponent;
            console.log(`New winning hand: ${opponent}`);
          }
          console.log();
        }
        console.log(`Winning hand: ${first}.`);
      }
      catch (e) {
        console.error(e.message);
      }
    }
  });

// Display help immediately if no arguments were provided
if (process.argv.length <= 2) {
  program.help();
}

// Parse argv and execute CLI actions
program.parse(process.argv);
