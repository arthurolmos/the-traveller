import Image from 'next/image';
import React from 'react';
import {
  ExperiencesDescriptionStyled,
  ExperiencesContainerStyled,
  ExperiencesImageContainerStyled,
  ExperiencesSectionStyled,
} from '../../styles/components/about-us/ExperiencesSection';

export function ExperiencesSection() {
  return (
    <ExperiencesSectionStyled>
      <h2>Share your experiences with other Travellers!</h2>
      <ExperiencesContainerStyled>
        <ExperiencesImageContainerStyled>
          <Image
            src="/assets/about-us/travel.jpg"
            objectFit="cover"
            layout="fill"
          />
        </ExperiencesImageContainerStyled>

        <ExperiencesDescriptionStyled>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut nemo
          voluptate molestias sit optio deserunt reiciendis non asperiores quae
          aut. Enim eveniet id voluptates voluptatum unde molestias dolorem
          harum voluptas dignissimos, quia neque molestiae corrupti, itaque quis
          vero at aut mollitia asperiores aliquid! Veniam rem aspernatur ducimus
          blanditiis nostrum debitis at enim quo laborum nemo ipsum cum, alias
          voluptas fugit quae eos, culpa, hic minus vitae non recusandae? Autem
          repudiandae expedita voluptatem enim! Possimus quo sit maxime rem
          eaque explicabo, dolorum dolor dolorem aspernatur corporis
          reprehenderit perspiciatis fugit a non, est harum incidunt suscipit
          mollitia veritatis ducimus tenetur ipsum. Consectetur pariatur autem
          enim! Amet quasi aliquid voluptates nisi dicta illo expedita,
          exercitationem repellat, aspernatur sequi dignissimos debitis possimus
          officia, cupiditate rerum provident magni nemo repudiandae culpa
          accusamus. Totam velit doloremque odit molestiae! Asperiores quae ut
          dolore natus itaque odio harum voluptatem accusamus incidunt
          voluptatum sequi ad recusandae laborum soluta blanditiis quaerat non
          porro sint autem molestias explicabo, odit fugiat! Eum perspiciatis
          officia sed debitis aliquid, asperiores exercitationem voluptates
          natus placeat, consequatur itaque ipsum expedita a suscipit, officiis
          facilis sit omnis obcaecati ipsa repellat. In quisquam expedita id quo
          pariatur. Expedita perferendis mollitia est magni natus ea numquam
          consectetur doloremque sit.
        </ExperiencesDescriptionStyled>
      </ExperiencesContainerStyled>
    </ExperiencesSectionStyled>
  );
}
