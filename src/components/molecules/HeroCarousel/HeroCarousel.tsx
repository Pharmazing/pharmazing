import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { CarouselItem, HeroCarouselProps } from './HeroCarousel.types';
import { useStyles } from 'react-native-unistyles';
import { heroCarouselStyles } from './HeroCarousel.styles';
import { Box, Typography } from '../../atoms';
import { useDimensions } from '../../../utils';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { mockPromoCards } from './HeroCarousel.mock';
import { useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const HeroCarousel = forwardRef<ICarouselInstance, HeroCarouselProps>(
  (props, forwardedRef) => {
    const ref = useRef<ICarouselInstance>(null);

    useImperativeHandle(forwardedRef, () => ref.current as ICarouselInstance);

    const { styles, theme } = useStyles(heroCarouselStyles);
    const { dimensions } = useDimensions();

    const isLgScreen = dimensions.screen.width > 768;
    const progress = useSharedValue<number>(0);

    const renderItem = ({ item }: { item: CarouselItem }) => {
      return (
        <Box style={[styles.itemContainer(isLgScreen)]}>
          <Typography>{item.title}</Typography>
        </Box>
      );
    };

    const onPressPagination = (index: number) => {
      ref?.current?.scrollTo({
        /**
         * Calculate the difference between the current index and the target index
         * to ensure that the carousel scrolls to the nearest index
         */
        count: index - progress.value,
        animated: true,
      });
    };
    return (
      <GestureHandlerRootView>
        <Box
          style={{
            height: 200,
            // width: dimensions.window.width,
            gap: theme.size.layout.md,
          }}
        >
          <Carousel
            modeConfig={{
              parallaxScrollingScale: 0.95,
              parallaxScrollingOffset: isLgScreen ? 512 : -theme.size.layout.lg,
            }}
            loop={false}
            ref={ref}
            style={styles.carousel}
            vertical={false}
            width={dimensions.screen.width * (isLgScreen ? 1 : 0.92)}
            mode="parallax"
            data={mockPromoCards}
            renderItem={renderItem}
            onProgressChange={progress}
          />
          <Pagination.Basic
            progress={progress}
            data={mockPromoCards}
            activeDotStyle={{ backgroundColor: theme.colors.Green400 }}
            dotStyle={{
              backgroundColor: theme.colors.Green100,
              borderRadius: 5,
            }}
            containerStyle={{ gap: theme.size.layout.sm }}
            onPress={onPressPagination}
          />
        </Box>
      </GestureHandlerRootView>
    );
  }
);
