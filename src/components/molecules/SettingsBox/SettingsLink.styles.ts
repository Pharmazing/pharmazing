import { createStyleSheet } from 'react-native-unistyles';

export const settingsLinkStyles = createStyleSheet((theme) => ({
  textStyle: ({ disabled }: { disabled?: boolean }) => ({
    fontFamily: 'Roboto_500Medium',
    fontSize: 18,
    color: disabled ? theme.colors.Gray200 : theme.colors.Gray600,
  }),
  linkContainer: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
}));
