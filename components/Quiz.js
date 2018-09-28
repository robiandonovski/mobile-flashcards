import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { green, red, white, black } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function StandardBtn ({ label, onPress }) {
  return (
    <TouchableOpacity
      style={styles.standardButton}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>{label}</Text>
    </TouchableOpacity>
  )
}

function CorrectBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.correctButton}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Correct</Text>
    </TouchableOpacity>
  )
}

function IncorrectBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={styles.incorrectButton}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Incorrect</Text>
    </TouchableOpacity>
  )
}

function TextButton ({ label, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.textButton, style]}>{label}</Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    correctAnswers: 0,
    showAnswer: false
  }

  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: `Quiz ${deckTitle}`
    }
  }

  correctAnswer = () => {
    const { currentQuestion, correctAnswers } = this.state;

    this.setState({
      currentQuestion: currentQuestion+1,
      correctAnswers: correctAnswers+1,
      showAnswer: false
    })
  }

  incorrectAnswer = () => {
    const { currentQuestion } = this.state;

    this.setState({
      currentQuestion: currentQuestion+1,
      showAnswer: false
    })
  }

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
      showAnswer: false
    })
  }

  toDeckDetail = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { deck } = this.props
    const { questions } = deck
    const { currentQuestion, correctAnswers, showAnswer } = this.state
    const totalQuestions = questions.length
    const card = questions[currentQuestion]

    return (
      <ScrollView style={styles.container}>
        {currentQuestion === totalQuestions ?
          (
            <Fragment>
              <Text style={styles.questionText}>
                You finish the test {this.correctAnswers}
              </Text>
              <Text style={styles.questionText}>
                correct answers {correctAnswers} of {totalQuestions}
              </Text>
              <StandardBtn label={"Restart Quiz"} onPress={() => this.restartQuiz()}/>
              <StandardBtn label={"Back to Deck"} onPress={() => this.toDeckDetail()}/>
            </Fragment>
          ): (
            <Fragment>
              <Text>{currentQuestion+1}/{totalQuestions} - correct {correctAnswers}</Text>

              <Text style={styles.questionText}>
                {card.question}
              </Text>

              {showAnswer && 
                <Text style={styles.questionText}>
                {card.answer}
                </Text>
              }
              
              {!showAnswer && 
                <TextButton label={'Answer'} onPress={() => this.setState({showAnswer: true})} />}

              <CorrectBtn onPress={this.correctAnswer} />
              <IncorrectBtn onPress={this.incorrectAnswer} />
            </Fragment>
          )}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  questionText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24
  },
  standardButton: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctButton: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incorrectButton: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  textButton: {
    textAlign: 'center',
    color: red,
  }
})

function mapStateToProps (flashcards, { navigation }) {
  const { deckKey } = navigation.state.params
  const { decks } = flashcards;

  return {
    deckKey,
    deck: decks[deckKey]
  }
}

function mapDispatchToProps ({ navigation }) {
  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quiz)