import { useLocalSearchParams } from 'expo-router';
import { ProductDetailPage } from '../components/organisms';
import { isAndroid, isIOS } from '../utils';

export function ProductDetailPageLayout() {
  const { productId } = useLocalSearchParams();
  return (
    (isIOS || isAndroid) && (
      <ProductDetailPage productId={productId as string} />
    )
  );
}
