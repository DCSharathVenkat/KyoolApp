// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Progress } from './ui/progress';
import { 
  Plus, 
  Minus, 
  Bell, 
  Watch,
  Smartphone,
  Activity,
  Zap,
  Target,
  Shield,
  ShieldAlert,
  Footprints,
  Apple,
  CheckCircle2,
  Users,
  Circle,
  Scale
} from 'lucide-react';
import { Switch } from './ui/switch';
import { motion } from 'motion/react';

interface HeaderProps {
  user: any;
  activeTab: string;
  safeZone: boolean;
  setSafeZone: (value: boolean) => void;
}

export function Header({ user, activeTab, safeZone, setSafeZone }: HeaderProps) {
  const [waterIntake, setWaterIntake] = useState(6);
  const [dailyGoal] = useState(8);
  const [lastReminder, setLastReminder] = useState<Date | null>(null);
  const [connectedDevices, setConnectedDevices] = useState([
    { name: 'Apple Watch Series 9', type: 'watch', connected: true, battery: 85 },
    { name: 'iPhone 15 Pro', type: 'phone', connected: true, battery: 73 },
    { name: 'Fitbit Charge 6', type: 'fitness', connected: false, battery: 0 }
  ]);

  // Mock real-time data from devices
  const [realtimeData, setRealtimeData] = useState({
    steps: 8547,
    heartRate: 72,
    calories: 1650,
    activeMinutes: 45
  });

  // Water reminder system
  useEffect(() => {
    const checkReminder = () => {
      const now = new Date();
      const hoursSinceLastReminder = lastReminder 
        ? (now.getTime() - lastReminder.getTime()) / (1000 * 60 * 60)
        : 2; // Assume 2 hours since last reminder if none

      if (hoursSinceLastReminder >= 1) {
        // Show notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('💧 Hydration Reminder', {
            body: 'Time to drink some water! Stay hydrated.',
            icon: '/water-icon.png'
          });
        }
        setLastReminder(now);
      }
    };

    const interval = setInterval(checkReminder, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastReminder]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Mock device data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        ...prev,
        steps: prev.steps + Math.floor(Math.random() * 3),
        heartRate: 70 + Math.floor(Math.random() * 10),
        calories: prev.calories + Math.floor(Math.random() * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addWater = () => {
    if (waterIntake < 15) {
      setWaterIntake(waterIntake + 1);
    }
  };

  const removeWater = () => {
    if (waterIntake > 0) {
      setWaterIntake(Math.max(waterIntake - 1, 0));
    }
  };

  const waterPercentage = (waterIntake / dailyGoal) * 100;

  const getTabTitle = () => {
    switch (activeTab) {
      case 'activity': return 'Activity';
      case 'health': return 'Health Metrics';
      case 'water': return 'Water Tracker';
      case 'recipes': return 'Recipes';
      case 'fitness': return 'Fitness';
      case 'profile': return 'Profile';
      default: return 'Home';
    }
  };

  // Today's goals data
  const todaysGoals = [
    { 
      id: 'water', 
      label: 'Drink water', 
      current: waterIntake, 
      target: dailyGoal, 
      unit: 'glasses',
      completed: waterIntake >= dailyGoal,
      icon: () => <View />,
      color: 'text-blue-500'
    },
    { 
      id: 'steps', 
      label: 'Walk steps', 
      current: realtimeData.steps, 
      target: 10000, 
      unit: 'steps',
      completed: realtimeData.steps >= 10000,
      icon: Footprints,
      color: 'text-green-500'
    },
    { 
      id: 'calories', 
      label: 'Stay under calories', 
      current: realtimeData.calories, 
      target: user.dailyCalorieTarget || 1800, 
      unit: 'cal',
      completed: realtimeData.calories <= (user.dailyCalorieTarget || 1800),
      icon: Apple,
      color: 'text-red-500'
    }
  ];

  const completedGoals = todaysGoals.filter(goal => goal.completed).length;

  // Mock active friends data
  const activeFriends = [
    { id: 1, name: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face', isOnline: true, lastActive: 'now' },
    { id: 2, name: 'Mike C.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face', isOnline: true, lastActive: '2 min ago' },
    { id: 3, name: 'Emma R.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face', isOnline: true, lastActive: '5 min ago' },
    { id: 4, name: 'Alex K.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face', isOnline: false, lastActive: '1 hour ago' },
    { id: 5, name: 'Lisa M.', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h-40&fit=crop&crop=face', isOnline: true, lastActive: 'now' },
    { id: 6, name: 'David L.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face', isOnline: false, lastActive: '3 hours ago' }
  ];

  const onlineFriends = activeFriends.filter(friend => friend.isOnline);

  return (
    <View>
      <View>
        {/* Left side - Today's Goals (where eyes go first) */}
        <View>
          <View>
            <View>
              <Text>H</Text>
            </View>
            <View>
            <h1>Health Hub</h1>
            <Text>Stay Healthy</Text>
          </View>
          </View>
          
          {/* Today's Goals - Friendly Design */}
          <View>
            <View>
              <Text>Today:</Text>
              <View>
                {todaysGoals.map((goal) => {
                  const Icon = goal.icon;
                  const percentage = Math.min((goal.current / goal.target) * 100, 100);
                  
                  return (
                    <View key={goal.id}>
                      {Icon ? <Icon`} /> : null}
                      <Text>
                        {goal.id === 'steps' ? goal.current.toLocaleString() : 
                         goal.id === 'water' ? (goal.current % 1 === 0 ? goal.current : goal.current.toFixed(1)) : 
                         goal.current}
                        <Text>/{goal.id === 'steps' ? goal.target.toLocaleString() : goal.target}</Text>
                      </Text>
                      {goal.completed && <CheckCircle2 />}
                    </View>
                  );
                })}
              </View>
            </View>
            
            {/* Goals Summary & Active Friends */}
            <View>
              <View>
                <Text>
                  {completedGoals}/3 completed 🎉
                </Text>
              </View>
              
              {/* Active Friends - Clickable */}
              <Popover>
                <PopoverTrigger asChild>
                  <TouchableOpacity
                    variant="ghost"
                   
                  >
                    <Users />
                    <Text>
                      {onlineFriends.length} online
                    </Text>
                  </TouchableOpacity>
                </PopoverTrigger>
                <PopoverContent align="end">
                  <View>
                    <View>
                      <View>
                        <Users />
                      </View>
                      <View>
                        <h4>Active Friends</h4>
                        <Text>
                          {onlineFriends.length} friends are online now
                        </Text>
                      </View>
                    </View>
                    
                    <View>
                      {activeFriends.map((friend) => (
                        <View key={friend.id}>
                          <View>
                            <View>
                              <Image  src={friend.avatar} alt={friend.name} />
                            </View>
                            {friend.isOnline && (
                              <Circle />
                            )}
                          </View>
                          <View>
                            <Text>{friend.name}</Text>
                            <View>
                              <View`} />
                              <Text>
                                {friend.isOnline ? 'Online' : `Last seen ${friend.lastActive}`}
                              </Text>
                            </View>
                          </View>
                          <View>
                            {friend.isOnline && (
                              <Text>
                                Active
                              </Text>
                            )}
                          </View>
                        </View>
                      ))}
                    </View>
                    
                    <View>
                      <TouchableOpacity>
                        View all friends
                      </TouchableOpacity>
                    </View>
                  </View>
                </PopoverContent>
              </Popover>
            </View>
          </View>
          
          {/* Page Badge */}
          {activeTab !== 'activity' && activeTab && (
            <Badge variant="secondary">
              {getTabTitle()}
            </Badge>
          )}
          
          {/* Safe Zone Toggle - Only show on recipes page */}
          {activeTab === 'recipes' && (
            <View>
              <motion.div
               `}
                animate={{ scale: safeZone ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {safeZone ? <Shield /> : <ShieldAlert />}
                <Text>Safe Zone</Text>
              </motion.div>
              <Switch
                checked={safeZone}
                onCheckedChange={setSafeZone}
               
              />
            </View>
          )}
        </View>

        {/* Right side - Quick stats and water widget */}
        <View>
          {/* Current Weight - Mobile Only */}
          <View>
            <Scale />
            <Text>{user.weight || '75'} kg</Text>
          </View>

          {/* Connected Devices Status - Desktop Only */}
          <View>
            {connectedDevices.filter(d => d.connected).map((device, index) => (
              <Popover key={index}>
                <PopoverTrigger asChild>
                  <TouchableOpacity variant="ghost" size="sm">
                    {device.type === 'watch' && <Watch />}
                    {device.type === 'phone' && <Smartphone />}
                    {device.type === 'fitness' && <Activity />}
                    <Text>{device.battery}%</Text>
                  </TouchableOpacity>
                </PopoverTrigger>
                <PopoverContent align="end">
                  <View>
                    <View>
                      <View />
                      <Text>{device.name}</Text>
                    </View>
                    <View>
                      <View>
                        <Text>Battery:</Text>
                        <Text>{device.battery}%</Text>
                      </View>
                      <Progress value={device.battery} />
                    </View>
                    <View>
                      <View>
                        <Text>Steps today:</Text>
                        <Text>{realtimeData.steps.toLocaleString()}</Text>
                      </View>
                      <View>
                        <Text>Heart rate:</Text>
                        <Text>{realtimeData.heartRate} bpm</Text>
                      </View>
                      <View>
                        <Text>Calories:</Text>
                        <Text>{realtimeData.calories}</Text>
                      </View>
                    </View>
                  </View>
                </PopoverContent>
              </Popover>
            ))}
          </View>

          {/* Quick Stats - Clickable */}
          <View>
            {/* Steps Tracker */}
            <Popover>
              <PopoverTrigger asChild>
                <TouchableOpacity
                  variant="ghost"
                 
                >
                  <Footprints />
                  <Text>{realtimeData.steps.toLocaleString()}</Text>
                  <Text>steps</Text>
                </TouchableOpacity>
              </PopoverTrigger>
              <PopoverContent align="end">
                <View>
                  <View>
                    <View>
                      <Footprints />
                    </View>
                    <View>
                      <h4>Daily Steps</h4>
                      <Text>
                        {realtimeData.steps.toLocaleString()} of 10,000 steps
                      </Text>
                    </View>
                  </View>
                  
                  <Progress value={(realtimeData.steps / 10000) * 100} />
                  
                  <View>
                    <View>
                      <Text>Distance</Text>
                      <View>{(realtimeData.steps * 0.0008).toFixed(1)} km</View>
                    </View>
                    <View>
                      <Text>Calories Burned</Text>
                      <View>{Math.round(realtimeData.steps * 0.04)}</View>
                    </View>
                  </View>
                  
                  <View>
                    <View>
                      <Text>Goal completion:</Text>
                      <Text>{Math.min(Math.round((realtimeData.steps / 10000) * 100), 100)}%</Text>
                    </View>
                  </View>
                </View>
              </PopoverContent>
            </Popover>

            {/* Calories Tracker */}
            <Popover>
              <PopoverTrigger asChild>
                <TouchableOpacity
                  variant="ghost"
                 
                >
                  <Apple />
                  <Text>{realtimeData.calories}</Text>
                  <Text>cal</Text>
                </TouchableOpacity>
              </PopoverTrigger>
              <PopoverContent align="end">
                <View>
                  <View>
                    <View>
                      <Apple />
                    </View>
                    <View>
                      <h4>Calories Today</h4>
                      <Text>
                        {realtimeData.calories} of {user.dailyCalorieTarget || 1800} target
                      </Text>
                    </View>
                  </View>
                  
                  <Progress value={(realtimeData.calories / (user.dailyCalorieTarget || 1800)) * 100} />
                  
                  <View>
                    <View>
                      <Text>Remaining</Text>
                      <View`}>
                        {(user.dailyCalorieTarget || 1800) - realtimeData.calories} cal
                      </View>
                    </View>
                    <View>
                      <Text>Burned</Text>
                      <View>{Math.round(realtimeData.steps * 0.04)} cal</View>
                    </View>
                  </View>
                  
                  <View>
                    <View>
                      <Text>Daily goal:</Text>
                      <Text>
                        {realtimeData.calories <= (user.dailyCalorieTarget || 1800) ? 'On track' : 'Over limit'}
                      </Text>
                    </View>
                  </View>
                </View>
              </PopoverContent>
            </Popover>
          </View>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <TouchableOpacity variant="ghost" size="icon">
                <Bell />
                <motion.div
                 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </TouchableOpacity>
            </PopoverTrigger>
            <PopoverContent align="end">
              <View>
                <h4>Notifications</h4>
                <View>
                  <View>
                    <View />
                    <View>
                      <Text>Hydration Reminder</Text>
                      <Text>Time to drink water! You're at {waterIntake}/{dailyGoal} glasses today.</Text>
                      <Text>5 minutes ago</Text>
                    </View>
                  </View>
                  <View>
                    <Target />
                    <View>
                      <Text>Step Goal Achieved</Text>
                      <Text>Congratulations! You've reached your 10K steps goal.</Text>
                      <Text>2 hours ago</Text>
                    </View>
                  </View>
                </View>
              </View>
            </PopoverContent>
          </Popover>

          {/* Realistic Water Bottle Widget - 64px height, 16px width */}
          <Popover>
            <PopoverTrigger asChild>
              <TouchableOpacity
                variant="ghost"
               
              >
                <View>
                  {/* Realistic Water Bottle - 16px width, 64px height */}
                  <View style={{ width: '16px', height: '64px' }}>
                    {/* Bottle outline with black border */}
                    <View>
                      {/* Bottle cap */}
                      <View />
                      
                      {/* Bottle neck */}
                      <View />
                      
                      {/* Main bottle body - realistic shape */}
                      <View
                           style={{ 
                             borderRadius: '0 0 8px 8px',
                             clipPath: 'polygon(10% 0%, 90% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)'
                           }}>
                        {/* Blue water fill */}
                        <motion.div
                         
                          style={{ 
                            height: `${Math.min(waterPercentage, 100)}%`,
                            borderRadius: '0 0 6px 6px'
                          }}
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.min(waterPercentage, 100)}%` }}
                          transition={{ duration: 0.5 }}
                        />
                        
                        {/* Water surface ripple effect */}
                        {waterPercentage > 0 && (
                          <motion.div
                           
                            style={{ bottom: `${Math.min(waterPercentage, 100)}%` }}
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                  
                  {/* Water count without droplet icon */}
                  <View>
                    {waterIntake % 1 === 0 ? waterIntake : waterIntake.toFixed(1)}/{dailyGoal}
                  </View>
                </View>
              </TouchableOpacity>
            </PopoverTrigger>
            <PopoverContent align="end">
              <View>
                <View>
                  <View>
                    <View />
                  </View>
                  <View>
                    <h4>Water Intake</h4>
                    <Text>
                      {waterIntake % 1 === 0 ? waterIntake : waterIntake.toFixed(1)} of {dailyGoal} glasses today
                    </Text>
                  </View>
                </View>
                
                <Progress value={waterPercentage} />
                
                <View>
                  <View>
                    {waterIntake * 250}ml / {dailyGoal * 250}ml
                  </View>
                  <Badge variant={waterPercentage >= 100 ? 'default' : 'secondary'}>
                    {waterPercentage.toFixed(0)}%
                  </Badge>
                </View>
                
                {/* Glass Amount Options */}
                <View>
                  <Text>Add water</Text>
                  <View>
                    <TouchableOpacity
                      variant="outline"
                      size="sm"
                      onPress={() => setWaterIntake(Math.min(waterIntake + 0.25, 15))}
                      disabled={waterIntake >= 15}
                     
                    >
                      <View>1/4</View>
                      <View>glass</View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      variant="outline"
                      size="sm"
                      onPress={() => setWaterIntake(Math.min(waterIntake + 0.5, 15))}
                      disabled={waterIntake >= 15}
                     
                    >
                      <View>1/2</View>
                      <View>glass</View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      variant="outline"
                      size="sm"
                      onPress={() => setWaterIntake(Math.min(waterIntake + 1, 15))}
                      disabled={waterIntake >= 15}
                     
                    >
                      <View>Full</View>
                      <View>glass</View>
                    </TouchableOpacity>
                  </View>
                </View>
                
                {/* Quick Actions */}
                <View>
                  <TouchableOpacity
                    variant="outline"
                    size="sm"
                    onPress={removeWater}
                    disabled={waterIntake <= 0}
                   
                  >
                    <Minus />
                    Remove
                  </TouchableOpacity>
                  <TouchableOpacity
                    size="sm"
                    onPress={addWater}
                    disabled={waterIntake >= 15}
                   
                  >
                    <Plus />
                    Add Glass
                  </TouchableOpacity>
                </View>
                
                <View>
                  Target: 2L (8 glasses) daily for optimal health
                </View>
              </View>
            </PopoverContent>
          </Popover>
        </View>
      </View>
    </View>
  );
}