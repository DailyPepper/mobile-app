import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { addBmiHistory } from '@/store/bmiSlice';
import Slider from '@react-native-community/slider';

export default function CalendarScreen() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [bmi, setBmi] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [bmiColor, setBmiColor] = useState('#000');
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(0));

  const questions = [
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
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const calculateBmi = () => {
    const totalScore = answers.reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / answers.length;
    setBmi(parseFloat(averageScore.toFixed(1)));
  
    let bmiComment = '';
  
    if (averageScore < 1) {
      bmiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Отсутствие ограничений.`;
      setBmiColor('#32CD32');
    } else if (averageScore <= 5) {
      bmiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Умеренные ограничения.`;
      setBmiColor('#FFA500');
    } else {
      bmiComment = `Ваш индекс BASFI: ${averageScore.toFixed(1)}. Невозможность выполнить определенное действие. Рекомендуется консультация врача.`;
      setBmiColor('#FF6347');
    }
  
    setComment(bmiComment);
  
    const currentDate = selectedDate || new Date().toISOString().split('T')[0]; // Получаем текущую дату в формате yyyy-mm-dd
    dispatch(addBmiHistory({ date: currentDate, score: averageScore, comment: bmiComment }));
  };
  
  return (
      <View style={styles.container}>
          <Text style={styles.title}>BASFI</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.inputLabel}>{`${index + 1}. ${question}`}</Text>
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
          ))}
    
          <TouchableOpacity style={styles.button} onPress={calculateBmi}>
            <Text style={styles.buttonText}>Рассчитать индекс</Text>
          </TouchableOpacity>
        </ScrollView>
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
    color: '#4A90E2',
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
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  sliderValue: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
});
