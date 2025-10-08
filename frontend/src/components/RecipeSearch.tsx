import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
  Switch,
  Alert as RNAlert,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as RecipeAPI from '../api/recipe_api';

const { width } = Dimensions.get('window');

interface RecipeSearchProps {
  user: any;
  safeZone: boolean;
}

export function RecipeSearch({ user, safeZone }: RecipeSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ingredients, setIngredients] = useState('');
  const [localSafeZone, setLocalSafeZone] = useState(safeZone);
  const [activeTab, setActiveTab] = useState('browse');

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
    },
    {
      id: 4,
      title: 'Avocado Toast Supreme',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300&h=200&fit=crop',
      cookTime: 10,
      servings: 1,
      calories: 280,
      rating: 4.5,
      difficulty: 'Easy',
      category: 'breakfast',
      ingredients: ['avocado', 'bread', 'eggs', 'tomato', 'lime'],
      author: 'Chef Sarah',
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
    return calories > (user?.dailyCalorieTarget || 2000) * 0.4;
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
      <View style={styles.recipeCard}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: recipe.image }} 
            style={styles.recipeImage}
            resizeMode="cover"
          />
          
          {localSafeZone && isExcessive && (
            <View style={[styles.badge, styles.warningBadge]}>
              <Ionicons name="warning" size={12} color="#D97706" />
              <Text style={styles.warningBadgeText}>High Cal</Text>
            </View>
          )}
          
          {recipe.isPremium && (
            <View style={[styles.badge, styles.premiumBadge]}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          )}
        </View>
        
        <View style={styles.recipeContent}>
          <View style={styles.recipeHeader}>
            <Text style={styles.recipeTitle} numberOfLines={2}>{recipe.title}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.rating}>{recipe.rating}</Text>
            </View>
          </View>
          
          <Text style={styles.author}>by {recipe.author}</Text>
          
          <View style={styles.recipeStats}>
            <View style={styles.statItem}>
              <Ionicons name="time" size={14} color="#6B7280" />
              <Text style={styles.statText}>{recipe.cookTime}m</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people" size={14} color="#6B7280" />
              <Text style={styles.statText}>{recipe.servings}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flash" size={14} color="#6B7280" />
              <Text style={styles.statText}>{recipe.calories} cal</Text>
            </View>
          </View>
          
          {localSafeZone && isExcessive && (
            <View style={styles.warningAlert}>
              <Ionicons name="warning" size={16} color="#D97706" />
              <Text style={styles.warningText}>
                This recipe is high in calories for your current goals.
              </Text>
            </View>
          )}
          
          <View style={styles.ingredientsContainer}>
            {recipe.ingredients.slice(0, 3).map((ingredient: string, index: number) => (
              <View key={index} style={styles.ingredientTag}>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
            {recipe.ingredients.length > 3 && (
              <View style={styles.ingredientTag}>
                <Text style={styles.ingredientText}>+{recipe.ingredients.length - 3} more</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={[
              styles.viewButton,
              (recipe.isPremium && !user?.isPremium) ? styles.disabledButton : 
              (localSafeZone && isExcessive) ? styles.cautionButton : styles.primaryButton
            ]}
            disabled={recipe.isPremium && !user?.isPremium}
            onPress={() => RNAlert.alert('Recipe', `Opening ${recipe.title}`)}
          >
            <Text style={[
              styles.buttonText,
              (recipe.isPremium && !user?.isPremium) ? styles.disabledButtonText : 
              (localSafeZone && isExcessive) ? styles.cautionButtonText : styles.primaryButtonText
            ]}>
              {recipe.isPremium && !user?.isPremium ? 'Premium Recipe' : 
               localSafeZone && isExcessive ? 'View with Caution' : 'View Recipe'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const TabButton = ({ id, title, icon, isPremium = false }: any) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === id && styles.activeTabButton]}
      onPress={() => setActiveTab(id)}
      disabled={isPremium && !user?.isPremium}
    >
      <Ionicons 
        name={icon} 
        size={16} 
        color={activeTab === id ? '#3B82F6' : isPremium && !user?.isPremium ? '#9CA3AF' : '#6B7280'} 
      />
      <Text style={[
        styles.tabButtonText, 
        activeTab === id && styles.activeTabButtonText,
        isPremium && !user?.isPremium && styles.disabledTabText
      ]}>
        {title}
        {isPremium && !user?.isPremium && ' (Premium)'}
      </Text>
    </TouchableOpacity>
  );

  const CategoryButton = ({ category }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.activeCategoryButton
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === category.id && styles.activeCategoryButtonText
      ]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#3B82F6', '#1E40AF']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Recipe Discovery</Text>
            <View style={styles.recipeCount}>
              <Text style={styles.recipeCountText}>{filteredRecipes.length} recipes</Text>
            </View>
          </View>
          <Text style={styles.headerSubtitle}>
            Find recipes, dieticians, and manage family food profiles
          </Text>
        </View>
        
        <View style={styles.safeZoneToggle}>
          <View style={styles.safeZoneInfo}>
            <Ionicons 
              name={localSafeZone ? "shield-checkmark" : "shield-outline"} 
              size={20} 
              color="white" 
            />
            <Text style={styles.safeZoneText}>Safe Zone</Text>
          </View>
          <Switch
            value={localSafeZone}
            onValueChange={setLocalSafeZone}
            trackColor={{ false: 'rgba(255,255,255,0.3)', true: 'rgba(255,255,255,0.5)' }}
            thumbColor={localSafeZone ? '#10B981' : '#F3F4F6'}
          />
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScrollView}>
          <TabButton id="browse" title="Browse" icon="search" />
          <TabButton id="ingredients" title="By Ingredients" icon="restaurant" isPremium />
          <TabButton id="dietician" title="Find Dietician" icon="medical" />
          <TabButton id="profiles" title="Food Profiles" icon="person" />
        </ScrollView>
      </View>

      {/* Tab Content */}
      {activeTab === 'browse' && (
        <View style={styles.tabContent}>
          {/* Search and Filters */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search recipes or ingredients..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {categories.map((category) => (
                <CategoryButton key={category.id} category={category} />
              ))}
            </ScrollView>
          </View>

          {/* Results */}
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>
              {filteredRecipes.length} Recipe{filteredRecipes.length !== 1 ? 's' : ''} Found
            </Text>
            <View style={styles.recipesGrid}>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </View>
          </View>
        </View>
      )}

      {activeTab === 'ingredients' && (
        <View style={styles.tabContent}>
          {user?.isPremium ? (
            <>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <Ionicons name="restaurant" size={24} color="#3B82F6" />
                  <Text style={styles.cardTitle}>Find Recipes by Your Ingredients</Text>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.inputLabel}>
                    What ingredients do you have? (comma separated)
                  </Text>
                  <TextInput
                    style={styles.textArea}
                    placeholder="e.g. chicken, tomatoes, garlic, onions"
                    value={ingredients}
                    onChangeText={setIngredients}
                    multiline
                    numberOfLines={3}
                    placeholderTextColor="#9CA3AF"
                  />
                  <Text style={styles.helpText}>
                    Enter the ingredients you have available, and we'll find recipes that use them!
                  </Text>
                </View>
              </View>

              {ingredients.trim() && (
                <View style={styles.resultsSection}>
                  <Text style={styles.resultsTitle}>
                    Recipes using your ingredients ({ingredientBasedRecipes.length} found)
                  </Text>
                  <View style={styles.recipesGrid}>
                    {ingredientBasedRecipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </View>
                </View>
              )}
            </>
          ) : (
            <View style={styles.premiumCard}>
              <Ionicons name="star" size={48} color="#F59E0B" />
              <Text style={styles.premiumTitle}>Premium Feature</Text>
              <Text style={styles.premiumDescription}>
                Upgrade to Premium to search for recipes based on ingredients you have at home.
              </Text>
              <TouchableOpacity style={styles.premiumButton}>
                <Text style={styles.premiumButtonText}>Upgrade to Premium</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {activeTab === 'dietician' && (
        <View style={styles.tabContent}>
          <View style={styles.comingSoonCard}>
            <Ionicons name="medical" size={48} color="#8B5CF6" />
            <Text style={styles.comingSoonTitle}>Find Dietician</Text>
            <Text style={styles.comingSoonDescription}>
              Connect with certified dieticians and nutritionists for personalized meal planning.
            </Text>
            <Text style={styles.comingSoonText}>Coming Soon!</Text>
          </View>
        </View>
      )}

      {activeTab === 'profiles' && (
        <View style={styles.tabContent}>
          <View style={styles.comingSoonCard}>
            <Ionicons name="person" size={48} color="#10B981" />
            <Text style={styles.comingSoonTitle}>Food Profiles</Text>
            <Text style={styles.comingSoonDescription}>
              Manage dietary preferences and restrictions for family members.
            </Text>
            <Text style={styles.comingSoonText}>Coming Soon!</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  recipeCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  recipeCountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  safeZoneToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
  },
  safeZoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeZoneText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabScrollView: {
    paddingHorizontal: 20,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F3F4F6',
  },
  activeTabButton: {
    backgroundColor: '#EBF4FF',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  activeTabButtonText: {
    color: '#3B82F6',
    fontWeight: '500',
  },
  disabledTabText: {
    color: '#9CA3AF',
  },
  tabContent: {
    padding: 20,
  },
  searchSection: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesContainer: {
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activeCategoryButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6B7280',
  },
  activeCategoryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  resultsSection: {
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  recipesGrid: {
    gap: 16,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  recipeImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  warningBadge: {
    backgroundColor: '#FEF3C7',
  },
  warningBadgeText: {
    color: '#D97706',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  premiumBadge: {
    backgroundColor: '#FEF3C7',
    top: 12,
    left: 12,
  },
  premiumBadgeText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  recipeContent: {
    padding: 16,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  author: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  recipeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  warningAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  warningText: {
    flex: 1,
    fontSize: 12,
    color: '#D97706',
    marginLeft: 8,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  ingredientTag: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ingredientText: {
    fontSize: 12,
    color: '#6B7280',
  },
  viewButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  cautionButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D97706',
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  primaryButtonText: {
    color: 'white',
  },
  cautionButtonText: {
    color: '#D97706',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  cardContent: {
    gap: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  helpText: {
    fontSize: 12,
    color: '#6B7280',
  },
  premiumCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 12,
  },
  premiumDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  premiumButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  premiumButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  comingSoonCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 12,
  },
  comingSoonDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8B5CF6',
  },
});