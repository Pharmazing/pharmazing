import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { CarouselItem, HeroCarouselProps } from './HeroCarousel.types';
import { useStyles } from 'react-native-unistyles';
import { heroCarouselStyles } from './HeroCarousel.styles';
import { Box } from '../../atoms';
import { useDimensions } from '../../../utils';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { mockPromoCards } from './HeroCarousel.mock';
import { useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HeroPromoCard } from './HeroPromoCard';

export const HeroCarousel = forwardRef<ICarouselInstance, HeroCarouselProps>(
  (props, forwardedRef) => {
    const ref = useRef<ICarouselInstance | null>(null);
    HeroCarousel.displayName = 'HeroCarousel';
    useImperativeHandle(forwardedRef, () => ref.current as ICarouselInstance);

    const { styles, theme, breakpoint } = useStyles(heroCarouselStyles);
    const { dimensions } = useDimensions();

    const progress = useSharedValue<number>(0);

    const renderItem = ({ item }: { item: CarouselItem }) => {
      return (
        <HeroPromoCard title={item.title} description={item.description} />
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

    let parallaxScrollingOffset = 100;
    switch (breakpoint) {
      case 'md':
        parallaxScrollingOffset = 470;
        break;
      case 'lg':
        parallaxScrollingOffset = 600;
        break;
      default:
        break;
    }
    return (
      <GestureHandlerRootView>
        <Box
          style={{
            alignItems: 'center',
            height: 196,
            gap: theme.size.layout.md,
          }}
        >
          <Carousel
            modeConfig={{
              parallaxScrollingOffset,
            }}
            loop
            autoPlay
            autoPlayInterval={5000}
            style={[styles.carousel]}
            vertical={false}
            width={dimensions.screen.width}
            mode="parallax"
            data={mockPromoCards}
            renderItem={renderItem}
            onProgressChange={progress}
            ref={ref}
          />
          <Pagination.Basic
            progress={progress}
            data={mockPromoCards}
            activeDotStyle={{ backgroundColor: theme.colors.Blue400 }}
            dotStyle={{
              backgroundColor: theme.colors.Blue100,
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
