import { IPropsSwipeRow } from 'react-native-swipe-list-view';

declare module 'react-native-swipe-list-view' {
  interface IPropsSwipeRow extends IPropsSwipeRow {
    children: [unknown, unknown];
  }
}
