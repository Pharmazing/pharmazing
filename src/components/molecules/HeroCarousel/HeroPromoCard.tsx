import { useStyles } from 'react-native-unistyles';
import { Box, Typography } from '../../atoms';
import { heroPromoCardStyles } from './HeroPromoCard.styles';
import { useDimensions } from '../../../utils';
import { HeroPromoCardProps } from './HeroPromoCard.types';
import { ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

export const HeroPromoCard = ({ title, description }: HeroPromoCardProps) => {
  const { styles, theme } = useStyles(heroPromoCardStyles);
  const { dimensions } = useDimensions();

  const isLgScreen = dimensions.screen.width > 768;
  return (
    <ImageBackground
      imageStyle={{ borderRadius: theme.size.layout.lg - 2 }}
      resizeMode="cover"
      src={'https://picsum.photos/800/800'}
      style={[styles.itemContainer(isLgScreen)]}
    >
      <BlurView intensity={70} tint="dark" style={styles.blurContainer}>
        <Typography size="lg" weight="500" style={{ color: 'white' }}>
          {title}
        </Typography>
        <Typography style={{ color: theme.colors.white }}>
          {description}
        </Typography>
      </BlurView>
    </ImageBackground>
  );
};
