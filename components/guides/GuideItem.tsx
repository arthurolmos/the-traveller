import React from 'react';
import Image from 'next/image';
import { IGuideItem } from '../../interfaces/IGuideItem';
import {
  GuideItemDescriptionStyled,
  GuideItemHeaderStyled,
  GuideItemStyled,
} from '../../styles/components/guides/GuideItem';

interface Props {
  item: IGuideItem;
}

export default function GuideItem({ item }: Props) {
  return (
    <GuideItemStyled>
      <Image
        objectFit="cover"
        layout="fill"
        src={item.image}
        alt={item.title}
        priority
      />
      <GuideItemDescriptionStyled>
        <GuideItemHeaderStyled>
          <h2>{item.title}</h2>
          <span>by {item.author}</span>
        </GuideItemHeaderStyled>
        <p>{item.subtitle}</p>
      </GuideItemDescriptionStyled>
    </GuideItemStyled>
  );
}
