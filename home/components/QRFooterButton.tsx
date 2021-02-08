// note(bacon): Purposefully skip using the themed icons since we want the icons to change color based on toggle state.
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

import Colors from '../constants/Colors';

const shouldUseHaptics = Platform.OS === 'ios';

const size = 64;
const slop = 40;

const hitSlop = { top: slop, bottom: slop, right: slop, left: slop };

export default function QRFooterButton({
  onPress,
  isActive = false,
  iconName,
  iconSize = 36,
}: {
  onPress: () => void;
  isActive?: boolean;
  iconName: string;
  iconSize?: number;
}) {
  const tint = isActive ? 'default' : 'dark';
  const iconColor = isActive ? Colors.light.tintColor : '#ffffff';

  const onPressIn = React.useCallback(() => {
    if (shouldUseHaptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  const onPressButton = React.useCallback(() => {
    onPress();
    if (shouldUseHaptics) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [onPress]);

  return (
    <TouchableBounce hitSlop={hitSlop} onPressIn={onPressIn} onPress={onPressButton}>
      <BlurView intensity={100} style={styles.container} tint={tint}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </BlurView>
    </TouchableBounce>
  );
}

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    overflow: 'hidden',
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
