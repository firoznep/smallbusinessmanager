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
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.fbBlue,
    marginVertical: 5,
    justifyContent: 'center',
    // width: '50%',
  },
  roundBtn: {
    position: 'absolute',
    right: 45,
    bottom: 55,
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: 'yellow',
    borderWidth: 0,
    elevation: 10,
    zIndex: 99,
  },

  renderItemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.phGray,
  },

  item: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    // elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: colors.white,
  },

  crud: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
    height: '45%',
  },
});
