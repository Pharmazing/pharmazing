import { useState } from 'react';
import { Image } from 'react-native';
import { LoadingImageProps } from './LoadingImage.types';
import { Skeleton } from 'native-base';

const defSrc = 'https://picsum.photos/1000/1000';

export const LoadingImage = (props: LoadingImageProps) => {
  const { style } = props;
  const [loading, setLoading] = useState(false);
  if (loading) {
    return <Skeleton style={style} />;
  }
  return (
    <Image
      source={{ uri: defSrc }}
      onLoadStart={() => setLoading(true)}
      onLoad={() => setLoading(false)}
      {...props}
    />
  );
};
