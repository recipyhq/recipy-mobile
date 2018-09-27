import React from 'react';
import {
  Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 24,
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,

  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#000',
    borderBottomColor: '#898989',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonsInteraction: {
    alignItems: 'center',
  },
});

const LogInScreen = () => (
  <ScrollView style={styles.container}>
    <TouchableOpacity style={styles.buttonsInteraction}>
      <Text>
          Inscription
      </Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttonsInteraction}>
      <Text>
          Mot de passe oublié ?
      </Text>
    </TouchableOpacity>
  </ScrollView>
);

export default LogInScreen;
