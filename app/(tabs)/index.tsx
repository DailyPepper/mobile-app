import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';

type ICategory = {
  category: string;
  range: string;
  color: string;
};

export default function HomeScreen() {
  const indexCategories = useMemo<ICategory[]>(() => [
    { category: 'Отсутствие ограничений', range: '0', color: '#FF6347' },
    { category: 'Умеренные ограничения', range: '5', color: '#32CD32' },
    { category: 'Невозможность выполнить определенное действие', range: '10', color: '#FFA500' },
  ], []);

  const renderItem: ListRenderItem<ICategory> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemRange}>
        {item.range} - <Text style={[styles.itemTitle, { color: item.color }]}>{item.category}</Text>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Калькулятор индекса BASFI</Text>
      <Text style={styles.description}>
        Это приложение позволяет оценить выраженность функциональных нарушений позвоночника и суставов.
      </Text>
      <Text style={styles.description}>
        Индекс BASFI состоит из 10 вопросов, каждый из которых представлен в виде числовой шкалы от 0 до 10. Вы отмечаете ту цифру, которая, по Вашему мнению, наиболее точно отражает функциональные способности.
      </Text>
      <FlatList
        data={indexCategories}
        keyExtractor={(item) => item.category}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: 60,
          offset: 60 * index,
          index,
        })}
        initialNumToRender={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    marginTop: 50,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 20,
    textAlign: 'justify',
    lineHeight: 24,
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemRange: {
    fontSize: 16,
    color: '#8E8E8E',
  },
});
