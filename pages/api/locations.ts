import type { NextApiRequest, NextApiResponse } from 'next';

const japanReviews = [
  {
    id: 'A',
    title: 'Lorem ipsum dolor sit amet.',
    author: 'Dave',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illum quaerat sapiente enim animi, nulla non quidem aliquid saepe magni! Rerum suscipit non est cum inventore quas, esse possimus ullam?',
  },
  {
    id: 'B',
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    author: 'Martin',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illum quaerat sapiente enim animi, nulla non quidem aliquid saepe magni! Rerum suscipit non est cum inventore quas, esse possimus ullam?',
  },
  {
    id: 'C',
    title: 'Lorem, ipsum dolor.',
    author: 'Vincent',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illum quaerat sapiente enim animi, nulla non quidem aliquid saepe magni! Rerum suscipit non est cum inventore quas, esse possimus ullam?',
  },
  {
    id: 'D',
    title: 'Lorem ipsum dolor sit amet.',
    author: 'Alan',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illum quaerat sapiente enim animi, nulla non quidem aliquid saepe magni! Rerum suscipit non est cum inventore quas, esse possimus ullam?',
  },
  {
    id: 'E',
    title: 'Lorem ipsum dolor sit amet.',
    author: 'Andy',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illum quaerat sapiente enim animi, nulla non quidem aliquid saepe magni! Rerum suscipit non est cum inventore quas, esse possimus ullam?',
  },
];

const finlandReviews = [
  {
    id: 'F',
    title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    author: 'NC',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illum quaerat sapiente enim animi, nulla non quidem aliquid saepe magni! Rerum suscipit non est cum inventore quas, esse possimus ullam?',
  },
  {
    id: 'G',
    title: 'Lorem ipsum dolor sit amet.',
    author: 'Fenriz',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illum quaerat sapiente enim animi, nulla non quidem aliquid saepe magni! Rerum suscipit non est cum inventore quas, esse possimus ullam?',
  },
  {
    id: 'H',
    title: 'Lorem, ipsum dolor.',
    author: 'Zephyrous',
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur illum quaerat sapiente enim animi, nulla non quidem aliquid saepe magni! Rerum suscipit non est cum inventore quas, esse possimus ullam?',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.location as string;

  console.log({ query });

  if (query.toLowerCase() == 'japan') return res.status(200).json(japanReviews);
  if (query.toLowerCase() == 'finland')
    return res.status(200).json(finlandReviews);

  return res.status(404).json({ error: 'Not Found' });
}
