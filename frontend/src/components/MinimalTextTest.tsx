import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';

export function MinimalTextTest() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minimal TextInput Test</Text>
      
      <Text style={styles.label}>Single Line Input:</Text>
      <TextInput
        style={styles.input}
        value={text1}
        onChangeText={setText1}
        placeholder="Type here..."
      />
      <Text>Value: {text1}</Text>
      
      <Text style={styles.label}>Multi Line Input:</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={text2}
        onChangeText={setText2}
        placeholder="Type multiple lines..."
        multiline={true}
        numberOfLines={4}
      />
      <Text>Value: {text2}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});