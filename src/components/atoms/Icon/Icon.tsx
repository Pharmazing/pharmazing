import { FunctionComponent, ReactElement } from "react";
import { IconProps } from "./Icons.types";
import * as Icons from "../icons";

export const Icon: FunctionComponent<IconProps> = ({
  name,
  transform,
  ...rest
}: IconProps): ReactElement<IconProps> => {
  const Component = Icons[name];

  return <Component {...rest} transform={transform} />;
};
