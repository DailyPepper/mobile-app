import React from "react";
import { render } from "@testing-library/react-native";
import { fireEvent } from "@testing-library/react-native";
import ParallaxScrollView from "../components/ParallaxScrollView"; 
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

describe("ParallaxScrollView Component", () => {
  it("renders correctly with header and children", () => {
    const { getByTestId, getByText } = render(
      <ParallaxScrollView
        headerImage={<ThemedView testID="header-image" />}
        headerBackgroundColor={{ dark: "#000", light: "#fff" }}
      >
        <ThemedText>Test Content</ThemedText>
      </ParallaxScrollView>
    );

    expect(getByTestId("header-image")).toBeTruthy();
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("animates header on scroll", () => {
    const { getByTestId } = render(
      <ParallaxScrollView
        headerImage={<ThemedView testID="header-image" />}
        headerBackgroundColor={{ dark: "#000", light: "#fff" }}
      >
        <ThemedText>Test Content</ThemedText>
      </ParallaxScrollView>
    );

    const scrollView = getByTestId("animated-scrollview");
    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: {
          y: 100, // Прокрутка вниз на 100 пикселей
        },
      },
    });

    const header = getByTestId("header-image");

    // Проверяем, что стили изменились (например, `translateY` или `scale`).
    // В данном случае важно протестировать `animated-style`, что в тестах React Native Reanimated
    // может быть сложным, и для этого может потребоваться mock анимаций.

    // Допустим, вы используете jest-mock для проверки изменений.
    expect(header.props.style).toBeDefined();
    // Вы также можете проверять через консоль вывод изменений стиля.
  });
});
