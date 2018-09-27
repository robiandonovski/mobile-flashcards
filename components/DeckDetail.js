import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { black, white, gray } from '../utils/colors'
import { ScrollView } from 'react-native-gesture-handler';

function Btn ({ onPress, label }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
        <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  )
}

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: deckTitle
    }
  }

  render() {
    const { deck, deckKey } = this.props

    if(!deck || typeof deck === 'undefined'){
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.noDataText}>Deck not found</Text>
        </ScrollView>
      )
    }

    return (
      <ScrollView style={styles.container}>
        <Text style={styles.deckTitleText}>{deck.title}</Text>
        <Text style={styles.questionCountText}>{deck.questions.length}</Text>

        <Btn label="Create card" onPress={() => this.props.navigation.navigate(
          'AddCard',
          { deckKey, deckTitle: deck.title }
        )} />

        <Btn label="Start a Quiz" onPress={() => this.props.navigation.navigate(
          'Quiz',
          { deckKey, deckTitle: deck.title }
        )} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
  deckTitleText: {
    flex: 1,
    textAlign: 'center',
    color: black,
    fontSize: 25,
    marginTop: 20
  },
  questionCountText: {
    flex: 1,
    textAlign: 'center',
    color: gray,
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10
  },
  noDataText: {
    flex: 1,
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
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
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
)(DeckDetail)