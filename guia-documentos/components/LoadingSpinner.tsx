// components/LoadingSpinner.tsx
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type LoadingSpinnerProps = {
  size?: 'small' | 'large';
  color?: string;
};

export default function LoadingSpinner({
  size = 'large',
  color = '#0891b2',
}: LoadingSpinnerProps) {
  return (
    <View style={s.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});