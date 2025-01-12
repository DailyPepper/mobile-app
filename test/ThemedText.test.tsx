// test/ThemedText.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

// Мокаем хук useThemeColor с правильной типизацией
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('ThemedText Component', () => {
  beforeEach(() => {
    // Мокаем возвращаемое значение для хука useThemeColor
    (useThemeColor as jest.Mock).mockReturnValue('#000000'); // Вернем черный цвет для текста
  });

  it('renders correctly with the given text', () => {
    render(<ThemedText>Test Text</ThemedText>);

    // Проверяем, что текст отображается правильно
    expect(screen.getByText('Test Text')).toBeTruthy();
  });

  it('applies the correct style for type "default"', () => {
    render(<ThemedText type="default">Test Text</ThemedText>);

    const text = screen.getByText('Test Text');
    
    // Проверяем, что применен стиль по умолчанию
    expect(text.props.style).toContainEqual(expect.objectContaining({ fontSize: 16 }));
    expect(text.props.style).toContainEqual(expect.objectContaining({ lineHeight: 24 }));
  });

  it('applies the correct style for type "title"', () => {
    render(<ThemedText type="title">Test Title</ThemedText>);

    const text = screen.getByText('Test Title');

    // Проверяем, что применен стиль для заголовка
    expect(text.props.style).toContainEqual(expect.objectContaining({ fontSize: 32 }));
    expect(text.props.style).toContainEqual(expect.objectContaining({ fontWeight: 'bold' }));
  });

  it('applies the correct style for type "subtitle"', () => {
    render(<ThemedText type="subtitle">Test Subtitle</ThemedText>);

    const text = screen.getByText('Test Subtitle');

    // Проверяем, что применен стиль для подзаголовка
    expect(text.props.style).toContainEqual(expect.objectContaining({ fontSize: 20 }));
    expect(text.props.style).toContainEqual(expect.objectContaining({ fontWeight: 'bold' }));
  });

  it('applies the correct style for type "defaultSemiBold"', () => {
    render(<ThemedText type="defaultSemiBold">Test SemiBold</ThemedText>);

    const text = screen.getByText('Test SemiBold');

    // Проверяем, что применен стиль для полужирного текста
    expect(text.props.style).toContainEqual(expect.objectContaining({ fontWeight: '600' }));
  });

  it('applies the correct style for type "link"', () => {
    render(<ThemedText type="link">Test Link</ThemedText>);

    const text = screen.getByText('Test Link');

    // Проверяем, что применен стиль для ссылки
    expect(text.props.style).toContainEqual(expect.objectContaining({ color: '#0a7ea4' }));
  });

  it('applies the correct color based on the theme', () => {
    render(<ThemedText>Test Color</ThemedText>);

    const text = screen.getByText('Test Color');
    
    // Проверяем, что цвет текста правильный (черный для текущей темы)
    expect(text.props.style).toContainEqual(expect.objectContaining({ color: '#000000' }));
  });

  it('combines passed styles with internal styles', () => {
    const customStyle = { fontSize: 20, color: 'red' };
    render(<ThemedText style={customStyle}>Test Custom Style</ThemedText>);

    const text = screen.getByText('Test Custom Style');
    
    // Проверяем, что внешний стиль сработал
    expect(text.props.style).toContainEqual(expect.objectContaining({ fontSize: 20 }));
    expect(text.props.style).toContainEqual(expect.objectContaining({ color: 'red' }));
  });
});
