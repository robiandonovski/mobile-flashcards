import { AsyncStorage } from 'react-native'
import { formatResults, FLASHCARDS_STORAGE_KEY } from './_flashcards'

export function fetchResults () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(formatResults)
}

export function submitDeck (deck, key) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

export function submitCard (question, deckKey) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(data => {
      const decks = JSON.parse(data)
      decks[deckKey].questions.push(question);
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function resetStorage () {
  return AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
}