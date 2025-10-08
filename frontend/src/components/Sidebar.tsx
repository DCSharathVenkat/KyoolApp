// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Link, useLocation } // TODO: react-router-dom import removed - convert to React Navigation or platform-specific routing
import { Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { 
  Home, 
  Heart, 
  Droplets, 
  ChefHat, 
  Dumbbell, 
  User,
  Crown,
  LogOut,
  Smartphone,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  user: any;
  onLogout?: () => void;
}

export function Sidebar({ user, onLogout }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { id: 'activity', label: 'Activity', icon: Home, path: '/dashboard' },
    { id: 'search', label: 'Search Users', icon: Search, path: '/search' },
    { id: 'features', label: 'Features', icon: Sparkles, path: '/features' },
    { id: 'health', label: 'Health Metrics', icon: Heart, path: '/health' },
    { id: 'water', label: 'Water Tracker', icon: Droplets, path: '/water' },
    { id: 'recipes', label: 'Recipes', icon: ChefHat, path: '/recipes' },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell, path: '/fitness' },
    { id: 'devices', label: 'Connected Devices', icon: Smartphone, path: '/devices' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  const SidebarContent = () => (
    <>
      <View />

      {/* User header wrapped in Link */}
      <Link
        to="/profile"
        title="Open profile"
        onPress={() => setIsMobileMenuOpen(false)}
       
      >
        <View>
          <Avatar>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <View>
            <Text>{user.name}</Text>
            <View>
              <Text>
                {user.isPremium ? 'Premium' : 'Free'}
              </Text>
              {user.isPremium && <Crown />}
            </View>
          </View>
        </View>
      </Link>

      {/* Nav items */}
      <View>
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <Link
                  to={item.path}
                 `}
                  title={item.label}
                  onPress={() => setIsMobileMenuOpen(false)}
                >
                  <Icon />
                  <Text>{item.label}</Text>
                </Link>
              </li>
            );
          })}
        </ul>
      </View>

      {/* Footer actions */}
      <View>
        {!user.isPremium && (
          <View>
            <View>
              <Crown />
              <Text>Upgrade to Premium</Text>
            </View>
            <Text>
              Get ingredient-based recipes and unlimited access
            </Text>
            <TouchableOpacity>
              <Text>Upgrade Now</Text>
              <Text>Upgrade</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {onLogout && (
          <TouchableOpacity
            onPress={onLogout}
           
            title="Sign Out"
          >
            <LogOut />
            <Text>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <TouchableOpacity
        variant="ghost"
        size="icon"
       
        onPress={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </TouchableOpacity>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <View 
         
          onPress={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <View>
        <SidebarContent />
      </View>

      {/* Mobile Sidebar */}
      <View
      `}>
        <View>
          <SidebarContent />
        </View>
      </View>
    </>
  );
}
