import EStylesheet from 'react-native-extended-stylesheet';
import colors from '../../config/colors';

const styles = EStylesheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    display: 'flex',
  },
  imageContainer: {
    padding: 15,
  },
  authorImage: {
    width: 100,
    height: 100,
  },
  adviceContentContainer: {
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    color: colors.primaryWhite,
    fontWeight: 'bold',
  },
  adviceDate: {
    fontSize: 14,
    color: colors.lightGrey,
  },
  adviceText: {
    fontSize: 15,
    color: colors.primaryWhite,
  },
});

export default styles;
