import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { LineChart } from 'react-native-chart-kit';

export default function HistoryScreen() {
  const bmiHistory = useSelector((state: RootState) => state.bmi.bmiHistory);
  const [selectedChart, setSelectedChart] = useState<'bmi' | 'temperature' | 'age'>('bmi');

  const bmiData = bmiHistory.map(item => item.bmi);
  const dates = bmiHistory.map(item => item.date);
  const temperatureData = bmiHistory.map(item => parseFloat(item.temperature) || 0);
  const ageData = bmiHistory.map(item => parseInt(item.age) || 0);

  const renderChart = () => {
    switch (selectedChart) {
      case 'bmi':
        return (
          <LineChart
            style={styles.chart}
            data={{
              labels: dates,
              datasets: [
                {
                  data: bmiData,
                  strokeWidth: 3,
                },
              ],
            }}
            width={Math.max(350, dates.length * 40)}
            height={280}
            yAxisLabel="ИМТ "
            chartConfig={{
              backgroundColor: '#1E90FF',
              backgroundGradientFrom: '#1E90FF',
              backgroundGradientTo: '#1E90FF',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              decimalPlaces: 1,
              propsForLabels: {
                fontSize: '12',
                paddingRight: 10,
              },
              style: {
                paddingRight: 20,
                paddingLeft: 20,
              },
            }}
            withVerticalLabels={true}
          />
        );
      case 'temperature':
        return (
          <LineChart
            style={styles.chart}
            data={{
              labels: dates,
              datasets: [
                {
                  data: temperatureData,
                  strokeWidth: 3,
                },
              ],
            }}
            width={Math.max(350, dates.length * 40)}
            height={280}
            yAxisLabel="°C "
            chartConfig={{
              backgroundColor: '#FF6347',
              backgroundGradientFrom: '#FF6347',
              backgroundGradientTo: '#FF6347',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              decimalPlaces: 1,
              propsForLabels: {
                fontSize: '12',
                paddingRight: 10,
              },
              style: {
                paddingRight: 20,
                paddingLeft: 20,
              },
            }}
            withVerticalLabels={true}
          />
        );
      case 'age':
        return (
          <LineChart
            style={styles.chart}
            data={{
              labels: dates,
              datasets: [
                {
                  data: ageData,
                  strokeWidth: 3,
                },
              ],
            }}
            width={Math.max(350, dates.length * 40)}
            height={280}
            yAxisLabel="Лет "
            chartConfig={{
              backgroundColor: '#32CD32',
              backgroundGradientFrom: '#32CD32',
              backgroundGradientTo: '#32CD32',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              decimalPlaces: 1,
              propsForLabels: {
                fontSize: '12',
                paddingRight: 10,
              },
              style: {
                paddingRight: 20,
                paddingLeft: 20,
              },
            }}
            withVerticalLabels={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>История расчётов ИМТ</Text>

      {bmiHistory.length === 0 ? (
        <Text style={styles.noHistoryText}>История пуста. Пожалуйста, добавьте данные.</Text>
      ) : (
        <>
          <View style={styles.chartContainer}>
            {renderChart()}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.chartButton, selectedChart === 'bmi' && styles.selectedButton]}
              onPress={() => setSelectedChart('bmi')}>
              <Text style={styles.chartButtonText}>ИМТ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chartButton, selectedChart === 'temperature' && styles.selectedButton]}
              onPress={() => setSelectedChart('temperature')}>
              <Text style={styles.chartButtonText}>Температура</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.chartButton, selectedChart === 'age' && styles.selectedButton]}
              onPress={() => setSelectedChart('age')}>
              <Text style={styles.chartButtonText}>Возраст</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.historyContainer}>
            <FlatList
              data={bmiHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.index}>Index: {index + 1}</Text>
                  <Text style={styles.bmi}>ИМТ: {item.bmi.toFixed(1)}</Text>
                  <Text style={styles.comment}>{item.comment}</Text>
                </View>
              )}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    alignItems: 'center',
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  chartButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexShrink: 0,
  },
  selectedButton: {
    backgroundColor: '#32CD32',
  },
  chartButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    flexShrink: 0,
  },
  historyContainer: {
    flex: 1,
    marginTop: 16,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  index: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bmi: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 8,
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    fontStyle: 'italic',
  },
  noHistoryText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});
