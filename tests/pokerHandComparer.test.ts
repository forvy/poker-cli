import 'mocha';
import { expect } from 'chai';
import { Card, CardValue, CardSuit } from '../src/poker/Card';
import CardSet from '../src/poker/CardSet';
import PokerHand from '../src/poker/PokerHand';
import PokerHandComparer from '../src/poker/PokerHandComparer';

describe('PokerHandComparer', function() {
  const highCard1 = new PokerHand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Jack, CardSuit.Hearts),
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const highCard2 = new PokerHand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Ace, CardSuit.Hearts),
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const onePair1 = new PokerHand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Jack, CardSuit.Hearts),
    new Card(CardValue.Two, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const onePair2 = new PokerHand(new CardSet([
    new Card(CardValue.Ace, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Jack, CardSuit.Hearts),
    new Card(CardValue.Two, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const threeOfAKind1 = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Three, CardSuit.Hearts),
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Spades),
  ]));

  const threeOfAKind2 = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Hearts),
    new Card(CardValue.Two, CardSuit.Hearts),
    new Card(CardValue.Three, CardSuit.Spades),
    new Card(CardValue.Queen, CardSuit.Clubs),
    new Card(CardValue.Three, CardSuit.Clubs),
  ]));

  const straightLowAce = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Four, CardSuit.Clubs),
    new Card(CardValue.Ace, CardSuit.Hearts),
    new Card(CardValue.Five, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Spades),
  ]));

  const straight = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Four, CardSuit.Clubs),
    new Card(CardValue.Six, CardSuit.Hearts),
    new Card(CardValue.Five, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Spades),
  ]));

  const straightHighAce = new PokerHand(new CardSet([
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Ten, CardSuit.Clubs),
    new Card(CardValue.Ace, CardSuit.Hearts),
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Jack, CardSuit.Spades),
  ]));

  const flush1 = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Four, CardSuit.Diamonds),
    new Card(CardValue.Seven, CardSuit.Diamonds),
    new Card(CardValue.Eight, CardSuit.Diamonds),
    new Card(CardValue.Ace, CardSuit.Diamonds),
  ]));

  const flush2 = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Spades),
    new Card(CardValue.Four, CardSuit.Spades),
    new Card(CardValue.Seven, CardSuit.Spades),
    new Card(CardValue.Eight, CardSuit.Spades),
    new Card(CardValue.Ace, CardSuit.Spades),
  ]));

  const flush2LowerValue = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Spades),
    new Card(CardValue.Four, CardSuit.Spades),
    new Card(CardValue.Seven, CardSuit.Spades),
    new Card(CardValue.Eight, CardSuit.Spades),
    new Card(CardValue.Jack, CardSuit.Spades),
  ]));

  const fourOfAKind1 = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Clubs),
    new Card(CardValue.Three, CardSuit.Hearts),
    new Card(CardValue.Three, CardSuit.Spades),
    new Card(CardValue.Ace, CardSuit.Diamonds),
  ]));

  const fourOfAKind2 = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Three, CardSuit.Clubs),
    new Card(CardValue.Three, CardSuit.Hearts),
    new Card(CardValue.Three, CardSuit.Spades),
    new Card(CardValue.King, CardSuit.Diamonds),
  ]));

  const straightFlush1 = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Diamonds),
    new Card(CardValue.Four, CardSuit.Diamonds),
    new Card(CardValue.Five, CardSuit.Diamonds),
    new Card(CardValue.Two, CardSuit.Diamonds),
    new Card(CardValue.Ace, CardSuit.Diamonds),
  ]));

  const straightFlush2 = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Clubs),
    new Card(CardValue.Four, CardSuit.Clubs),
    new Card(CardValue.Five, CardSuit.Clubs),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Ace, CardSuit.Clubs),
  ]));

  const straightFlush2HigherValue = new PokerHand(new CardSet([
    new Card(CardValue.Three, CardSuit.Clubs),
    new Card(CardValue.Four, CardSuit.Clubs),
    new Card(CardValue.Five, CardSuit.Clubs),
    new Card(CardValue.Two, CardSuit.Clubs),
    new Card(CardValue.Six, CardSuit.Clubs),
  ]));

  const royalFlush1 = new PokerHand(new CardSet([
    new Card(CardValue.King, CardSuit.Diamonds),
    new Card(CardValue.Jack, CardSuit.Diamonds),
    new Card(CardValue.Queen, CardSuit.Diamonds),
    new Card(CardValue.Ten, CardSuit.Diamonds),
    new Card(CardValue.Ace, CardSuit.Diamonds),
  ]));

  const royalFlush2 = new PokerHand(new CardSet([
    new Card(CardValue.King, CardSuit.Clubs),
    new Card(CardValue.Jack, CardSuit.Clubs),
    new Card(CardValue.Queen, CardSuit.Clubs),
    new Card(CardValue.Ten, CardSuit.Clubs),
    new Card(CardValue.Ace, CardSuit.Clubs),
  ]));

  const royalFlush3 = new PokerHand(new CardSet([
    new Card(CardValue.King, CardSuit.Hearts),
    new Card(CardValue.Jack, CardSuit.Hearts),
    new Card(CardValue.Queen, CardSuit.Hearts),
    new Card(CardValue.Ten, CardSuit.Hearts),
    new Card(CardValue.Ace, CardSuit.Hearts),
  ]));

  const royalFlush4 = new PokerHand(new CardSet([
    new Card(CardValue.King, CardSuit.Spades),
    new Card(CardValue.Jack, CardSuit.Spades),
    new Card(CardValue.Queen, CardSuit.Spades),
    new Card(CardValue.Ten, CardSuit.Spades),
    new Card(CardValue.Ace, CardSuit.Spades),
  ]));

  describe('.compare()', function() {
    it('should return 1 when the left hand is winning', function() {
      expect(PokerHandComparer.compare(onePair2, onePair1)).to.be.equal(1);
      expect(PokerHandComparer.compare(threeOfAKind1, highCard2)).to.be.equal(1);
      expect(PokerHandComparer.compare(threeOfAKind2, onePair2)).to.be.equal(1);
      expect(PokerHandComparer.compare(straight, straightLowAce)).to.be.equal(1);
      expect(PokerHandComparer.compare(flush2, flush1)).to.be.equal(1);
      expect(PokerHandComparer.compare(flush2, flush2LowerValue)).to.be.equal(1);
      expect(PokerHandComparer.compare(fourOfAKind1, fourOfAKind2)).to.be.equal(1);
      expect(PokerHandComparer.compare(straightFlush2, straightFlush1)).to.be.equal(1);
      expect(PokerHandComparer.compare(straightFlush2HigherValue, straightFlush2)).to.be.equal(1);
      expect(PokerHandComparer.compare(royalFlush3, royalFlush2)).to.be.equal(1);
      expect(PokerHandComparer.compare(royalFlush4, royalFlush3)).to.be.equal(1);
    });

    it('should return 2 when the right hand is winning', function() {
      expect(PokerHandComparer.compare(highCard1, threeOfAKind1)).to.be.equal(2);
      expect(PokerHandComparer.compare(highCard1, highCard2)).to.be.equal(2);
      expect(PokerHandComparer.compare(onePair1, threeOfAKind1)).to.be.equal(2);
      expect(PokerHandComparer.compare(straight, straightHighAce)).to.be.equal(2);
      expect(PokerHandComparer.compare(flush1, flush2)).to.be.equal(2);
      expect(PokerHandComparer.compare(flush2LowerValue, flush2)).to.be.equal(2);
      expect(PokerHandComparer.compare(fourOfAKind2, fourOfAKind1)).to.be.equal(2);
      expect(PokerHandComparer.compare(straightFlush1, straightFlush2)).to.be.equal(2);
      expect(PokerHandComparer.compare(straightFlush2, straightFlush2HigherValue)).to.be.equal(2);
      expect(PokerHandComparer.compare(royalFlush1, royalFlush2)).to.be.equal(2);
      expect(PokerHandComparer.compare(royalFlush2, royalFlush3)).to.be.equal(2);
    });

    it('should return 3 when both hands are tied', function() {
      expect(PokerHandComparer.compare(threeOfAKind1, threeOfAKind2)).to.be.equal(3);
      expect(PokerHandComparer.compare(royalFlush2, royalFlush2)).to.be.equal(3);
    });
  });
});
