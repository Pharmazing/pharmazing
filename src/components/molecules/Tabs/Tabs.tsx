import {
  Tabs as TabView,
  CollapsibleProps,
  TabBarProps,
  CollapsibleRef,
} from 'react-native-collapsible-tab-view';
import { Box, Typography } from '../../atoms';
import { useState, Fragment, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';
import { tabsStyles } from './Tabs.styles';
import { useDimensions } from '../../../utils';
import { ProductList } from '../../molecules';
import { ProductCardProps } from '../ProductCard';

//refactor this so its modular

export const Tabs = ({ renderHeader }: Partial<CollapsibleProps>) => {
  const { styles } = useStyles(tabsStyles);
  const { dimensions } = useDimensions();
  const [index, setIndex] = useState(0);
  const routes = [
    {
      key: 'catalog',
      title: 'Catalog',
      component: () => <ProductList cards={cards} />,
    },
    {
      key: 'reviews',
      title: 'Reviews',
      component: () => <Typography>Reviews</Typography>,
    },
    {
      key: 'info',
      title: 'Info',
      component: () => <Typography>Info</Typography>,
    },
  ];
  const ref = useRef<CollapsibleRef>(null);
  const indicatorPosition = useSharedValue(0);
  // const tabWidth = 120;
  // factor has to match width
  const newWidth = (dimensions.screen.width * 0.8) / routes.length;
  const renderTabBar = (_props: TabBarProps) => {
    return (
      <Box style={styles.tabBar}>
        {routes.map((route: any, i: number) => {
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
                  onPress={() => {
                    ref.current?.setIndex(i);
                  }}
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

  const cards: ProductCardProps[] = Array.from({ length: 20 }).map((_, i) => ({
    vendorId: '1',
    productId: i.toString(),
    productName: 'Product Name',
    productCategory: 'Category',
    productPrice: 100,
    productDescription: 'Product Description',
    media: [],
    prescriptionRequired: false,
  }));

  return (
    <TabView.Container
      ref={ref}
      renderHeader={renderHeader}
      headerContainerStyle={{ backgroundColor: 'none' }}
      onTabChange={({ index }) => setIndex(index)}
      renderTabBar={renderTabBar}
    >
      {routes.map((route, i) => {
        return (
          <TabView.Tab name={route.title} key={i}>
            <TabView.ScrollView
              showsVerticalScrollIndicator={false}
              persistentScrollbar={false}
            >
              {route.component()}
            </TabView.ScrollView>
          </TabView.Tab>
        );
      })}
    </TabView.Container>
  );
};
