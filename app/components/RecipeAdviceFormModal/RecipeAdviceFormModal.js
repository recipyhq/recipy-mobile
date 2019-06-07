import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import style from './style';
import ButtonStd from '../Buttons/ButtonStd';

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
          <ButtonStd title="Enregistrer mon avis" onPress={() => {}} />
        </View>
      </View>
    );
  }
}

export default RecipeAdviceFormModal;
