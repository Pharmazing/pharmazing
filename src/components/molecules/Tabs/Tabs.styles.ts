import { createStyleSheet } from 'react-native-unistyles';

export const tabsStyles = createStyleSheet((theme) => ({
  tabBar: {
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    // width: '100%',
    borderRadius: theme.size.layout.xl,
    // flex: 1,
    height: 36,
    width: '70%',
    alignSelf: 'center',
    // opacity:0.5,
    // borderWidth: 1,
    // overflow: 'visible',
    // alignItems: 'center',
    // justifyContent: 'space-around',
    marginBottom: theme.size.layout.lg,
    backgroundColor: theme.colors.Gray200,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    zIndex: 100,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderWidth: 1
  },
  tabLabel: ({ selected }: { selected: boolean }) => ({
    color: selected ? 'white' : theme.colors.Gray600,
    opacity: selected ? 1 : 0.5,
    // zIndex: 50,
    // borderWidth: 1,
    // zIndex: 10000,
    // position: 'absolute',
  }),
  indicator: (width?: number) => ({
    position: 'absolute',
    top: 0,
    height: '100%',
    borderRadius: 24,
    backgroundColor: theme.colors.Green500,
    zIndex: 0,
    width, // Adjust based on tab width
  }),
}));
