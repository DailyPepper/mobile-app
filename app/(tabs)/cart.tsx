import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { addBasfiHistory } from '@/store/basfiSlice';
import Slider from '@react-native-community/slider';

type QuestionItem = string;

export default function CalendarScreen() {
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0));
  const [result, setResult] = useState<{ comment: string; color: string; score: number | null }>({
    comment: '',
    color: '#000',
    score: null,
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const questions: QuestionItem[] = [
    'Надевать носки или колготки без посторонней помощи или вспомогательных средств.',
    'Наклоняться вперед, чтобы поднять предмет с пола без вспомогательных средств.',
    'Дотягиваться до высоких полок без посторонней помощи или вспомогательных средств.',
    'Вставать со стула без помощи рук или вспомогательных средств.',
    'Вставать с пола из положения лежа на спине без посторонней помощи.',
    'Стоять без опоры в течение 10 минут, не испытывая при этом дискомфорт.',
    'Подниматься на 12–15 ступеней, не используя при этом перила или иные вспомогательные средства.',
    'Смотреть через плечо, не поворачивая туловища.',
    'Заниматься физически активными видами деятельности (например, лечебной физкультурой, работой на садовом участке или спортом).',
    'Сохранять активность в течение всего дня (дома или на работе).',
  ];

  const handleSliderChange = (value: number, index: number) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  const renderItem = ({ item, index }: { item: QuestionItem; index: number }) => (
    <View key={index} style={styles.questionContainer}>
      <Text style={styles.inputLabel}>{`${index + 1}. ${item}`}</Text>
      <Text style={styles.sliderValue}>{answers[index]}</Text>
      <Slider
        style={styles.input}
        minimumValue={0}
        maximumValue={10}
        step={1}
        value={answers[index]}
        onValueChange={(value) => handleSliderChange(value, index)}
        minimumTrackTintColor="#addfad"
        maximumTrackTintColor="#9797974f"
      />
    </View>
  );

  const calculateBasfi = async () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / answers.length;

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

    const dataToSave = {
      date: new Date().toISOString(),
      score: parseFloat(averageScore.toFixed(1)),
      comment: basfiComment,
    };

    setResult({
      comment: basfiComment,
      color: basfiColor,
      score: dataToSave.score,
    });

    dispatch(
      addBasfiHistory({
        date: new Date().toISOString().split('T')[0],
        score: averageScore,
        comment: basfiComment,
      })
    );

    setAlertVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BASFI</Text>

      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.scrollContainer}
      />

      <TouchableOpacity style={styles.button} onPress={calculateBasfi}>
        <Text style={styles.buttonText}>Рассчитать индекс</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={alertVisible}
        animationType="fade"
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Ваш индекс BASFI был успешно рассчитан!</Text>
            <Text style={styles.modalText}>{result.comment}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.modalButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#f8f8f8',
  },
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
  questionContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginTop: 16,
    color: '#555',
  },
  input: {
    marginTop: 8,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    marginTop: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  sliderValue: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  historyItem: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});
