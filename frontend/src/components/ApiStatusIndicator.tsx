import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { checkBackendHealth, getApiConfig } from '../api/api_config';

export function ApiStatusIndicator() {
  const [status, setStatus] = useState('checking');
  const [config, setConfig] = useState(null);
  const [lastCheck, setLastCheck] = useState(null);

  const checkStatus = async () => {
    setStatus('checking');
    const isHealthy = await checkBackendHealth();
    setStatus(isHealthy ? 'connected' : 'disconnected');
    setLastCheck(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    setConfig(getApiConfig());
    checkStatus();
    
    // Check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return '#10B981';
      case 'disconnected': return '#EF4444';
      case 'checking': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return 'cloud-done-outline';
      case 'disconnected': return 'cloud-offline-outline';
      case 'checking': return 'cloud-outline';
      default: return 'help-circle-outline';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return 'Real-time data active';
      case 'disconnected': return config?.fallbackToMock ? 'Using demo data' : 'Backend offline';
      case 'checking': return 'Checking connection...';
      default: return 'Unknown status';
    }
  };

  if (!config) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.statusRow} onPress={checkStatus}>
        <Ionicons 
          name={getStatusIcon()} 
          size={16} 
          color={getStatusColor()} 
        />
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
        <Ionicons name="refresh-outline" size={14} color="#6B7280" />
      </TouchableOpacity>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>
          API: {config.isProduction ? 'Production' : 'Local'}
        </Text>
        <Text style={styles.detailText}>
          Mode: {config.useRealData ? 'Real-time' : 'Demo'} data
        </Text>
        {lastCheck && (
          <Text style={styles.detailText}>
            Last check: {lastCheck}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    margin: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  details: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  detailText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
});