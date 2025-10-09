// React Native Input Component
import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  className?: string;
  type?: string;
}

function Input({ className, type, style, ...props }: InputProps) {
  let keyboardType: TextInputProps['keyboardType'] = 'default';
  let secureTextEntry = false;

  // Map HTML input types to React Native keyboard types
  switch (type) {
    case 'email':
      keyboardType = 'email-address';
      break;
    case 'number':
      keyboardType = 'numeric';
      break;
    case 'tel':
      keyboardType = 'phone-pad';
      break;
    case 'password':
      secureTextEntry = true;
      break;
  }

  return (
    <TextInput
      style={[styles.input, style]}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#999"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#333',
    minHeight: 44,
  },
});

export { Input };
