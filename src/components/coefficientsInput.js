import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import ContinueBtn from './continueBtn.js';

const coefs = {
  parabolic: ['a', 'b', 'c'],
  sinusoid: ['a', 'b', 'c', 'd'],
};

const CoefficientsInput = ({route, navigation}) => {
  const [enteredCoefs, setEnteredCoefs] = useState({});
  const [error, setError] = useState('');

  const {functionChoice} = route.params;
  const functionCoefs = coefs[functionChoice];

  const onChangeCoef = (coef, value) => {
    const updatedCoefs = {...enteredCoefs};
    if (isNaN(value)) {
      setError('Value should be numeric');
      return;
    }
    updatedCoefs[coef] = Number(value);

    setEnteredCoefs(updatedCoefs);
  };

  useEffect(() => {
    if (
      Object.keys(enteredCoefs).length === functionCoefs.length &&
      Object.values(enteredCoefs).every(v => v === 0)
    ) {
      setError('All coefficients cannot be null! Please change the input');
    } else {
      setError('');
    }
  }, [enteredCoefs, functionCoefs]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Enter coefficients for {functionChoice} function
      </Text>
      <View style={styles.coefContainer}>
        {functionCoefs.map(coef => (
          <View style={styles.coef} key={coef}>
            <Text style={styles.coefIndex}>{coef}:</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={value => onChangeCoef(coef, value)}
              defaultValue={0}
              value={enteredCoefs[coef]}
              maxLength={5}
            />
          </View>
        ))}
      </View>

      {!error &&
        enteredCoefs &&
        Object.keys(enteredCoefs).length === functionCoefs.length && (
          <ContinueBtn
            navigation={navigation}
            screenName={'Interval input'}
            props={{
              coefs: enteredCoefs,
              functionChoice,
            }}
          />
        )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 130,
    padding: 24,
  },
  title: {
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 25,
    marginBottom: 40,
    textAlign: 'center',
  },
  coefContainer: {
    marginBottom: 30,
  },
  coef: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Medium',
    marginBottom: 16,
  },
  coefIndex: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    marginBottom: 12,
  },
  input: {
    width: 70,
    height: 48,
    margin: 12,
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
  errorText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
  },
});

export default CoefficientsInput;
