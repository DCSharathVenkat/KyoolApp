import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  Keyboard
} from 'react-native';
import Modal from 'react-native-modal';

interface DebugTextInputProps {
  visible: boolean;
  onClose: () => void;
}

export function DebugTextInput({ visible, onClose }: DebugTextInputProps) {
  const [text, setText] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const textInputRef = useRef<TextInput>(null);
  
  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
    addLog(`Text changed to: "${newText}"`);
  };

  const handleFocus = () => {
    addLog('TextInput focused');
  };

  const handleBlur = () => {
    addLog('TextInput blurred');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      addLog('Keyboard shown');
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      addLog('Keyboard hidden');
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  const focusInput = () => {
    textInputRef.current?.focus();
    addLog('Manually focused input');
  };

  const clearText = () => {
    setText('');
    addLog('Text cleared');
  };

  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      avoidKeyboard={true}
      onBackdropPress={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Debug TextInput</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.subtitle}>Test TextInput:</Text>
          <TextInput
            ref={textInputRef}
            style={styles.textInput}
            value={text}
            onChangeText={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Type here and watch the logs..."
            multiline={true}
          />
          
          <View style={styles.controls}>
            <TouchableOpacity onPress={focusInput} style={styles.button}>
              <Text>Focus Input</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearText} style={styles.button}>
              <Text>Clear Text</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Current Text:</Text>
          <Text style={styles.debugText}>"{text}"</Text>
          <Text style={styles.debugText}>Length: {text.length}</Text>

          <Text style={styles.subtitle}>Event Logs:</Text>
          {logs.map((log, index) => (
            <Text key={index} style={styles.logText}>{log}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  content: {
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  controls: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  debugText: {
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    marginVertical: 2,
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#666',
    marginVertical: 1,
  },
});