import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface SimpleTextInputTestProps {
  visible: boolean;
  onClose: () => void;
}

export function SimpleTextInputTest({ visible, onClose }: SimpleTextInputTestProps) {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
        
        <Text style={styles.label}>Test Text Input:</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type here to test..."
          multiline
        />
        
        <Text style={styles.label}>Test Email Input:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email test..."
          keyboardType="email-address"
        />
        
        <Text>Text: {text}</Text>
        <Text>Email: {email}</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minHeight: 40,
  },
});