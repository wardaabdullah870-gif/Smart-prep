import { allRecipes } from './recipes.js';

// real photos win if you add any later (src/assets/meals/<id>.jpg)
const photos = import.meta.glob('./assets/meals/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const emojiRules = [
  [/chicken|murgh|tandoori|manchurian|kung pao|adobo/i, '🍗'],
  [/mutton|gosht|keema|beef|lamb|nihari|rogan/i, '🥩'],
  [/egg|omelette|bhurji/i, '🍳'],
  [/paratha|roti|bread|toast|pita|tortilla|taco|burrito|fajita|bhature/i, '🫓'],
  [/noodle|hakka/i, '🍜'],
  [/soup|haleem|stew/i, '🍲'],
  [/rice|pulao|biryani|bibimbap|gyudon/i, '🍚'],
  [/daal|dal|lentil|chan|chole|rajma|bean|hummus|falafel/i, '🫘'],
  [/aloo|potato/i, '🥔'],
  [/gobi|bhindi|baingan|tinda|kaddu|loki|veg|matar|mooli|avocado|salad|poha/i, '🥗'],
];

const colors = ['#fde68a', '#fecaca', '#bbf7d0', '#bfdbfe', '#e9d5ff', '#fed7aa', '#fbcfe8'];

// works with numeric or string ids (fixes the NaN color problem)
const hash = (s) =>
  [...String(s)].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0);

const makeCard = (name, id) => {
  const emoji = emojiRules.find(([re]) => re.test(name))?.[1] ?? '🍽️';
  const bg = colors[hash(id ?? name) % colors.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
    <rect width="100%" height="100%" fill="${bg}"/>
    <text x="50%" y="55%" font-size="200" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const foodImages = {};

for (const r of allRecipes) {
  foodImages[r.id] = makeCard(r.name, r.id);
}

// overwrite with a real photo wherever one exists
for (const [p, url] of Object.entries(photos)) {
  foodImages[p.split('/').pop().split('.')[0]] = url;
}

// use this in the card component instead of foodImages[meal.id]
export const getFoodImage = (meal) =>
  foodImages[meal.id] ?? makeCard(meal.name, meal.id);