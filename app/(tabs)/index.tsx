import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';

type ICategory = {
  category: string;
  range: string;
  color: string;
};

export default function HomeScreen() {
  const indexCategories = useMemo<ICategory[]>(() => [
    { category: 'Отсутствие ограничений', range: 'от 0 до 3',color: '#32CD32'   },
    { category: 'Умеренные ограничения', range: 'от 4 до 6', color: '#FFA500' },
    { category: 'Невозможность выполнить определенное действие', range: 'от 7 до 10', color: '#FF6347' },
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
        Это приложение позволит вам оценить выраженность функциональных нарушений позвоночника и суставов.
      </Text>
      <Text style={styles.description}>
        Индекс BASFI (the Bath Ankylosing Spondylitis Functional Index) состоит из 10 вопросов, каждый из которых представлен в виде числовой шкалы от 0 до 10. Вы отмечаете ту цифру, которая, по Вашему мнению, наиболее точно отражает функциональные способности.
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
    color: '#5dda8b',
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
    fontWeight: '500',
    marginBottom: 5,
  },
  itemRange: {
    fontSize: 16,
    color: '#8E8E8E',
  },
});
