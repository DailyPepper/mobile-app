import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import notData from '../../assets/images/notData.png';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { addBasfiHistory, HistoryItem } from '@/store/basfiSlice';

export default function HistoryScreen() {
  const dispatch = useDispatch();
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);

  const loadDataFromServer = async () => {
    try {
      const response = await axios.get('http://localhost:8081/resultUser');
      if (response.data && response.data.length > 0) {
        setHistoryData(response.data);
        dispatch(addBasfiHistory(response.data));
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      alert('Ошибка при загрузке данных. Попробуйте снова позже.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadDataFromServer();
    }, [])
  );

  const calculateBASFIComment = (score: number) => {
    let basfiComment = '';
    let basfiColor = '#000';

    if (score <= 3) {
      basfiComment = `Ваш индекс BASFI: ${score.toFixed(1)}. Отсутствие ограничений.`;
      basfiColor = '#32CD32';
    } else if (score >= 4 && score <= 6) {
      basfiComment = `Ваш индекс BASFI: ${score.toFixed(1)}. Умеренные ограничения.`;
      basfiColor = '#FFA500';
    } else {
      basfiComment = `Ваш индекс BASFI: ${score.toFixed(1)}. Невозможность выполнить определенное действие. Рекомендуется консультация врача.`;
      basfiColor = '#FF6347';
    }

    return { basfiComment, basfiColor };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>История ваших расчётов</Text>
      {historyData.length > 0 ? (
        <View style={{ flex: 1, marginTop: 20 }}>
          <ScrollView>
            {historyData.slice().reverse().map((item, index) => {
              if (item.result === undefined || item.result === null) {
                return (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.comment}>Ошибка: данные отсутствуют.</Text>
                  </View>
                );
              }

              const { basfiColor } = calculateBASFIComment(item.result);
              return (
                <View key={index} style={styles.itemContainer}>
                  <Text style={styles.date}>
                    {new Date(item.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                  <Text style={[styles.basfi, { color: basfiColor }]}>
                    Ваш результат: {item.result}
                  </Text>
                  <Text style={styles.comment}>{item.comment}</Text>
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
    color: '#5dda8b',
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
  basfi: {
    fontSize: 18,
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
