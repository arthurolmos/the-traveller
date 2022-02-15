import React from 'react';
import Image, { ImageProps } from 'next/image';
import placeholder from '../../public/assets/placeholder.png';

export default function DefaultImage(props: ImageProps) {
  const { src, ...rest } = props;

  return <Image src={src ? src : placeholder} {...rest} />;
}
