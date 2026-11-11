// src/mealPlanner.js
import { allRecipes } from './recipes.js';

export function generatePlan(profile) {
  const { goal, cuisine, dietType, healthCondition } = profile;
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const fullWeekPlan = [];

  let baseRecipes = allRecipes;

  const medicalRules = {
    diabetes: ['White Rice', 'Honey', 'Sugar', 'Potatoes', 'Bread', 'Flattened Rice', 'Fruit Juice'],
    pcos: ['White Rice', 'Honey', 'Sugar', 'Bread', 'Roti', 'Potatoes', 'Flattened Rice'],
    bp: ['Salt', 'Soy Sauce', 'Pickles', 'Papad', 'Processed Meat', 'Chips'],
    cholesterol: ['Butter', 'Ghee', 'Mutton', 'Beef', 'Cheese', 'Fried Food', 'Cream'],
    ibs: ['Onion', 'Garlic', 'Beans', 'Lentils', 'Chickpeas', 'Milk', 'Cream', 'Spicy Chili']
  };

  if (healthCondition && healthCondition !== 'none' && medicalRules[healthCondition]) {
    const badIngredients = medicalRules[healthCondition];
    baseRecipes = baseRecipes.filter(recipe => {
      return !recipe.ingredients.some(ing => 
        badIngredients.some(bad => ing.name.toLowerCase().includes(bad.toLowerCase()))
      );
    });
  }

  if (cuisine && cuisine !== 'any') {
    baseRecipes = baseRecipes.filter(r => r.cuisine === cuisine);
  }
  
  if (dietType === 'veg') {
    baseRecipes = baseRecipes.filter(r => r.dietType === 'veg' || r.dietType === 'vegan');
  }

  const goalMatches = baseRecipes.filter(r => r.goal === goal);
  const finalRecipePool = goalMatches.length >= 5 ? goalMatches : baseRecipes;

  let breakfasts = finalRecipePool.filter(r => r.type === 'breakfast');
  let lunches = finalRecipePool.filter(r => r.type === 'lunch');
  let dinners = finalRecipePool.filter(r => r.type === 'dinner');

  const pickUnique = (list, fallbackList) => {
    let sourceList = list.length > 0 ? list : fallbackList;
    if (sourceList.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * sourceList.length);
    const picked = sourceList[randomIndex];
    if (list.length > 0) list.splice(randomIndex, 1);
    return picked;
  };

  days.forEach((day) => {
    const meals = [];
    const b = pickUnique(breakfasts, finalRecipePool);
    const l = pickUnique(lunches, finalRecipePool);
    const d = pickUnique(dinners, finalRecipePool);

    if (b) meals.push(b);
    if (l) meals.push(l);
    if (d) meals.push(d);

    fullWeekPlan.push({ day, meals });
  });

  return fullWeekPlan;
}