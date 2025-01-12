import React from 'react';
import { render } from '@testing-library/react-native';
import Animated from 'react-native-reanimated';
import { HelloWave } from '../components/HelloWave';

jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');

  Reanimated.useSharedValue = jest.fn(() => ({ value: 0 }));
  Reanimated.useAnimatedStyle = jest.fn(() => ({}));

  Reanimated.default.call = () => {};

  return Reanimated;
});

describe('HelloWave', () => {
  it('renders correctly with the waving animation', () => {
    const { getByText } = render(<HelloWave />);
    
    const wavingEmoji = getByText('👋');
    expect(wavingEmoji).toBeTruthy();
  });

  it('applies the animation styles', () => {
    const { UNSAFE_getByType } = render(<HelloWave />);
    
    const animatedView = UNSAFE_getByType(Animated.View);
    expect(animatedView).toBeTruthy();

    expect(animatedView.props.style).toEqual(expect.any(Object));
  });
});
