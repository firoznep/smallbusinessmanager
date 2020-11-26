import {StyleSheet} from 'react-native';
import {colors} from '../colors/colors';

export const styles = StyleSheet.create({
  basicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
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
  },

  crud: {
    backgroundColor: 'red',
    borderWidth: 0,
    minWidth: 70,
    height: '45%',
  },

  childItem: {
    margin: 5,
    borderLeftWidth: 1,
    borderLeftColor: colors.fbBlue,
    paddingLeft: 5,
  },

  dateInItems: {
    // textAlign: 'right',
    // width: '100%',
    color: colors.fbBlue,
  },

  flatItemSeparator: {
    height: 3,
    width: '100%',
    backgroundColor: colors.phGray,
    alignSelf: 'center',
  },

  homeItems: {margin: 10, padding: 10, backgroundColor: 'white', elevation: 5},

  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 8,
  },

  itemMainChild: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  subChildItem: {color: colors.phGray},

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  underlineText: {
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    marginLeft: 5,
  },

  whiteBtn: {
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
});
