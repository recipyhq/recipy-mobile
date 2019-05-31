import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import style from './style';

class RecipeAdviceFormModal extends Component {
  render() {
    return (
      <View style={style.background}>
        <View style={style.container}>
          <Text style={style.modalTitle}>Laisser un avis</Text>
          <Input
            placeholder="0/10"
            inputStyle={style.input}
          />
          <Input
            placeholder="Commentaire de la recette"
            inputStyle={style.input}
          />
        </View>
      </View>
    );
  }
}

export default RecipeAdviceFormModal;
