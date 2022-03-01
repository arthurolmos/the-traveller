import { NextApiRequest, NextApiResponse } from 'next';
import { IGuideItem } from '../../models/IGuideItem';

const guideItems: IGuideItem[] = [
  {
    title: 'Tibet',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    image: '/assets/guides/tibet.jpg',
    author: 'Ville',
  },
  {
    title: 'Egypt',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    image: '/assets/guides/egypt.jpg',
    author: 'Linde',
  },
  {
    title: 'Paris',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    image: '/assets/guides/paris.jpg',
    author: 'Mige',
  },
  {
    title: 'Machu Picchu',
    subtitle: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    image: '/assets/guides/machupicchu.jpg',
    author: 'Gas',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.status(200).json(guideItems);
}
