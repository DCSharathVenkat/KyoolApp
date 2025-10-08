// AUTO-GENERATED-TO-NATIVE: This file was created by tools/convert-web-to-native.js
// Manual fixes likely required: styles, icons, routing, third-party web-only APIs
import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';

export function WaitlistCounter() {
  const [count, setCount] = useState(0);
  const targetCount = 237;

  useEffect(() => {
    let current = 0;
    const increment = targetCount / 50; // Animation over ~1 second
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setCount(targetCount);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <View>
        {[1, 2, 3, 4].map((i) => (
          <View
            key={i}
           
          >
            <Text>👤</Text>
          </View>
        ))}
      </View>
      <Text>Join <Text>{count}</Text> executives already on the waitlist</Text>
    </View>
  );
}