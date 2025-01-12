import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function HistoryScreen() {
  const bmiHistory = useSelector((state: RootState) => state.bmi.bmiHistory);

  const calculateBASFIComment = (averageScore: number) => {
    let bmiComment = '';
    let bmiColor = '#000';

    if (averageScore < 1) {
      bmiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Отсутствие ограничений.`;
      bmiColor = '#32CD32';
    } else if (averageScore <= 5) {
      bmiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Умеренные ограничения.`;
      bmiColor = '#FFA500';
    } else {
      bmiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Невозможность выполнить определенное действие. Рекомендуется консультация врача.`;
      bmiColor = '#FF6347';
    }
    
    return { bmiComment, bmiColor };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>История ваших расчётов</Text>
      <ScrollView style={styles.historyContainer}>
      <FlatList
          data={bmiHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const { bmiComment, bmiColor } = calculateBASFIComment(item.score);
            return (
              <View style={styles.itemContainer}>
                <Text style={styles.date}>
                  {new Date(item.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </Text>
                <Text style={[styles.bmi, { color: bmiColor }]}>ИМТ: {item.score}</Text>
                <Text style={styles.comment}>{bmiComment}</Text>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    marginTop: 50,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
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
  date: {
    position: 'absolute',
    right: 20,
    top: 15,
    fontSize: 16,
    color: '#666',
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
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    fontStyle: 'normal',
  },
  noHistoryText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});
