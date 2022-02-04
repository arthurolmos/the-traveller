import React from "react";
import Image from "next/image";

interface Props {
  children?: React.ReactNode;
}

function CarouselItem() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          bottom: 100,
          margin: "auto",
          left: 40,
          zIndex: 1,
          color: "white",
        }}
      >
        <h1>TITLE</h1>
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, fuga
          nihil? At repellat tenetur, adipisci inventore cumque asperiores non
          mollitia!
        </h2>
      </div>

      <Image src="/assets/india.jpg" alt="india" layout="fill" />
    </div>
  );
}

export default function Carousel({ children }: Props) {
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
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 600,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: 30,
          zIndex: 2,
          cursor: "pointer",
        }}
        onClick={previous}
      >
        Left
      </div>
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: 30,
          zIndex: 2,
          cursor: "pointer",
        }}
        onClick={next}
      >
        Right
      </div>

      {/* <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          transform: `translateX(calc(${position} * -100vw))`,
        }}
      >
        <Image src="/assets/india.jpg" alt="india" layout="fill" />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(calc(${position} * 100vw))`,
        }}
      >
        <Image src="/assets/finland.jpg" alt="finland" layout="fill" />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `translateX(calc(${position} * 100vw))`,
        }}
      >
        <Image src="/assets/india.jpg" alt="india" layout="fill" />
      </div> */}

      <div
        style={{
          position: "absolute",
          inset: 0,
          flex: 1,
          display: "flex",
          flexDirection: "row",
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            flex: "0 0 100%",
            backgroundColor: "blue",
            transform: `translateX(calc(${position} * -100%))`,
          }}
        >
          <Image src="/assets/india.jpg" alt="india" layout="fill" />
        </div>

        <div
          style={{
            flex: "0 0 100%",
            backgroundColor: "red",
            transform: `translateX(calc(${position} * -100%))`,
          }}
        >
          <Image src="/assets/finland.jpg" alt="finland" layout="fill" />
        </div>

        <div
          style={{
            flex: "0 0 100%",
            backgroundColor: "green",
            transform: `translateX(calc(${position} * -100%))`,
          }}
        >
          <Image src="/assets/india.jpg" alt="india" layout="fill" />
        </div>
      </div>
    </div>
  );
}
