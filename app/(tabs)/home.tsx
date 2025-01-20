import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import notData from '../../assets/images/notData.png';
import { useFocusEffect } from 'expo-router';
import { addBasfiHistory } from '@/store/basfiSlice';
import axios from 'axios';
import { RootState } from '@/store/store';

export default function HomeScreen() {
  const historyData = useSelector((state: RootState) => state.basfi.basfiHistory);
  const dispatch = useDispatch();

  const loadDataFromServer = async () => {
    try {
      const response = await axios.get('https://c29ad3f1105849cc.mokky.dev/resultUser');
      if (response.data && response.data.length > 0) {
        const formattedData = response.data.map((item: any) => ({
          score: item.result,
          comment: item.comment,
          date: item.date,
        }));

        const newData = formattedData.filter(
          (item: { date: string; }) => !historyData.some((existing) => existing.date === item.date)
        );

        if (newData.length > 0) {
          dispatch(addBasfiHistory([...historyData, ...newData]));
        }
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      alert('Ошибка при загрузке данных. Попробуйте снова позже.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (historyData.length === 0) {
        loadDataFromServer();
      }
    }, [historyData])
  );

  const calculateBASFIComment = (averageScore?: number) => {
    let basfiComment = 'Данные отсутствуют.';
    let basfiColor = '#777';

    if (averageScore !== undefined) {
      if (averageScore <= 3) {
        basfiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Отсутствие ограничений.`;
        basfiColor = '#32CD32';
      } else if (averageScore >= 4 && averageScore <= 6) {
        basfiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Умеренные ограничения.`;
        basfiColor = '#FFA500';
      } else {
        basfiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Невозможность выполнить определенное действие. Рекомендуется консультация врача.`;
        basfiColor = '#FF6347';
      }
    }

    return { basfiComment, basfiColor };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>История ваших расчётов</Text>
      {historyData.length > 0 ? (
        <View style={{ flex: 1, marginTop: 20 }}>
          <ScrollView>
            {historyData
              .slice()
              .reverse()
              .map((item, index) => {
                const { basfiComment, basfiColor } = calculateBASFIComment(item.score);
                return (
                  <View key={index} style={styles.itemContainer}>
                    <Text style={styles.date}>
                      {item.date
                        ? new Date(item.date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Дата отсутствует'}
                    </Text>
                    <Text style={[styles.basfi, { color: basfiColor }]}>
                      {item.score !== undefined ? `Ваш результат: ${item.score}` : 'Результат отсутствует'}
                    </Text>
                    <Text style={styles.comment}>{item.comment || basfiComment}</Text>
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
