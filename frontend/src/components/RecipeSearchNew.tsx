// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
// This file can be deleted - content moved to RecipeSearch.tsx
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  Clock, 
  Users, 
  Star,
  Heart,
  Share2,
  Crown,
  ChefHat,
  AlertTriangle,
  Shield,
  Zap,
  ShieldAlert,
  Target,
  Brain,
  TrendingUp,
  Filter,
  UserCheck,
  Stethoscope
} from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FindDietician } from './FindDietician';
import { FoodProfiles } from './FoodProfiles';

interface RecipeSearchProps {
  user: any;
  safeZone: boolean;
}

export function RecipeSearch({ user, safeZone }: RecipeSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ingredients, setIngredients] = useState('');
  const [localSafeZone, setLocalSafeZone] = useState(safeZone);
  const [viewMode, setViewMode] = useState<'smart' | 'gallery'>('gallery'); // Changed default to gallery

  // Mock recipe data
  const recipes = [
    {
      id: 1,
      title: 'Mediterranean Quinoa Bowl',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop',
      cookTime: 25,
      servings: 2,
      calories: 420,
      rating: 4.8,
      difficulty: 'Easy',
      category: 'healthy',
      ingredients: ['quinoa', 'chickpeas', 'tomatoes', 'cucumber', 'olive oil'],
      author: 'Chef Maria',
      isPremium: false
    },
    {
      id: 2,
      title: 'Grilled Salmon with Vegetables',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=200&fit=crop',
      cookTime: 30,
      servings: 4,
      calories: 350,
      rating: 4.9,
      difficulty: 'Medium',
      category: 'protein',
      ingredients: ['salmon', 'broccoli', 'asparagus', 'lemon', 'garlic'],
      author: 'Chef John',
      isPremium: false
    },
    {
      id: 3,
      title: 'Loaded Bacon Cheeseburger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
      cookTime: 20,
      servings: 1,
      calories: 850,
      rating: 4.3,
      difficulty: 'Easy',
      category: 'comfort',
      ingredients: ['beef patty', 'bacon', 'cheese', 'bun', 'fries'],
      author: 'Chef Mike',
      isPremium: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Recipes' },
    { id: 'healthy', label: 'Healthy' },
    { id: 'protein', label: 'High Protein' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'comfort', label: 'Comfort Food' }
  ];

  const isHighCalorie = (calories: number) => {
    return calories > (user.dailyCalorieTarget * 0.4);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ingredientBasedRecipes = recipes.filter(recipe => {
    if (!ingredients.trim()) return false;
    const userIngredients = ingredients.toLowerCase().split(',').map(ing => ing.trim());
    return userIngredients.some(userIng => 
      recipe.ingredients.some(recipeIng => recipeIng.toLowerCase().includes(userIng))
    );
  });

  const RecipeCard = ({ recipe }: { recipe: any }) => {
    const isExcessive = isHighCalorie(recipe.calories);
    
    return (
      <Card`}>
        <View>
          <ImageWithFallback 
            src={recipe.image} 
            alt={recipe.title}
           
          />
          
          {localSafeZone && isExcessive && (
            <Badge>
              <AlertTriangle />
              High Cal
            </Badge>
          )}
          
          {recipe.isPremium && (
            <Badge bg-yellow-500 text-yellow-900`}>
              <Crown />
              Premium
            </Badge>
          )}
        </View>
        
        <CardContent>
          <View>
            <h3>{recipe.title}</h3>
            <View>
              <Star />
              {recipe.rating}
            </View>
          </View>
          
          <Text>by {recipe.author}</Text>
          
          <View>
            <View>
              <Clock />
              {recipe.cookTime}m
            </View>
            <View>
              <Users />
              {recipe.servings}
            </View>
            <View`}>
              <Zap`} />
              {recipe.calories} cal
            </View>
          </View>
          
          {localSafeZone && isExcessive && (
            <Alert>
              <AlertTriangle />
              <AlertDescription>
                This recipe is high in calories for your current goals.
              </AlertDescription>
            </Alert>
          )}
          
          <View>
            {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
              <Badge key={index} variant="secondary">
                {ingredient}
              </Badge>
            ))}
            {recipe.ingredients.length > 3 && (
              <Badge variant="secondary">
                +{recipe.ingredients.length - 3} more
              </Badge>
            )}
          </View>
          
          <TouchableOpacity 
            
            disabled={recipe.isPremium && !user.isPremium}
            variant={localSafeZone && isExcessive ? "outline" : "default"}
          >
            {recipe.isPremium && !user.isPremium ? 'Premium Recipe' : 
             localSafeZone && isExcessive ? 'View with Caution' : 'View Recipe'}
          </TouchableOpacity>
        </CardContent>
      </Card>
    );
  };

  return (
    <View>
      <View>
        <View>
          <View>
            <h1>Recipe Discovery</h1>
            <Badge variant="secondary">
              {filteredRecipes.length} recipes
            </Badge>
          </View>
          <Text>
            Find recipes, dieticians, and manage family food profiles
          </Text>
        </View>
        
        <View>
          <View>
            {localSafeZone ? <Shield /> : <ShieldAlert />}
            <Text>Safe Zone</Text>
          </View>
          <Text>
            <TextInput
              type="checkbox"
              checked={localSafeZone}
              onChange={(e) => setLocalSafeZone(e.target.checked)}
             
            />
            <View></View>
          </Text>
        </View>
      </View>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">Browse Recipes</TabsTrigger>
          <TabsTrigger value="ingredients" disabled={!user.isPremium}>
            <Crown />
            By Ingredients {!user.isPremium && '(Premium)'}
          </TabsTrigger>
          <TabsTrigger value="dietician">
            <Stethoscope />
            Find Dietician
          </TabsTrigger>
          <TabsTrigger value="profiles">
            <UserCheck />
            Food Profiles
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse">
          <Card>
            <CardContent>
              <View>
                <View>
                  <View>
                    <Search />
                    <TextInput
                      placeholder="Search recipes or ingredients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                     
                    />
                  </View>
                </View>
                <View>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      onPress={() => setSelectedCategory(category.id)}
                    >
                      {category.label}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </CardContent>
          </Card>

          <View>
            <View>
              <h2>
                {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
              </h2>
            </View>
            <View>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </View>
          </View>
        </TabsContent>

        <TabsContent value="ingredients">
          {user.isPremium ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>
                    <ChefHat />
                    Find Recipes by Your Ingredients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <View>
                    <View>
                      <Text>
                        What ingredients do you have? (comma separated)
                      </Text>
                      <TextInput
                        placeholder="e.g. chicken, tomatoes, garlic, onions"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                      />
                    </View>
                    <Text>
                      Enter the ingredients you have available, and we'll find recipes that use them!
                    </Text>
                  </View>
                </CardContent>
              </Card>

              {ingredients.trim() && (
                <View>
                  <h2>
                    Recipes using your ingredients ({ingredientBasedRecipes.length} found)
                  </h2>
                  <View>
                    {ingredientBasedRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </View>
                </View>
              )}
            </>
          ) : (
            <Card>
              <CardContent>
                <Crown />
                <h3>Premium Feature</h3>
                <Text>
                  Upgrade to Premium to search for recipes based on ingredients you have at home.
                </Text>
                <TouchableOpacity>Upgrade to Premium</TouchableOpacity>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="dietician">
          <FindDietician user={user} />
        </TabsContent>

        <TabsContent value="profiles">
          <FoodProfiles user={user} />
        </TabsContent>
      </Tabs>
    </View>
  );
}