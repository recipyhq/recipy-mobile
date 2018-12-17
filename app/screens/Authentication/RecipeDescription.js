import React from 'react';
import {
  Text, SectionList, ScrollView, Image, View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

const style = EStyleSheet.create({
  // Section Title
  sectionTitle: {
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 10,
    margin: 12,
    borderBottomWidth: 0.2,
    borderBottomColor: colors.veryLightGrey,
    textAlign: 'center',
  },

  sectionTitleBorder: {
    fontSize: 20,
    paddingTop: 10,
    textAlign: 'center',
    borderRadius: 2,
    borderTopWidth: 0.5,
    borderColor: '#d6d7da',
  },

  sectionStep: {
    fontSize: 15,
    paddingTop: 10,
    color: colors.primaryOrange,
  },

  // Section Text
  sectionText: {
    paddingLeft: 20,
  },

  pageTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  information: {
    fontSize: 30,
    color: colors.primaryOrange,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 15,
    marginBottom: 10,
    borderRightWidth: 0.5,
  },

  informationEnd: {
    fontSize: 30,
    color: colors.primaryOrange,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 15,
    marginBottom: 15,
  },

  imageStyle: {
    width: 200,
    height: 200,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: '21%',
  },
});

const RecipeDescription = () => (
  <View style={{ backgroundColor: colors.primaryWhite }}>
    <ScrollView style={{ backgroundColor: colors.primaryWhite, marginBottom: 68 }}>
      <Text style={style.pageTitle}>
            Welsh de Gros
      </Text>
      <Image
        source={{ uri: 'http://leflobart-leportel.fr/wp-content/uploads/2016/08/welsh.png' }}
        style={style.imageStyle}
      />
      <View style={{ flexDirection: 'row' }}>
        <Text style={style.information}>
             25 min
        </Text>
        <Text style={style.information}>
              Facile
        </Text>
        <Text style={style.informationEnd}>
              Pour 4
        </Text>
      </View>
      <SectionList
        sections={[
          { title: 'Ingrédients', data: ['-1000g de Cheddar', '-4 grosses tranches de pain', '-4 tranches de jambon', '-2 cuillères de moutarde', '-1 verre de bière blonde', '-Poivre'] },
          { title: 'Matériel', data: ['-Casserole', '-Four', '-Cuillère en bois/plastique', '-Grille pain'] },
        ]}
        renderItem={({ item }) => <Text style={style.sectionText}>{item}</Text>}
        renderSectionHeader={
               ({ section }) => <Text style={style.sectionTitle}>{section.title}</Text>
             }
        keyExtractor={(item, index) => index}
      />
      <Text style={style.sectionTitle}>
           Préparation
      </Text>
      <SectionList
        sections={[
          { title: 'Etape 1:', data: ['-Dans une grille pain ou au four, faire griller les tranches de pains, les poser dans un plat avec la tranche de jambon par dessus'] },
          { title: 'Etape 2:', data: ['-Faire chauffer la bière dans une casserole'] },
          { title: 'Etape 3:', data: ['-Ajouter le Cheddar au fur et à mesure et mélanger sans cesse. Ajouter la moutarde et le poivre'] },
          { title: 'Etape 4:', data: ['-Mélanger jusqu\'à obtenir un texture homogène'] },
          { title: 'Etape 5:', data: ['-Faire couler le cheddar fondu sur chaque tranche de pain'] },
          { title: 'Etape 6:', data: ['-Enfourner 15 minutes à 200 degrès en chaleur tournante !'] },
        ]}
        renderItem={({ item }) => <Text style={style.sectionText}>{item}</Text>}
        renderSectionHeader={
               ({ section }) => <Text style={style.sectionStep}>{section.title}</Text>
            }
        keyExtractor={(item, index) => index}
      />
    </ScrollView>
  </View>
);

export default RecipeDescription;
