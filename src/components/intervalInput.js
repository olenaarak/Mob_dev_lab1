import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import ContinueBtn from './continueBtn.js';

const IntervalInput = ({route, navigation}) => {
  const [interval, setInterval] = useState({});
  const [intervalAmount, setIntervalAmount] = useState(1);
  const [errors, setErrors] = useState({});

  const onChangePoint = (point, value) => {
    if (isNaN(value)) {
      setErrors({
        ...errors,
        intervalError: 'Value should be numeric!',
      });
      return;
    }

    const updatedInterval = {...interval};
    updatedInterval[point] = Number(value) || 0;

    if (
      updatedInterval.start &&
      updatedInterval.end &&
      updatedInterval.start > updatedInterval.end
    ) {
      setErrors({
        ...errors,
        intervalError: 'Incorrect inteval. Start value should be less than end',
      });
      return;
    }

    if (errors.intervalError) {
      setErrors({
        ...errors,
        intervalError: '',
      });
    }
    setInterval(updatedInterval);
  };

  const onChangeStepsCount = value => {
    if (isNaN(value)) {
      setErrors({
        ...errors,
        subintervalAmountError: 'Value should be numeric!',
      });
      return;
    }
    if (value < 1) {
      setErrors({
        ...errors,
        subintervalAmountError: 'Minimum interval amount is 1!',
      });
      return;
    }
    if (errors.subintervalAmountError) {
      setErrors({
        ...errors,
        subintervalAmountError: '',
      });
    }

    setIntervalAmount(Number(value) || 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Enter interval and amount of subintervals for integral calculation
      </Text>

      <View style={styles.coef} key="start">
        <Text style={styles.inputTitle}>Start point:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => onChangePoint('start', value)}
          value={interval.start}
          maxLength={10}
        />
      </View>

      <View style={styles.coef} key="end">
        <Text style={styles.inputTitle}>End point:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => onChangePoint('end', value)}
          value={interval.end}
          maxLength={10}
        />
      </View>

      <View style={styles.coef} key="subinterval">
        <Text style={styles.inputTitle}>Amount of subintervals:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={value => onChangeStepsCount(value)}
          value={intervalAmount}
          maxLength={5}
        />
      </View>

      {!Object.values(errors).some(err => err) &&
        interval &&
        intervalAmount &&
        Object.keys(interval).length === 2 && (
          <ContinueBtn
            navigation={navigation}
            screenName={'Integral calculator'}
            props={{
              interval,
              intervalAmount,
              ...route.params,
            }}
          />
        )}
      {Object.values(errors).some(err => err) && (
        <Text style={styles.errorText}>
          {errors.intervalError || errors.subintervalAmountError}
        </Text>
      )}
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
  inputTitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    marginBottom: 12,
  },
  coef: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
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

export default IntervalInput;
