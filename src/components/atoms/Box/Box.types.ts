import { ScrollViewProps, StackProps } from "tamagui";

type ExtTypes = StackProps & ScrollViewProps;
export interface BoxProps extends ExtTypes {
  scrollable?: boolean;
}
