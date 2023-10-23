import React from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Plot = ({xValues, yValues}) => {
  return (
    <View>
      <LineChart
        data={{
          labels: xValues,
          datasets: [
            {
              data: yValues,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        style={styles.chart}
        chartConfig={{
          backgroundColor: '#72bcd4',
          backgroundGradientFrom: '#3CA1FF',
          backgroundGradientTo: '#3CA1FF',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => '#ECEFF1',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 4,
    borderRadius: 16,
  },
});

export default Plot;
