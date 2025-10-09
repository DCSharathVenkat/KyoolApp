// React Native Tabs Component
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface TabsProps {
  className?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children?: React.ReactNode;
}

interface TabsTriggerProps {
  className?: string;
  value: string;
  children?: React.ReactNode;
  onPress?: () => void;
  isActive?: boolean;
}

interface TabsContentProps {
  className?: string;
  value: string;
  children?: React.ReactNode;
  isActive?: boolean;
}

const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

function Tabs({ className, defaultValue = '', value, onValueChange, children, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(value || defaultValue);

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab: value || activeTab, setActiveTab: handleTabChange }}>
      <View style={styles.tabs} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <View style={styles.tabsList} {...props}>
      {children}
    </View>
  );
}

function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <TouchableOpacity
      style={[styles.tabsTrigger, isActive && styles.tabsTriggerActive]}
      onPress={() => setActiveTab(value)}
      {...props}
    >
      <Text style={[styles.tabsTriggerText, isActive && styles.tabsTriggerTextActive]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  const { activeTab } = React.useContext(TabsContext);
  
  if (activeTab !== value) {
    return null;
  }

  return (
    <View style={styles.tabsContent} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flex: 1,
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tabsTrigger: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabsTriggerActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabsTriggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  tabsTriggerTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  tabsContent: {
    flex: 1,
  },
});

export { Tabs, TabsList, TabsTrigger, TabsContent };
