import { IPropsSwipeRow as IPropsSwipeRowType } from 'react-native-swipe-list-view';

declare module 'react-native-swipe-list-view' {
  interface IPropsSwipeRow extends IPropsSwipeRowType {
    children: [unknown, unknown];
  }
}
