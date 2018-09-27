export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const RESET = 'RESET'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export function resetState(){
  return {
    type: RESET
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function addCard (question, deckKey) {
  return {
    type: ADD_QUESTION,
    data: { question, deckKey },
  }
}