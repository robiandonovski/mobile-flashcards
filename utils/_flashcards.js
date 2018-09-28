import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'mobile-flashcards:decksStorage'

function setStarterData () {
  const starterData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(starterData))

  return starterData
}

export function formatResults (results) {
  return results === null
    ? setStarterData()
    : JSON.parse(results)
}