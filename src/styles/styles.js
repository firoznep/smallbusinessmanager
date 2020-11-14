import {StyleSheet} from 'react-native';
import {colors} from '../colors/colors';

export const styles = StyleSheet.create({
  basicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },

  underlineText: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginLeft: 5,
  },

  baslicBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.fbBlue,
    marginVertical: 5,
    paddingHorizontal: 15,
  },

  btnText: {
    // fontSize: 1,
    fontWeight: 'bold',
  },

  renderItemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.phGray,
  },
});
