import { createStyleSheet } from "react-native-unistyles";

export const heroPromoCardStyles = createStyleSheet((theme) => ({
    itemContainer: (isLgScreen: boolean) => ({
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.Green300,
        // borderWidth: 3,
        // borderColor: theme.colors.Green500,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderRadius: theme.size.layout.lg,
        maxWidth: isLgScreen ? '50%' : '100%',
      }),
      blurContainer: {
        // flex: 1,
        width: '100%',
        height: '40%',
        // position: 'absolute',
        padding: theme.size.layout.md,
        // borderWidth: 3,
        // margin: 16,
        // textAlign: 'center',
        // justifyContent: 'center',
        overflow: 'hidden',
        borderBottomStartRadius: theme.size.layout.lg -2,
        borderBottomEndRadius: theme.size.layout.lg -2,

        // borderRadius: 20,
      },
}));