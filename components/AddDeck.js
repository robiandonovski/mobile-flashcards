import React, { Component } from 'react'
import { connect } from 'react-redux'
import { KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { submitDeck } from '../utils/api'
import { addDeck } from '../actions'
import { black, white } from '../utils/colors'
import { TextInput } from 'react-native-gesture-handler'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress, disabled=false }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}
      disabled={disabled}>
        <Text style={styles.submitBtnText}>Create deck</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  submit = () => {
    const { deckTitle } = this.state

    if(deckTitle !== ''){
      const deck = {
        title: deckTitle,
        questions: [],
      }
      const key = deckTitle.replace(' ', '_')

      this.props.dispatch(addDeck({
        [key]: deck
      }))

      this.setState(() => ({ deckTitle: '' }))

      this.toHome()

      submitDeck(deck, key)
    }
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  render() {
    const { deckTitle } = this.state

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.questionText}>
          What is the title of your new deck?
        </Text>

        <TextInput
          style={styles.textInput}
          onChangeText={(deckTitle) => this.setState({deckTitle})}
          value={deckTitle}
        />

        <SubmitBtn onPress={this.submit} disabled={deckTitle === ''} />
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
  textInput: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 10
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

export default connect()(AddDeck)