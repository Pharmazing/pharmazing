import {
  NavigationState,
  SceneRendererProps,
  TabView,
} from 'react-native-tab-view';
import { Box, Typography } from '../../atoms';
import { useState, Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';
import { tabsStyles } from './Tabs.styles';
import { useDimensions } from '../../../utils';

//refactor this so its modular

export const Tabs = () => {
  const { styles } = useStyles(tabsStyles);
  const { dimensions } = useDimensions();
  const [index, setIndex] = useState(0);
  const routes = [
    { key: 'catalog', title: 'Catalog' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'info', title: 'Info' },
  ];

  const indicatorPosition = useSharedValue(0);
  // const tabWidth = 120;
  const newWidth = (dimensions.screen.width * 0.7) / routes.length;
  const renderTabBar = ({
    navigationState,
    jumpTo,
  }: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;
    }>;
  }) => {
    return (
      <Box style={styles.tabBar}>
        {navigationState.routes.map((route: any, i: number) => {
          if (index === i) {
            indicatorPosition.value = withSpring(index * newWidth, {
              duration: 1000,
              velocity: 4,
            });
          }
          return (
            <Fragment key={route.key}>
              <Box style={[styles.tabItem]}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => jumpTo(route.key)}
                >
                  <Typography
                    weight="500"
                    style={[styles.tabLabel({ selected: index === i })]}
                  >
                    {route.title}
                  </Typography>
                </TouchableOpacity>
              </Box>
              <Animated.View
                style={[
                  styles.indicator(newWidth),
                  {
                    left: indicatorPosition,
                  },
                ]}
              />
            </Fragment>
          );
        })}
      </Box>
    );
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={({ route }) => {
        switch (route.key) {
          case 'catalog':
            return <Typography>Catalog</Typography>;
          case 'reviews':
            return <Typography>Reviews</Typography>;
          case 'info':
            return <Typography>Info</Typography>;
          default:
            return null;
        }
      }}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: dimensions.screen.width }}
    />
  );
};
