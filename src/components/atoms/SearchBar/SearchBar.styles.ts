import { createStyleSheet } from 'react-native-unistyles';

export const searchBarStyles = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  icon: {
    marginHorizontal: theme.size.layout.md,
    position: 'absolute',
    zIndex: 1,
    opacity: 0.8,
  },
  textInput: {
    height: '100%',
    width: '100%',
    paddingHorizontal: theme.size.layout.md,
    paddingLeft: 48,
    borderRadius: theme.size.layout.md,
    backgroundColor: theme.colors.Gray150,
    borderWidth: 1,
    borderColor: theme.colors.Gray200,
  },
}));
