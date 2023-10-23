import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const ContinueBtn = ({
  navigation,
  screenName,
  props,
  width = '100%',
  text = 'Continue',
}) => {
  return (
    <TouchableOpacity
      style={{...styles.btnContainer, width}}
      onPress={() => {
        navigation.navigate(screenName, props);
      }}>
      <Text style={styles.btnText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ContinueBtn;

const styles = StyleSheet.create({
  btnContainer: {
    height: 50,
    backgroundColor: '#3CA1FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    fontSize: 18,
  },
});
