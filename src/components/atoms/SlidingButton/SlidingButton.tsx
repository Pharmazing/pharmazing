import { useStyles } from 'react-native-unistyles';
import { SlidingButtonProps } from './SlidingButton.types';
import { slidingButtonStyles } from './SlidingButton.styles';
import SlideButton from 'rn-slide-button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const SlidingButton = ({
  title,
  width,
  onReachedToEnd,
}: SlidingButtonProps) => {
  const { styles } = useStyles(slidingButtonStyles);
  return (
    <GestureHandlerRootView>
      <SlideButton
        containerStyle={styles.containerStyle}
        thumbStyle={styles.thumbStyle}
        underlayStyle={styles.underlayStyle}
        padding={5}
        autoReset
        title={title}
        width={width}
        onReachedToEnd={onReachedToEnd}
      />
    </GestureHandlerRootView>
  );
};
