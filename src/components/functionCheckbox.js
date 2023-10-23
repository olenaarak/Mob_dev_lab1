import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ContinueBtn from './continueBtn.js';

const functionChoices = ['parabolic', 'sinusoid'];

const FunctionCheckbox = ({navigation}) => {
  const [selected, setSelection] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose function type</Text>
      <View style={styles.funcContainer}>
        {functionChoices.map(functionChoice => (
          <View style={styles.checkboxContainer} key={functionChoice}>
            <CheckBox
              boxType="square"
              onFillColor="#3CA1FF"
              onCheckColor="#fff"
              onTintColor="#3CA1FF"
              value={selected === functionChoice}
              onValueChange={value =>
                setSelection(value ? functionChoice : null)
              }
              style={styles.checkbox}
            />
            <Text style={styles.label}>{functionChoice}</Text>
          </View>
        ))}
      </View>
      {selected && (
        <ContinueBtn
          navigation={navigation}
          screenName={'Coefficients input'}
          props={{
            functionChoice: selected,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 12,
  },
  funcContainer: {
    marginBottom: 40,
  },
  label: {
    textTransform: 'capitalize',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: '#646464',
  },
  title: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default FunctionCheckbox;
