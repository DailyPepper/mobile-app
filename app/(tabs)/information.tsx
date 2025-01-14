import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import notData from '../../assets/images/notData.png';
import { RootState } from '@/store/store';

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
      {bmiHistory.length > 0 ? (
        <View style={{ flex: 1, marginTop: 20 }}>
          <ScrollView>
            {bmiHistory.map((item, index) => {
              const { bmiComment, bmiColor } = calculateBASFIComment(item.score);
              return (
                <View key={index} style={styles.itemContainer}>
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
            })}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.notDataContainer}>
          <Image source={notData} style={{ width: 150, height: 150 }} />
          <Text style={styles.notData}>Нет данных</Text>
        </View>
      )}
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
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
  date: {
    position: 'absolute',
    right: 20,
    top: 15,
    fontSize: 16,
    color: '#666',
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
  notDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150,
    gap: 20,
  },
  notData: {
    fontSize: 20,
    color: '#777',
    textAlign: 'center',
  },
});
