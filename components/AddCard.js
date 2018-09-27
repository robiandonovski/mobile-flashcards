import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { submitCard } from '../utils/api'
import { addCard } from '../actions'
import { black, white } from '../utils/colors'
import { TextInput } from 'react-native-gesture-handler';
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.submitBtnText}>Add card</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: `New card for ${deckTitle}`
    }
  }

  submit = () => {
    const { question, answer } = this.state
    const { deckKey } = this.props

    const newQuestion = { question, answer }

    this.props.dispatch(addCard(newQuestion, deckKey))

    this.setState(() => ({ question: '', answer: '' }))

    this.toDeckDetail()

    submitCard(newQuestion, deckKey)
  }

  toDeckDetail = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  render() {
    const { deckTitle } = this.props

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.questionText}>
          Create new question for {deckTitle}
        </Text>

        <Text>Question:</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />

        <Text>Answer:</Text>

        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />

        <SubmitBtn onPress={this.submit} />
      </KeyboardAvoidingView>
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
  iosSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})

function mapStateToProps (flashcards, { navigation }) {
  const { deckKey, deckTitle } = navigation.state.params
  return { deckKey, deckTitle }
}

export default connect(mapStateToProps)(AddCard)