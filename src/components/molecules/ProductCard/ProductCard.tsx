import { useStyles } from 'react-native-unistyles';
import { Image } from 'react-native';
import { Typography, Box, Button, ButtonVariantEnum, Icon } from '../../atoms';
import { productCardStyles } from './ProductCard.styles';
import { ProductCardProps } from './ProductCard.types';
import { LinearGradient } from 'expo-linear-gradient';
// import { Button } from 'native-base';

export const ProductCard = ({
  productName,
  media,
  productDescription,
  ...rest
}: ProductCardProps) => {
  const { styles, theme } = useStyles(productCardStyles);
  return (
    <Box style={styles.container}>
      <Box style={styles.imageContainer}>
        <LinearGradient
          style={{
            padding: 4,
            flexGrow: 1,
            borderRadius: theme.size.layout.lg + 4,
          }}
          start={[0, 0]}
          end={[1, 1]}
          colors={[theme.colors.Blue400, theme.colors.Green400]}
        >
          <Image
            style={styles.image}
            source={{ uri: media?.[0]?.url || 'https://picsum.photos/800/800' }}
          />
        </LinearGradient>
      </Box>
      <Box style={styles.contentContainer}>
        <Box style={{ width: '100%' }}>
          <Typography weight="500" size="lg">
            {productName}
          </Typography>
          <Typography style={{ opacity: 0.5 }} size="md">
            {'24 capsules'}
          </Typography>
        </Box>
        <Box style={{ width: '100%', gap: theme.size.layout.md }}>
          <Typography
            style={{ opacity: 0.5, flexWrap: 'wrap', flex: 1, width: '90%' }}
            numberOfLines={2}
          >
            {
              'The quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog the quick brown fox jumps over the lazy dog'
            }
          </Typography>
          <Box
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography weight="500" size="lg">
              {'$240.99'}
            </Typography>
            <Button
              icon={
                <Icon
                  name="PlusIcon"
                  color={theme.colors.Green100}
                  height={16}
                  width={16}
                />
              }
              style={{
                margin: 0,
                width: 128,
                height: 36,
                backgroundColor: theme.colors.Green500,
                borderColor: 'white',
                gap: theme.size.layout.sm,
                borderWidth: 0,
                opacity: 1,
              }}
              shadowRadius={0}
              renderShadow={false}
              btnVariant={ButtonVariantEnum.DANGER}
              title="Add to Cart"
              textColor={theme.colors.Green100}
              onPress={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
