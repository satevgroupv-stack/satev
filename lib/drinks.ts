export interface Drink {
  id: string;
  name: string;
  amharic: string;
  price: number;
  image: string;
}

export const drinks: Drink[] = [
  {
    id: "coca",
    name: "Coca",
    amharic: "ኮካ",
    price: 30,
    image: "https://i.imgur.com/QYTbP9P.jpg",
  },
  {
    id: "sprite",
    name: "Sprite",
    amharic: "ስፕራይት",
    price: 60,
    image: "https://i.imgur.com/uYvdb5g.jpg",
  },
  {
    id: "fanta",
    name: "Fanta",
    amharic: "ፋንታ",
    price: 70,
    image: "https://i.imgur.com/PmXE8vx.jpg",
  },
  {
    id: "mirinda",
    name: "Mirinda",
    amharic: "ሚሪንዳ",
    price: 70,
    image: "https://i.imgur.com/RnZIopP.jpg",
  },
  {
    id: "negus",
    name: "Negus",
    amharic: "ንጉስ",
    price: 70,
    image: "https://i.imgur.com/N4kyEMW.jpg",
  },
  {
    id: "sinq",
    name: "SinQ",
    amharic: "ስንቅ",
    price: 70,
    image: "https://i.imgur.com/LCyDiA5.jpg",
  },
];