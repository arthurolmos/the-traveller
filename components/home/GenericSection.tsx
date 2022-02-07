import React from "react";
import { GenericSectionStyled } from "../../styles/components/home/GenericSection";

interface Props {
  backgroundColor?: string;
}

export default function GenericSection({ backgroundColor }: Props) {
  return (
    <GenericSectionStyled
      style={{
        background: backgroundColor,
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>Lorem, ipsum.</h1>

      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima vel
        labore ut sequi ea adipisci animi, doloremque nulla dolores dicta, quis
        cum optio dignissimos praesentium totam unde dolor perferendis
        blanditiis.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio iste
        impedit quaerat, nulla dolor aliquid voluptate voluptatem neque odit
        consequuntur inventore necessitatibus architecto autem atque cupiditate
        voluptatibus assumenda nam sapiente rerum exercitationem obcaecati
        deleniti. Cupiditate atque ex blanditiis harum libero hic deserunt
        obcaecati aut consectetur nobis possimus totam inventore tempora
        voluptatum non doloremque, facilis maxime architecto similique deleniti
        porro rerum recusandae delectus? Est earum consectetur qui inventore
        dolorem officiis eum soluta aliquam fugiat. Illum voluptas eum id
        possimus amet sunt repudiandae reprehenderit, maxime accusantium laborum
        hic earum animi vitae deleniti perspiciatis, pariatur exercitationem ex
        vero facilis! Sint ut officia impedit ipsum officiis? Enim voluptate
        labore eveniet magni officia itaque, dolore corporis accusantium modi
        totam consequatur quos repellendus facilis odit? Inventore expedita quas
        nulla corporis iste debitis? Debitis odio sapiente ut maxime ea
        necessitatibus accusantium rerum repellat harum ratione, accusamus,
        quibusdam pariatur consequatur sed neque officiis velit. Ut a molestias
        nam amet magni distinctio temporibus excepturi ipsam animi velit, quis
        reprehenderit in? Fuga enim tempore quaerat, officiis unde blanditiis,
        atque delectus necessitatibus quasi hic quas harum nam asperiores alias
        accusantium, cupiditate sunt commodi corporis laudantium ea quod
        tenetur? Minus obcaecati quaerat velit dolorum iste pariatur sed
        molestias recusandae debitis vel. Eos nihil assumenda alias hic illum
        reiciendis explicabo pariatur! Enim ab sint quisquam, maxime asperiores
        in, nam magnam aspernatur nemo aliquid doloremque repudiandae ipsam
        aliquam vitae nobis quia reiciendis optio esse. Nobis, sunt! Quaerat
        optio totam dolor officiis incidunt repellendus eveniet molestiae fuga,
        accusamus repellat? Quis officiis ipsa veritatis. Voluptas impedit
        exercitationem doloribus ducimus ut nam nisi quisquam animi saepe
        reprehenderit quidem ad possimus quibusdam repellendus nostrum, debitis
        adipisci numquam. Tempora aspernatur suscipit quos minima atque ratione
        sequi consequatur, eaque non obcaecati deserunt quo a autem ipsum,
        soluta cupiditate ab earum! Nostrum, ducimus labore distinctio beatae
        ullam, hic suscipit assumenda voluptate ex recusandae dicta at. Neque
        amet ut laudantium inventore quaerat eius, molestias nostrum temporibus
        labore enim, architecto officia. Excepturi perspiciatis ducimus
        perferendis, possimus molestiae cupiditate reprehenderit at maxime
        suscipit, quam, corrupti saepe necessitatibus dolorum fugiat neque
        earum? Vel maxime accusantium quis repudiandae similique suscipit culpa,
        quia voluptate iure doloremque! Dolores nobis harum neque corporis rerum
        obcaecati dicta eaque id praesentium vitae suscipit aut quas dolorem qui
        voluptatibus, adipisci facere illum. Libero tenetur, enim dicta
        cupiditate ipsum modi beatae tempore ut praesentium totam ad excepturi
        eligendi nam ducimus mollitia optio ab cumque voluptatem, voluptate
        deleniti! Eveniet voluptatem illo dolore libero atque?
      </p>
    </GenericSectionStyled>
  );
}
