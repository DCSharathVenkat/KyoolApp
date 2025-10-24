// Recipe API service for Kyool App
import { apiRequest, USE_REAL_DATA, FALLBACK_TO_MOCK } from './api_config';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://kyool-backend-606917950237.us-central1.run.app';

// Mock recipe data for now since backend recipe API is minimal
const MOCK_RECIPES = [
  {
    id: 1,
    name: "Mediterranean Quinoa Bowl",
    category: "healthy",
    cuisine: "Mediterranean",
    difficulty: "Easy",
    cookTime: 25,
    prepTime: 15,
    totalTime: 40,
    servings: 2,
    calories: 420,
    protein: 18,
    carbs: 45,
    fat: 14,
    fiber: 8,
    sugar: 6,
    sodium: 340,
    rating: 4.8,
    reviewCount: 245,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "1 cup quinoa",
      "2 cups vegetable broth",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 red onion, thinly sliced",
      "1/2 cup kalamata olives",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup fresh parsley, chopped",
      "2 tbsp olive oil",
      "2 tbsp lemon juice",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Rinse quinoa and cook in vegetable broth according to package instructions",
      "Let quinoa cool to room temperature",
      "Combine cucumber, tomatoes, red onion, and olives in a large bowl",
      "Add cooled quinoa to the vegetable mixture",
      "Whisk together olive oil, lemon juice, oregano, salt, and pepper",
      "Pour dressing over quinoa mixture and toss to combine",
      "Top with feta cheese and fresh parsley",
      "Serve immediately or chill for 30 minutes"
    ],
    tags: ["vegetarian", "gluten-free", "mediterranean", "high-protein", "meal-prep"],
    author: "Chef Maria",
    dateCreated: "2024-09-15",
    nutritionScore: 9.2,
    isHealthy: true,
    allergens: ["dairy"],
    dietaryRestrictions: ["vegetarian", "gluten-free"]
  },
  {
    id: 2,
    name: "Grilled Salmon with Asparagus",
    category: "protein",
    cuisine: "American",
    difficulty: "Medium",
    cookTime: 20,
    prepTime: 10,
    totalTime: 30,
    servings: 2,
    calories: 350,
    protein: 35,
    carbs: 8,
    fat: 22,
    fiber: 4,
    sugar: 4,
    sodium: 280,
    rating: 4.9,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "1 lb fresh asparagus, trimmed",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 lemon, sliced",
      "2 tbsp fresh dill, chopped",
      "1 tbsp honey",
      "1 tbsp soy sauce",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat grill to medium-high heat",
      "Mix olive oil, garlic, honey, and soy sauce in a bowl",
      "Season salmon fillets with salt and pepper",
      "Brush salmon with half of the oil mixture",
      "Toss asparagus with remaining oil mixture",
      "Grill salmon for 4-5 minutes per side",
      "Grill asparagus for 8-10 minutes, turning occasionally",
      "Serve with lemon slices and fresh dill"
    ],
    tags: ["high-protein", "low-carb", "omega-3", "grilled", "healthy"],
    author: "Chef Alex",
    dateCreated: "2024-09-10",
    nutritionScore: 9.5,
    isHealthy: true,
    allergens: ["fish", "soy"],
    dietaryRestrictions: ["pescatarian", "low-carb", "keto-friendly"]
  },
  {
    id: 3,
    name: "Green Power Smoothie",
    category: "breakfast",
    cuisine: "American",
    difficulty: "Easy",
    cookTime: 0,
    prepTime: 5,
    totalTime: 5,
    servings: 1,
    calories: 280,
    protein: 20,
    carbs: 35,
    fat: 8,
    fiber: 12,
    sugar: 22,
    sodium: 150,
    rating: 4.7,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1551334787-21e6bd2d3a1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "1 cup fresh spinach",
      "1 banana, frozen",
      "1/2 avocado",
      "1 cup unsweetened almond milk",
      "1 scoop vanilla protein powder",
      "1 tbsp almond butter",
      "1 tsp honey",
      "1/2 cup ice cubes",
      "1 tbsp chia seeds"
    ],
    instructions: [
      "Add almond milk to blender first",
      "Add spinach and blend until smooth",
      "Add banana, avocado, and protein powder",
      "Add almond butter, honey, and chia seeds",
      "Blend on high for 60 seconds",
      "Add ice cubes and blend until smooth",
      "Pour into a tall glass and serve immediately"
    ],
    tags: ["smoothie", "high-protein", "vegan", "breakfast", "post-workout"],
    author: "Nutritionist Sarah",
    dateCreated: "2024-09-12",
    nutritionScore: 9.0,
    isHealthy: true,
    allergens: ["nuts"],
    dietaryRestrictions: ["vegan", "dairy-free", "gluten-free"]
  },
  {
    id: 4,
    name: "Spicy Thai Chicken Curry",
    category: "dinner",
    cuisine: "Thai",
    difficulty: "Medium",
    cookTime: 25,
    prepTime: 15,
    totalTime: 40,
    servings: 4,
    calories: 380,
    protein: 28,
    carbs: 12,
    fat: 26,
    fiber: 3,
    sugar: 8,
    sodium: 580,
    rating: 4.6,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "1 lb chicken thighs, cut into chunks",
      "1 can (14 oz) coconut milk",
      "2 tbsp red curry paste",
      "1 bell pepper, sliced",
      "1 onion, sliced",
      "2 cloves garlic, minced",
      "1 tbsp ginger, minced",
      "2 tbsp fish sauce",
      "1 tbsp brown sugar",
      "1 Thai chili, minced",
      "Fresh basil leaves",
      "Lime wedges for serving"
    ],
    instructions: [
      "Heat oil in a large pan over medium-high heat",
      "Add curry paste and cook for 1 minute until fragrant",
      "Add chicken and cook until browned",
      "Add coconut milk, fish sauce, and brown sugar",
      "Simmer for 15 minutes until chicken is cooked",
      "Add bell pepper, onion, garlic, and ginger",
      "Cook for 5 more minutes until vegetables are tender",
      "Garnish with basil and serve with lime wedges"
    ],
    tags: ["spicy", "thai", "coconut", "curry", "dinner"],
    author: "Chef Thai",
    dateCreated: "2024-09-08",
    nutritionScore: 7.8,
    isHealthy: true,
    allergens: ["fish"],
    dietaryRestrictions: ["gluten-free", "dairy-free"]
  },
  {
    id: 5,
    name: "Chocolate Protein Overnight Oats",
    category: "breakfast",
    cuisine: "American",
    difficulty: "Easy",
    cookTime: 0,
    prepTime: 5,
    totalTime: 485, // 8 hours overnight + 5 min prep
    servings: 1,
    calories: 320,
    protein: 22,
    carbs: 42,
    fat: 8,
    fiber: 10,
    sugar: 12,
    sodium: 120,
    rating: 4.5,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1571881349852-5bc4de0e8dff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    ingredients: [
      "1/2 cup rolled oats",
      "1 scoop chocolate protein powder",
      "1 tbsp chia seeds",
      "1 tbsp cocoa powder",
      "1 cup unsweetened almond milk",
      "1 tbsp maple syrup",
      "1/2 banana, sliced",
      "1 tbsp almond butter",
      "1 tsp vanilla extract",
      "Pinch of salt"
    ],
    instructions: [
      "Mix oats, protein powder, chia seeds, and cocoa powder in a jar",
      "Add almond milk, maple syrup, and vanilla extract",
      "Stir well to combine all ingredients",
      "Add sliced banana and almond butter on top",
      "Cover and refrigerate overnight (at least 4 hours)",
      "Stir before eating and add more milk if needed",
      "Enjoy cold or warm slightly in microwave"
    ],
    tags: ["overnight-oats", "chocolate", "high-protein", "meal-prep", "breakfast"],
    author: "Fitness Coach Mike",
    dateCreated: "2024-09-05",
    nutritionScore: 8.5,
    isHealthy: true,
    allergens: ["nuts"],
    dietaryRestrictions: ["vegetarian", "dairy-free", "gluten-free"]
  }
];

const RECIPE_CATEGORIES = [
  { id: 'all', name: 'All Recipes', count: 125 },
  { id: 'breakfast', name: 'Breakfast', count: 25 },
  { id: 'lunch', name: 'Lunch', count: 35 },
  { id: 'dinner', name: 'Dinner', count: 40 },
  { id: 'healthy', name: 'Healthy', count: 85 },
  { id: 'protein', name: 'High Protein', count: 45 },
  { id: 'vegetarian', name: 'Vegetarian', count: 30 },
  { id: 'low-carb', name: 'Low Carb', count: 28 },
  { id: 'quick', name: 'Quick (Under 30min)', count: 55 }
];

// Get all recipes with optional filtering
export async function getRecipes(options = {}) {
  const result = await apiRequest('/recipes');
  
  if (result.success) {
    // Apply filtering to real data
    let recipes = result.data.recipes || result.data;
    return applyRecipeFilters(recipes, options);
  }
  
  if (!FALLBACK_TO_MOCK) {
    throw new Error('Real-time recipe data unavailable');
  }
  
  console.log('📱 Using mock recipes as fallback');
  return applyRecipeFilters(MOCK_RECIPES, options);
}

// Helper function to apply filters
function applyRecipeFilters(recipes, options) {
  let filteredRecipes = [...recipes];

  if (options.category && options.category !== 'all') {
    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.category === options.category || 
      recipe.tags?.includes(options.category)
    );
  }

  if (options.search) {
    const searchLower = options.search.toLowerCase();
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchLower) ||
      recipe.ingredients?.some(ing => ing.toLowerCase().includes(searchLower)) ||
      recipe.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  if (options.maxCalories) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.calories <= options.maxCalories);
  }

  if (options.minProtein) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.protein >= options.minProtein);
  }

  if (options.dietary) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      recipe.dietaryRestrictions?.includes(options.dietary)
    );
  }

  // Sort by rating by default
  filteredRecipes.sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return filteredRecipes.slice(0, options.limit || 50);
}

// Get recipe by ID
export async function getRecipeById(id) {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${id}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock recipe');
  }

  return MOCK_RECIPES.find(recipe => recipe.id === parseInt(id));
}

// Get recipe categories
export async function getRecipeCategories() {
  try {
    const response = await fetch(`${BASE_URL}/recipes/categories`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock categories');
  }

  return RECIPE_CATEGORIES;
}

// Search recipes by ingredients (Premium feature)
export async function searchRecipesByIngredients(ingredients) {
  if (!ingredients || ingredients.length === 0) return [];

  try {
    const response = await fetch(`${BASE_URL}/recipes/search-by-ingredients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients })
    });
    
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock ingredient search');
  }

  // Mock ingredient-based search
  const ingredientsLower = ingredients.map(ing => ing.toLowerCase());
  return MOCK_RECIPES.filter(recipe => 
    recipe.ingredients.some(recipeIng =>
      ingredientsLower.some(searchIng => 
        recipeIng.toLowerCase().includes(searchIng)
      )
    )
  ).slice(0, 10);
}

// Get nutritional analysis for a recipe
export async function getRecipeNutrition(recipeId) {
  const recipe = await getRecipeById(recipeId);
  if (!recipe) return null;

  return {
    calories: recipe.calories,
    protein: recipe.protein,
    carbs: recipe.carbs,
    fat: recipe.fat,
    fiber: recipe.fiber,
    sugar: recipe.sugar,
    sodium: recipe.sodium,
    nutritionScore: recipe.nutritionScore,
    isHealthy: recipe.isHealthy,
    macroBreakdown: {
      proteinPercent: Math.round((recipe.protein * 4 / recipe.calories) * 100),
      carbsPercent: Math.round((recipe.carbs * 4 / recipe.calories) * 100),
      fatPercent: Math.round((recipe.fat * 9 / recipe.calories) * 100)
    }
  };
}

// Save recipe to user favorites
export async function saveRecipeToFavorites(userId, recipeId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId })
    });
    return response.ok;
  } catch (error) {
    console.log('Backend not available, simulating save to favorites');
    return true;
  }
}

// Get user's favorite recipes
export async function getUserFavoriteRecipes(userId) {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/favorites`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log('Backend not available, using mock favorites');
  }

  // Return some mock favorites
  return MOCK_RECIPES.slice(0, 3);
}