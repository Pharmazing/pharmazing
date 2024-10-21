import { useStyles } from 'react-native-unistyles';
import { Image, TouchableHighlight } from 'react-native';
import { Typography, Box, Button, ButtonVariantEnum, Icon } from '../../atoms';
import { productCardStyles } from './ProductCard.styles';
import { ProductCardProps } from './ProductCard.types';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';

export const ProductCard = ({
  productName,
  media,
  productDescription,
  productPrice,
  productId,
  ...rest
}: ProductCardProps) => {
  const { id: vendorId } = useLocalSearchParams();
  const { styles, theme } = useStyles(productCardStyles);
  return (
    <TouchableHighlight
      onPress={() => router.navigate(`pharmacy/${vendorId}/${productId}`)}
      style={styles.container}
      activeOpacity={0.8}
      underlayColor={theme.colors.Green100}
    >
      <>
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
              source={{
                uri: media?.[0]?.url || 'https://picsum.photos/800/800',
              }}
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
              style={{ opacity: 0.5, flexWrap: 'wrap', width: '100%' }}
              numberOfLines={2}
            >
              {productDescription}
            </Typography>
            <Box
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography weight="500" size="lg">
                {`$${productPrice?.toFixed(2)}`}
              </Typography>
              <Button
                icon={
                  <Icon
                    name="PlusIcon"
                    color={theme.colors.white}
                    height={16}
                    width={16}
                  />
                }
                activeOpacity={0.6}
                style={{
                  margin: 0,
                  width: 128,
                  height: 32,
                  gap: theme.size.layout.sm,
                }}
                shadowRadius={0}
                renderShadow={false}
                btnVariant={ButtonVariantEnum.PRIMARY}
                title="Add to Cart"
                onPress={() => {}}
              />
            </Box>
          </Box>
        </Box>
      </>
    </TouchableHighlight>
  );
};
