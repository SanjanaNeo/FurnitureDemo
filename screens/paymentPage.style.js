import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleTxt: {
    fontFamily: 'bold',
    fontSize: SIZES.xLarge,
    letterSpacing: 4,
    marginLeft: SIZES.small,
  },
  paymentInfoContainer: {
    marginVertical: 20,
  },
  paymentInfoText: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: SIZES.small,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    fontFamily: 'bold',
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});

export default styles;
