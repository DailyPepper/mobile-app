import { View, Text, FlatList, StyleSheet } from 'react-native';

const bmiCategories = [
  { category: 'Недостаточный вес', range: '< 18.5', color: '#FF6347' },
  { category: 'Нормальный вес', range: '18.5 - 24.9', color: '#32CD32' },
  { category: 'Избыточный вес', range: '25 - 29.9', color: '#FFA500' },
  { category: 'Ожирение', range: '>= 30', color: '#FF0000' },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Калькулятор индекса массы тела</Text>
      <Text style={styles.description}>
        Это приложение поможет вам отслеживать ваш индекс массы тела (ИМТ),
        анализировать изменения и получать рекомендации по здоровью.
      </Text>
      <Text style={styles.subtitle}>Классификация ИМТ:</Text>
      <FlatList
        data={bmiCategories}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View style={styles.bmiItemContainer}>
            <Text style={[styles.bmiCategory, { color: item.color }]}>
              {item.category}
            </Text>
            <Text style={styles.range}>{item.range}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  description: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Roboto-Regular',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Roboto-Bold',
  },
  bmiItemContainer: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  bmiCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto-Bold',
  },
  range: {
    fontSize: 16,
    color: '#8E8E8E',
    fontFamily: 'Roboto-Regular',
  },
});
