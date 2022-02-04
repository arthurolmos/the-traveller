import React from "react";
import Image from "next/image";
import {
  FadeCarouselIndicatorStyled,
  FadeCarouselItemDescription,
  FadeCarouselItemStyled,
  FadeCarouselItemSubtitle,
  FadeCarouselItemTitle,
  FadeCarouselStyled,
} from "../../styles/components/carousel/FadeCarousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  items: CarouselItem[];
}

interface CarouselItem {
  title: string;
  subtitle: string;
  image: string;
}

interface ItemProps {
  active: boolean;
  item: CarouselItem;
}

function FadeCarouselItem({ active, item }: ItemProps) {
  return (
    <FadeCarouselItemStyled active={active}>
      <FadeCarouselItemDescription>
        <FadeCarouselItemTitle>{item.title}</FadeCarouselItemTitle>
        <FadeCarouselItemSubtitle>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, fuga
          nihil? At repellat tenetur, adipisci inventore cumque asperiores non
          mollitia!
        </FadeCarouselItemSubtitle>
      </FadeCarouselItemDescription>
      <Image
        src={item.image}
        alt={item.title}
        layout="fill"
        objectFit="cover"
      />
    </FadeCarouselItemStyled>
  );
}

export default function FadeCarousel({ items }: Props) {
  const [position, setPosition] = React.useState(0);

  const previous = () => {
    if (position <= 0) {
      setPosition(3 - 1);
    } else {
      setPosition(position - 1);
    }
  };

  const next = () => {
    if (position < 3 - 1) {
      setPosition(position + 1);
    } else {
      setPosition(0);
    }
  };

  return (
    <FadeCarouselStyled>
      <FadeCarouselIndicatorStyled direction="left" onClick={previous}>
        <FaChevronLeft size={30} />
      </FadeCarouselIndicatorStyled>
      <FadeCarouselIndicatorStyled direction="right" onClick={next}>
        <FaChevronRight size={30} />
      </FadeCarouselIndicatorStyled>

      {items?.map((item, index) => {
        const active = position === index;

        return <FadeCarouselItem key={index} item={item} active={active} />;
      })}
    </FadeCarouselStyled>
  );
}
