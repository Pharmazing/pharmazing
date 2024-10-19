import { CollapsibleProps } from 'react-native-collapsible-tab-view';
import { ProductCardProps } from '../ProductCard';

export type TabsProps = Partial<CollapsibleProps> & {
  cards: ProductCardProps[];
};
