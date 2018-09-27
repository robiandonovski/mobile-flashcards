import { RECEIVE_DECKS, RESET, ADD_DECK, ADD_QUESTION } from '../actions'

function flashcards (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        decks: action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        decks: {...state.decks, ...action.deck}
      }
    case ADD_QUESTION :
      const { question, deckKey } = action.data
      return {
        ...state,
        decks: {
          ...state.decks,
          [deckKey]: {
              ...state.decks[deckKey],
              questions: [...state.decks[deckKey].questions, question]
          }
        }
      }
    case RESET:
      return {decks: {}}
    default :
      return state
  }
}

export default flashcards