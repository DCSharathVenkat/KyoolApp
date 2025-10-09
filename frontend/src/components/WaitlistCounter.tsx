import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
        ))}
        <View style={styles.moreIndicator}>
          <Text style={styles.moreText}>+{Math.max(0, count - 4)}</Text>
        </View>
      </View>
      <Text style={styles.waitlistText}>
        Join <Text style={styles.countText}>{count}</Text> health enthusiasts already on the waitlist
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -8,
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarEmoji: {
    fontSize: 16,
  },
  moreIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  moreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  waitlistText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  countText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});