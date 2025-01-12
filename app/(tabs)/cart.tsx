import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addBmiHistory } from '@/store/bmiSlice';

export default function CalendarScreen() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [temperature, setTemperature] = useState('');
  const [age, setAge] = useState('');
  const [bmiColor, setBmiColor] = useState('#000');

  const calculateBmi = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (isNaN(w) || isNaN(h) || w < 0 || h < 0) {
      Alert.alert('Ошибка', 'Введите корректные значения веса и роста.');
      return;
    }

    const bmiValue = w / (h * h);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    let bmiComment = '';

    if (bmiValue < 18.5) {
      bmiComment = `Ваш ИМТ составляет ${bmiValue.toFixed(1)}. Это указывает на недостаточный вес. Рекомендуется проконсультироваться с врачом.`;
      setBmiColor('#FF6347');
    } else if (bmiValue < 25) {
      bmiComment = `Ваш ИМТ составляет ${bmiValue.toFixed(1)}. Ваш вес в норме. Продолжайте поддерживать здоровый образ жизни.`;
      setBmiColor('#32CD32');
    } else if (bmiValue < 30) {
      bmiComment = `Ваш ИМТ составляет ${bmiValue.toFixed(1)}. Избыточный вес. Рекомендуется сбалансированное питание и физическая активность.`;
      setBmiColor('#FFA500');
    } else {
      bmiComment = `Ваш ИМТ составляет ${bmiValue.toFixed(1)}. Ожирение. Очень важно обратиться к врачу для планирования безопасного снижения веса.`;
      setBmiColor('#FF0000');
    }
    setComment(bmiComment);

    const currentDate = selectedDate || new Date().toISOString().split('T')[0];
    dispatch(addBmiHistory({ date: currentDate, bmi: bmiValue, comment: bmiComment, temperature, age }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Калькулятор ИМТ</Text>

      <Text style={styles.inputLabel}>Вес (кг):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.inputLabel}>Рост (см):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.inputLabel}>Температура тела (°C):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={temperature}
        onChangeText={setTemperature}
      />

      <Text style={styles.inputLabel}>Возраст:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TouchableOpacity style={styles.button} onPress={calculateBmi}>
        <Text style={styles.buttonText}>Рассчитать ИМТ</Text>
      </TouchableOpacity>

      {bmi && (
        <Text style={[styles.result, { color: bmiColor }]}>
          {comment}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2a2a2a',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 16,
    marginTop: 16,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#fff',
    fontSize: 16,
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
});
