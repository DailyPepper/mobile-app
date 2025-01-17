import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import notData from '../../assets/images/notData.png';
import { RootState } from '@/store/store';

export default function HistoryScreen() {
  const basfiHistory = useSelector((state: RootState) => state.basfi.basfiHistory);
  // const [savedHistory, setSavedHistory] = useState<any[]>([]); // Состояние для сохраненной истории из Firebase
  
  // // Функция для загрузки данных из Firebase
  // const loadDataFromFirebase = async () => {
  //   try {
  //     const snapshot = await firestore().collection('userData').get();
  //     const firebaseHistory = snapshot.docs.map(doc => doc.data());
  //     setSavedHistory(firebaseHistory);
  //   } catch (error) {
  //     console.error('Error loading data from Firebase: ', error);
  //   }
  // };
  

  // // Загружаем данные при монтировании компонента
  // useEffect(() => {
  //   loadDataFromFirebase();
  // }, []);
  
  const calculateBASFIComment = (averageScore: number) => {
    let basfiComment = '';
    let basfiColor = '#000';

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

    return { basfiComment, basfiColor };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>История ваших расчётов</Text>
      {basfiHistory.length > 0 ? (
        <View style={{ flex: 1, marginTop: 20 }}>
          <ScrollView>
            {(basfiHistory).map((item, index) => {
              const { basfiComment, basfiColor } = calculateBASFIComment(item.score);
              return (
                <View key={index} style={styles.itemContainer}>
                  <Text style={styles.date}>
                    {new Date(item.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Text>
                  <Text style={[styles.basfi, { color: basfiColor }]}>ИМТ: {item.score}</Text>
                  <Text style={styles.comment}>{basfiComment}</Text>
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
