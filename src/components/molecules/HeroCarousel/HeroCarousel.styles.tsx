import { createStyleSheet } from 'react-native-unistyles';

export const heroCarouselStyles = createStyleSheet((theme) => ({
  carousel: { flex: 1, width: '100%' },
  itemContainer: (isLgScreen: boolean) => ({
    flex: 1,
    backgroundColor: theme.colors.Green300,
    borderWidth: 3,
    borderColor: theme.colors.Green500,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.size.layout.lg,
    maxWidth: isLgScreen ? '50%' : '100%',
  }),
}));
