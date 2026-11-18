// src/recipes.js
//
// dietType values: "vegan" | "veg" | "eggetarian" | "non_veg"
//   vegan      -> no animal products
//   veg        -> vegetarian (dairy ok, no egg)
//   eggetarian -> vegetarian + eggs
//   non_veg    -> meat / fish / seafood
// goal values: "lose_weight" | "maintain" | "gain_muscle"
// type values: "breakfast" | "lunch" | "dinner"
// Always use "cup" (never "cups") so the grocery list can merge quantities.

const rawRecipes = [
  // --- INDIAN / PAKISTANI ---
  { id: 1, name: "Masala Omelette", time: 10, type: "breakfast", goal: "lose_weight", cuisine: "indian", dietType: "eggetarian", ingredients: [{name: "Eggs", qty: 2, unit: "whole"}, {name: "Onion", qty: 1, unit: "whole"}] },
  { id: 2, name: "Chicken Keema", time: 25, type: "breakfast", goal: "gain_muscle", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Minced Chicken", qty: 250, unit: "g"}, {name: "Onion", qty: 1, unit: "whole"}] },
  { id: 3, name: "Chicken Curry & Rice", time: 35, type: "lunch", goal: "maintain", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 500, unit: "g"}, {name: "White Rice", qty: 200, unit: "g"}] },
  { id: 4, name: "Mutton Rogan Josh", time: 60, type: "dinner", goal: "gain_muscle", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Mutton", qty: 500, unit: "g"}, {name: "Yogurt", qty: 1, unit: "cup"}] },
  { id: 5, name: "Fish Curry & Rice", time: 30, type: "lunch", goal: "lose_weight", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Fish", qty: 400, unit: "g"}, {name: "White Rice", qty: 150, unit: "g"}] },
  { id: 6, name: "Tandoori Chicken", time: 40, type: "dinner", goal: "lose_weight", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 500, unit: "g"}, {name: "Yogurt", qty: 0.5, unit: "cup"}] },
  { id: 7, name: "Egg Bhurji", time: 15, type: "breakfast", goal: "lose_weight", cuisine: "indian", dietType: "eggetarian", ingredients: [{name: "Eggs", qty: 3, unit: "whole"}, {name: "Onion", qty: 1, unit: "whole"}] },
  { id: 8, name: "Chicken Biryani", time: 45, type: "dinner", goal: "gain_muscle", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 500, unit: "g"}, {name: "White Rice", qty: 300, unit: "g"}] },
  { id: 9, name: "Prawn Masala", time: 25, type: "dinner", goal: "lose_weight", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Prawns", qty: 300, unit: "g"}, {name: "Onion", qty: 1, unit: "whole"}] },
  { id: 10, name: "Chicken Karahi", time: 30, type: "dinner", goal: "maintain", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 500, unit: "g"}, {name: "Tomato", qty: 4, unit: "whole"}, {name: "Ginger", qty: 1, unit: "tbsp"}] },
  { id: 11, name: "Keema Matar", time: 30, type: "lunch", goal: "maintain", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Minced Beef", qty: 300, unit: "g"}, {name: "Peas", qty: 1, unit: "cup"}] },
  { id: 12, name: "Dal & Roti", time: 25, type: "lunch", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Lentils", qty: 1, unit: "cup"}, {name: "Roti", qty: 4, unit: "whole"}] },
  { id: 13, name: "Chana Masala", time: 30, type: "lunch", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Chickpeas", qty: 1, unit: "can"}, {name: "Tomato", qty: 2, unit: "whole"}] },
  { id: 14, name: "Aloo Gobi", time: 25, type: "dinner", goal: "maintain", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Potatoes", qty: 2, unit: "whole"}, {name: "Cauliflower", qty: 1, unit: "head"}] },
  { id: 15, name: "Paneer Tikka", time: 20, type: "dinner", goal: "gain_muscle", cuisine: "indian", dietType: "veg", ingredients: [{name: "Paneer", qty: 250, unit: "g"}, {name: "Yogurt", qty: 0.5, unit: "cup"}] },
  { id: 16, name: "Palak Paneer", time: 35, type: "lunch", goal: "maintain", cuisine: "indian", dietType: "veg", ingredients: [{name: "Paneer", qty: 200, unit: "g"}, {name: "Spinach", qty: 300, unit: "g"}] },
  { id: 17, name: "Rajma Chawal", time: 40, type: "lunch", goal: "maintain", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Kidney Beans", qty: 1, unit: "can"}, {name: "White Rice", qty: 150, unit: "g"}] },
  { id: 18, name: "Bhindi Masala", time: 20, type: "lunch", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Okra", qty: 300, unit: "g"}, {name: "Onion", qty: 1, unit: "whole"}] },
  { id: 19, name: "Chole Bhature", time: 40, type: "breakfast", goal: "gain_muscle", cuisine: "indian", dietType: "veg", ingredients: [{name: "Chickpeas", qty: 1, unit: "can"}, {name: "Flour", qty: 2, unit: "cup"}] },
  { id: 20, name: "Baingan Bharta", time: 30, type: "dinner", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Eggplant", qty: 1, unit: "whole"}, {name: "Tomato", qty: 2, unit: "whole"}] },
  { id: 21, name: "Poha", time: 10, type: "breakfast", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Flattened Rice", qty: 2, unit: "cup"}, {name: "Onion", qty: 1, unit: "whole"}] },

  // --- ASIAN ---
  { id: 22, name: "Chicken Noodle Soup", time: 20, type: "dinner", goal: "lose_weight", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Chicken Breast", qty: 200, unit: "g"}, {name: "Noodles", qty: 100, unit: "g"}] },
  { id: 23, name: "Teriyaki Salmon", time: 20, type: "dinner", goal: "maintain", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Salmon", qty: 200, unit: "g"}, {name: "Soy Sauce", qty: 2, unit: "tbsp"}] },
  { id: 24, name: "Chicken Stir-fry", time: 15, type: "lunch", goal: "lose_weight", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Chicken Breast", qty: 200, unit: "g"}, {name: "Broccoli", qty: 1, unit: "head"}] },
  { id: 25, name: "Beef & Broccoli", time: 25, type: "dinner", goal: "gain_muscle", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Beef", qty: 300, unit: "g"}, {name: "Broccoli", qty: 1, unit: "head"}] },
  { id: 26, name: "Kung Pao Chicken", time: 25, type: "lunch", goal: "maintain", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Chicken Breast", qty: 250, unit: "g"}, {name: "Peanuts", qty: 0.25, unit: "cup"}] },
  { id: 27, name: "Thai Basil Chicken", time: 20, type: "dinner", goal: "lose_weight", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Minced Chicken", qty: 250, unit: "g"}, {name: "Basil", qty: 1, unit: "cup"}] },
  { id: 28, name: "Gyudon (Beef Bowl)", time: 20, type: "lunch", goal: "gain_muscle", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Beef", qty: 200, unit: "g"}, {name: "White Rice", qty: 150, unit: "g"}] },
  { id: 29, name: "Chicken Adobo", time: 35, type: "dinner", goal: "maintain", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 500, unit: "g"}, {name: "Soy Sauce", qty: 3, unit: "tbsp"}] },
  { id: 30, name: "Miso Soup & Rice", time: 10, type: "breakfast", goal: "lose_weight", cuisine: "asian", dietType: "vegan", ingredients: [{name: "Miso Paste", qty: 2, unit: "tbsp"}, {name: "Tofu", qty: 100, unit: "g"}] },
  { id: 31, name: "Egg Fried Rice", time: 15, type: "lunch", goal: "lose_weight", cuisine: "asian", dietType: "eggetarian", ingredients: [{name: "White Rice", qty: 150, unit: "g"}, {name: "Eggs", qty: 2, unit: "whole"}] },
  { id: 32, name: "Mapo Tofu", time: 20, type: "dinner", goal: "lose_weight", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Tofu", qty: 200, unit: "g"}, {name: "Minced Pork", qty: 100, unit: "g"}] },
  { id: 33, name: "Veg Hakka Noodles", time: 20, type: "lunch", goal: "maintain", cuisine: "asian", dietType: "vegan", ingredients: [{name: "Noodles", qty: 150, unit: "g"}, {name: "Cabbage", qty: 100, unit: "g"}] },
  { id: 34, name: "Thai Green Curry", time: 30, type: "dinner", goal: "maintain", cuisine: "asian", dietType: "vegan", ingredients: [{name: "Coconut Milk", qty: 1, unit: "can"}, {name: "Tofu", qty: 200, unit: "g"}] },
  { id: 35, name: "Bibimbap (Egg)", time: 25, type: "lunch", goal: "maintain", cuisine: "asian", dietType: "eggetarian", ingredients: [{name: "White Rice", qty: 150, unit: "g"}, {name: "Eggs", qty: 1, unit: "whole"}] },
  { id: 36, name: "Tofu Veggie Stir-fry", time: 20, type: "dinner", goal: "maintain", cuisine: "asian", dietType: "vegan", ingredients: [{name: "Tofu", qty: 200, unit: "g"}, {name: "Broccoli", qty: 1, unit: "head"}] },

  // --- WESTERN ---
  { id: 37, name: "Overnight Oats", time: 5, type: "breakfast", goal: "lose_weight", cuisine: "western", dietType: "vegan", ingredients: [{name: "Oats", qty: 0.5, unit: "cup"}, {name: "Honey", qty: 1, unit: "tbsp"}] },
  { id: 38, name: "Greek Yogurt Bowl", time: 5, type: "breakfast", goal: "lose_weight", cuisine: "western", dietType: "veg", ingredients: [{name: "Greek Yogurt", qty: 1, unit: "cup"}] },
  { id: 39, name: "Protein Pancakes", time: 15, type: "breakfast", goal: "gain_muscle", cuisine: "western", dietType: "eggetarian", ingredients: [{name: "Eggs", qty: 2, unit: "whole"}, {name: "Oats", qty: 0.5, unit: "cup"}] },
  { id: 40, name: "Avocado Toast & Eggs", time: 10, type: "breakfast", goal: "maintain", cuisine: "western", dietType: "eggetarian", ingredients: [{name: "Bread", qty: 2, unit: "slices"}, {name: "Avocado", qty: 1, unit: "whole"}, {name: "Eggs", qty: 2, unit: "whole"}] },
  { id: 41, name: "Tuna Salad Wrap", time: 10, type: "lunch", goal: "lose_weight", cuisine: "western", dietType: "non_veg", ingredients: [{name: "Tuna", qty: 1, unit: "can"}, {name: "Tortilla", qty: 1, unit: "whole"}] },
  { id: 42, name: "Chicken & Quinoa", time: 20, type: "lunch", goal: "maintain", cuisine: "western", dietType: "non_veg", ingredients: [{name: "Chicken Breast", qty: 200, unit: "g"}, {name: "Quinoa", qty: 0.5, unit: "cup"}] },
  { id: 43, name: "Steak & Potato", time: 25, type: "lunch", goal: "gain_muscle", cuisine: "western", dietType: "non_veg", ingredients: [{name: "Steak", qty: 250, unit: "g"}, {name: "Potatoes", qty: 2, unit: "whole"}] },
  { id: 44, name: "Grilled Cheese", time: 10, type: "lunch", goal: "maintain", cuisine: "western", dietType: "veg", ingredients: [{name: "Bread", qty: 2, unit: "slices"}, {name: "Cheese", qty: 2, unit: "slices"}] },
  { id: 45, name: "Pasta with Tomato Sauce", time: 15, type: "dinner", goal: "maintain", cuisine: "western", dietType: "vegan", ingredients: [{name: "Pasta", qty: 150, unit: "g"}, {name: "Tomato Sauce", qty: 1, unit: "cup"}] },
  { id: 46, name: "Baked Salmon & Veggies", time: 25, type: "dinner", goal: "lose_weight", cuisine: "western", dietType: "non_veg", ingredients: [{name: "Salmon", qty: 200, unit: "g"}, {name: "Asparagus", qty: 1, unit: "bunch"}] },

  // --- MIDDLE EASTERN ---
  { id: 47, name: "Shakshuka", time: 20, type: "breakfast", goal: "maintain", cuisine: "middle_eastern", dietType: "eggetarian", ingredients: [{name: "Eggs", qty: 2, unit: "whole"}, {name: "Tomato", qty: 3, unit: "whole"}] },
  { id: 48, name: "Hummus & Pita", time: 10, type: "lunch", goal: "maintain", cuisine: "middle_eastern", dietType: "vegan", ingredients: [{name: "Hummus", qty: 0.5, unit: "cup"}, {name: "Pita Bread", qty: 1, unit: "whole"}] },
  { id: 49, name: "Falafel Bowl", time: 25, type: "lunch", goal: "maintain", cuisine: "middle_eastern", dietType: "vegan", ingredients: [{name: "Falafel", qty: 4, unit: "pieces"}, {name: "Quinoa", qty: 0.5, unit: "cup"}] },
  { id: 50, name: "Chicken Shawarma", time: 30, type: "dinner", goal: "gain_muscle", cuisine: "middle_eastern", dietType: "non_veg", ingredients: [{name: "Chicken Breast", qty: 300, unit: "g"}, {name: "Pita Bread", qty: 1, unit: "whole"}] },
  { id: 51, name: "Lentil Soup", time: 25, type: "dinner", goal: "lose_weight", cuisine: "middle_eastern", dietType: "vegan", ingredients: [{name: "Lentils", qty: 1, unit: "cup"}, {name: "Carrots", qty: 2, unit: "whole"}] },

  // --- MEXICAN ---
  { id: 52, name: "Breakfast Tacos", time: 15, type: "breakfast", goal: "gain_muscle", cuisine: "mexican", dietType: "eggetarian", ingredients: [{name: "Tortilla", qty: 2, unit: "whole"}, {name: "Eggs", qty: 2, unit: "whole"}] },
  { id: 53, name: "Beef Burrito Bowl", time: 20, type: "lunch", goal: "gain_muscle", cuisine: "mexican", dietType: "non_veg", ingredients: [{name: "Ground Beef", qty: 200, unit: "g"}, {name: "White Rice", qty: 150, unit: "g"}] },
  { id: 54, name: "Bean Quesadilla", time: 10, type: "lunch", goal: "lose_weight", cuisine: "mexican", dietType: "veg", ingredients: [{name: "Tortilla", qty: 1, unit: "whole"}, {name: "Beans", qty: 0.5, unit: "can"}, {name: "Cheese", qty: 2, unit: "slices"}] },
  { id: 55, name: "Chicken Fajitas", time: 25, type: "dinner", goal: "maintain", cuisine: "mexican", dietType: "non_veg", ingredients: [{name: "Chicken Breast", qty: 250, unit: "g"}, {name: "Bell Pepper", qty: 1, unit: "whole"}] },
  { id: 56, name: "Fish Tacos", time: 20, type: "dinner", goal: "lose_weight", cuisine: "mexican", dietType: "non_veg", ingredients: [{name: "White Fish", qty: 200, unit: "g"}, {name: "Tortilla", qty: 2, unit: "whole"}] },
  // Added to fill vegan/veg gaps in Mexican
  { id: 106, name: "Bean & Avocado Tortilla", time: 10, type: "breakfast", goal: "maintain", cuisine: "mexican", dietType: "vegan", ingredients: [{name: "Tortilla", qty: 1, unit: "whole"}, {name: "Beans", qty: 0.5, unit: "can"}, {name: "Avocado", qty: 1, unit: "whole"}] },
  { id: 107, name: "Black Bean Burrito Bowl", time: 20, type: "lunch", goal: "maintain", cuisine: "mexican", dietType: "vegan", ingredients: [{name: "Beans", qty: 1, unit: "can"}, {name: "White Rice", qty: 150, unit: "g"}] },
  { id: 108, name: "Veggie Fajitas", time: 25, type: "dinner", goal: "lose_weight", cuisine: "mexican", dietType: "vegan", ingredients: [{name: "Bell Pepper", qty: 2, unit: "whole"}, {name: "Onion", qty: 1, unit: "whole"}, {name: "Tortilla", qty: 2, unit: "whole"}] },

  // --- PAKISTANI HOME COOKING ---
  { id: 80, name: "White Channy", time: 30, type: "breakfast", goal: "maintain", cuisine: "indian", dietType: "vegan", ingredients: [{name: "White Chickpeas", qty: 1, unit: "cup"}, {name: "Onion", qty: 1, unit: "whole"}, {name: "Spices", qty: 1, unit: "tbsp"}] },
  { id: 81, name: "Black Channy", time: 35, type: "breakfast", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Black Chickpeas", qty: 1, unit: "cup"}, {name: "Tomato", qty: 2, unit: "whole"}, {name: "Spices", qty: 1, unit: "tbsp"}] },
  { id: 82, name: "Mash Daal", time: 25, type: "lunch", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "White Lentils", qty: 1, unit: "cup"}, {name: "Onion", qty: 1, unit: "whole"}] },
  { id: 83, name: "Moong Daal", time: 20, type: "lunch", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Moong Lentils", qty: 1, unit: "cup"}, {name: "Spices", qty: 1, unit: "tsp"}] },
  { id: 84, name: "Masar Daal", time: 25, type: "lunch", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Red Lentils", qty: 1, unit: "cup"}, {name: "Tomato", qty: 1, unit: "whole"}] },
  { id: 85, name: "Chana Daal", time: 30, type: "lunch", goal: "maintain", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Split Chickpeas", qty: 1, unit: "cup"}, {name: "Onion", qty: 1, unit: "whole"}] },
  // id 86 (duplicate Chicken Karahi) removed; its ginger/tomato details merged into id 10
  { id: 87, name: "Aloo Matar Chicken", time: 35, type: "dinner", goal: "maintain", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 300, unit: "g"}, {name: "Potatoes", qty: 2, unit: "whole"}, {name: "Peas", qty: 1, unit: "cup"}] },
  { id: 88, name: "Aloo Gosht", time: 60, type: "dinner", goal: "gain_muscle", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Mutton", qty: 500, unit: "g"}, {name: "Potatoes", qty: 3, unit: "whole"}, {name: "Spices", qty: 2, unit: "tbsp"}] },
  { id: 89, name: "Nihari", time: 60, type: "dinner", goal: "gain_muscle", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Beef", qty: 500, unit: "g"}, {name: "Flour", qty: 2, unit: "tbsp"}, {name: "Spices", qty: 2, unit: "tbsp"}] },
  { id: 90, name: "Haleem", time: 60, type: "dinner", goal: "gain_muscle", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Beef", qty: 300, unit: "g"}, {name: "Wheat", qty: 0.5, unit: "cup"}, {name: "Lentils", qty: 0.5, unit: "cup"}] },
  { id: 91, name: "Chicken Chany", time: 35, type: "lunch", goal: "maintain", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 300, unit: "g"}, {name: "Chickpeas", qty: 1, unit: "can"}, {name: "Spices", qty: 1, unit: "tbsp"}] },
  { id: 92, name: "White Chicken", time: 30, type: "dinner", goal: "lose_weight", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken Breast", qty: 500, unit: "g"}, {name: "Yogurt", qty: 1, unit: "cup"}, {name: "Cream", qty: 2, unit: "tbsp"}] },
  { id: 93, name: "Chicken Manchurian", time: 30, type: "dinner", goal: "maintain", cuisine: "asian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 500, unit: "g"}, {name: "Soy Sauce", qty: 3, unit: "tbsp"}, {name: "Flour", qty: 2, unit: "tbsp"}] },
  { id: 94, name: "Chicken Pulao", time: 35, type: "lunch", goal: "maintain", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 500, unit: "g"}, {name: "White Rice", qty: 250, unit: "g"}, {name: "Spices", qty: 1, unit: "tbsp"}] },
  { id: 95, name: "Chicken Biryani", time: 45, type: "lunch", goal: "maintain", cuisine: "indian", dietType: "non_veg", ingredients: [{name: "Chicken", qty: 500, unit: "g"}, {name: "White Rice", qty: 300, unit: "g"}, {name: "Yogurt", qty: 0.5, unit: "cup"}] },
  { id: 96, name: "Mix Veg Rice", time: 25, type: "lunch", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "White Rice", qty: 200, unit: "g"}, {name: "Carrots", qty: 2, unit: "whole"}, {name: "Peas", qty: 1, unit: "cup"}] },
  { id: 97, name: "Tinda", time: 20, type: "dinner", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Tinda", qty: 500, unit: "g"}, {name: "Tomato", qty: 2, unit: "whole"}] },
  { id: 98, name: "Kaddu", time: 25, type: "dinner", goal: "maintain", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Pumpkin", qty: 500, unit: "g"}, {name: "Spices", qty: 1, unit: "tsp"}] },
  { id: 99, name: "Loki", time: 25, type: "dinner", goal: "lose_weight", cuisine: "indian", dietType: "vegan", ingredients: [{name: "Bottle Gourd", qty: 500, unit: "g"}, {name: "Onion", qty: 1, unit: "whole"}] },
  { id: 100, name: "Aloo Paratha", time: 25, type: "breakfast", goal: "gain_muscle", cuisine: "indian", dietType: "veg", ingredients: [{name: "Potatoes", qty: 2, unit: "whole"}, {name: "Flour", qty: 2, unit: "cup"}] },
  { id: 101, name: "Mooli Paratha", time: 25, type: "breakfast", goal: "maintain", cuisine: "indian", dietType: "veg", ingredients: [{name: "Radish", qty: 1, unit: "whole"}, {name: "Flour", qty: 2, unit: "cup"}] },
  { id: 102, name: "Egg Fry Paratha", time: 15, type: "breakfast", goal: "maintain", cuisine: "indian", dietType: "eggetarian", ingredients: [{name: "Eggs", qty: 2, unit: "whole"}, {name: "Flour", qty: 1, unit: "cup"}] },
  { id: 103, name: "Omelette Paratha", time: 15, type: "breakfast", goal: "gain_muscle", cuisine: "indian", dietType: "eggetarian", ingredients: [{name: "Eggs", qty: 2, unit: "whole"}, {name: "Flour", qty: 1, unit: "cup"}] },
  { id: 104, name: "Bread Omelette", time: 10, type: "breakfast", goal: "lose_weight", cuisine: "western", dietType: "eggetarian", ingredients: [{name: "Bread", qty: 2, unit: "slices"}, {name: "Eggs", qty: 2, unit: "whole"}] },
  { id: 105, name: "Slice Jam", time: 5, type: "breakfast", goal: "maintain", cuisine: "western", dietType: "vegan", ingredients: [{name: "Bread", qty: 2, unit: "slices"}, {name: "Jam", qty: 2, unit: "tbsp"}] }
];

// Recipes whose quantities are written for ~4 people. Everything else is for 2.
// Adjust these numbers to match how you wrote the quantities.
const FOUR_SERVING_IDS = new Set([3, 4, 6, 8, 10, 29, 88, 89, 92, 93, 94, 95]);

export const allRecipes = rawRecipes.map((r) => ({
  ...r,
  servings: FOUR_SERVING_IDS.has(r.id) ? 4 : 2,
}));