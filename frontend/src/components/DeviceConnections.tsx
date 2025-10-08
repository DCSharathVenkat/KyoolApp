import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as HealthAPI from '../api/health_api';

const { width } = Dimensions.get('window');

interface DeviceConnectionsProps {
  user?: any;
}

interface Device {
  id: string;
  name: string;
  type: 'smartwatch' | 'phone' | 'fitness' | 'app';
  connected: boolean;
  battery?: number;
  lastSync: string;
  syncStatus: 'synced' | 'syncing' | 'disconnected' | 'available';
  features: string[];
  icon: string;
  color: string;
  data?: {
    heartRate?: number;
    steps?: number;
    activeCalories?: number;
    workouts?: number;
    flightsClimbed?: number;
    distanceWalked?: number;
  } | null;
}

export function DeviceConnections({ user }: DeviceConnectionsProps) {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'apple-watch',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      connected: true,
      battery: 85,
      lastSync: '2 minutes ago',
      syncStatus: 'synced',
      features: ['Heart Rate', 'Steps', 'Workout Detection', 'Sleep Tracking'],
      icon: 'watch',
      color: '#007AFF',
      data: {
        heartRate: 72,
        steps: 8547,
        activeCalories: 450,
        workouts: 1
      }
    },
    {
      id: 'iphone',
      name: 'iPhone 15 Pro',
      type: 'phone',
      connected: true,
      battery: 73,
      lastSync: '1 minute ago',
      syncStatus: 'synced',
      features: ['Health App Sync', 'HealthKit Integration', 'Location Services'],
      icon: 'phone-portrait',
      color: '#34C759',
      data: {
        steps: 8547,
        flightsClimbed: 12,
        distanceWalked: 6.2
      }
    },
    {
      id: 'fitbit',
      name: 'Fitbit Charge 6',
      type: 'fitness',
      connected: false,
      battery: 0,
      lastSync: 'Never',
      syncStatus: 'available',
      features: ['Heart Rate', 'Sleep Score', 'Stress Management', 'GPS'],
      icon: 'fitness',
      color: '#00B0B9',
      data: null
    },
    {
      id: 'garmin',
      name: 'Garmin Forerunner 955',
      type: 'smartwatch',
      connected: false,
      battery: 0,
      lastSync: 'Never',
      syncStatus: 'available',
      features: ['Advanced Running Metrics', 'VO2 Max', 'Training Status'],
      icon: 'watch',
      color: '#007CC3',
      data: null
    },
    {
      id: 'samsung-health',
      name: 'Samsung Health',
      type: 'app',
      connected: false,
      lastSync: 'Never',
      syncStatus: 'available',
      features: ['Step Tracking', 'Sleep Analysis', 'Nutrition Tracking'],
      icon: 'heart',
      color: '#1976D2',
      data: null
    },
    {
      id: 'google-fit',
      name: 'Google Fit',
      type: 'app',
      connected: false,
      lastSync: 'Never',
      syncStatus: 'available',
      features: ['Activity Tracking', 'Goal Setting', 'Insights'],
      icon: 'logo-google',
      color: '#4285F4',
      data: null
    }
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('connected');

  // Mock real-time data updates for connected devices
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prevDevices => 
        prevDevices.map(device => {
          if (device.connected && device.data) {
            return {
              ...device,
              data: {
                ...device.data,
                steps: device.data.steps ? device.data.steps + Math.floor(Math.random() * 3) : undefined,
                heartRate: device.data.heartRate ? 70 + Math.floor(Math.random() * 10) : undefined,
              },
              lastSync: 'Just now'
            };
          }
          return device;
        })
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleDeviceConnection = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;

    if (device.connected) {
      // Disconnect device
      Alert.alert(
        'Disconnect Device',
        `Are you sure you want to disconnect ${device.name}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Disconnect',
            style: 'destructive',
            onPress: () => {
              setDevices(prev => prev.map(d => 
                d.id === deviceId 
                  ? { ...d, connected: false, syncStatus: 'available', data: null, lastSync: 'Disconnected' }
                  : d
              ));
            }
          }
        ]
      );
    } else {
      // Connect device
      setDevices(prev => prev.map(d => 
        d.id === deviceId 
          ? { ...d, syncStatus: 'syncing' }
          : d
      ));

      // Simulate connection process
      setTimeout(() => {
        setDevices(prev => prev.map(d => 
          d.id === deviceId 
            ? { 
                ...d, 
                connected: true, 
                syncStatus: 'synced',
                lastSync: 'Just now',
                battery: Math.floor(Math.random() * 40) + 60, // Random battery 60-100%
                data: generateMockData(device.type)
              }
            : d
        ));
        Alert.alert('Connected!', `${device.name} has been successfully connected.`);
      }, 2000);
    }
  };

  const generateMockData = (deviceType: string) => {
    switch (deviceType) {
      case 'smartwatch':
        return {
          heartRate: 65 + Math.floor(Math.random() * 20),
          steps: 5000 + Math.floor(Math.random() * 5000),
          activeCalories: 200 + Math.floor(Math.random() * 300),
          workouts: Math.floor(Math.random() * 3)
        };
      case 'phone':
        return {
          steps: 5000 + Math.floor(Math.random() * 5000),
          flightsClimbed: Math.floor(Math.random() * 20),
          distanceWalked: 3 + Math.random() * 5
        };
      case 'fitness':
      case 'app':
        return {
          steps: 5000 + Math.floor(Math.random() * 5000),
          activeCalories: 200 + Math.floor(Math.random() * 300)
        };
      default:
        return null;
    }
  };

  const syncDevice = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device || !device.connected) return;

    setDevices(prev => prev.map(d => 
      d.id === deviceId 
        ? { ...d, syncStatus: 'syncing' }
        : d
    ));

    setTimeout(() => {
      setDevices(prev => prev.map(d => 
        d.id === deviceId 
          ? { ...d, syncStatus: 'synced', lastSync: 'Just now' }
          : d
      ));
      Alert.alert('Sync Complete', `${device.name} data has been updated.`);
    }, 1500);
  };

  const scanForDevices = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert('Scan Complete', 'Found 0 new devices in range.');
    }, 3000);
  };

  const connectedDevices = devices.filter(d => d.connected);
  const availableDevices = devices.filter(d => !d.connected);

  const renderDeviceCard = (device: Device) => (
    <View key={device.id} style={[styles.deviceCard, { borderLeftColor: device.color }]}>
      <View style={styles.deviceHeader}>
        <View style={styles.deviceIconContainer}>
          <Ionicons name={device.icon as any} size={24} color={device.color} />
          {device.connected && (
            <View style={[styles.statusIndicator, { backgroundColor: '#34C759' }]} />
          )}
        </View>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={styles.deviceType}>{device.type.charAt(0).toUpperCase() + device.type.slice(1)}</Text>
        </View>
        <View style={styles.deviceActions}>
          {device.battery !== undefined && device.connected && (
            <View style={styles.batteryInfo}>
              <Ionicons name="battery-half" size={16} color="#666" />
              <Text style={styles.batteryText}>{device.battery}%</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.deviceStatus}>
        <View style={styles.statusInfo}>
          <View style={[
            styles.statusDot, 
            { backgroundColor: device.connected ? '#34C759' : '#8E8E93' }
          ]} />
          <Text style={styles.statusText}>
            {device.syncStatus === 'syncing' ? 'Syncing...' :
             device.connected ? `Connected • ${device.lastSync}` : 'Not connected'}
          </Text>
        </View>
        {device.syncStatus === 'syncing' && (
          <ActivityIndicator size="small" color={device.color} />
        )}
      </View>

      {device.data && (
        <View style={styles.deviceData}>
          <View style={styles.dataGrid}>
            {device.data.heartRate && (
              <View style={styles.dataItem}>
                <Ionicons name="heart" size={16} color="#FF3B30" />
                <Text style={styles.dataValue}>{device.data.heartRate}</Text>
                <Text style={styles.dataLabel}>BPM</Text>
              </View>
            )}
            {device.data.steps && (
              <View style={styles.dataItem}>
                <Ionicons name="walk" size={16} color="#007AFF" />
                <Text style={styles.dataValue}>{device.data.steps.toLocaleString()}</Text>
                <Text style={styles.dataLabel}>Steps</Text>
              </View>
            )}
            {device.data.activeCalories && (
              <View style={styles.dataItem}>
                <Ionicons name="flame" size={16} color="#FF9500" />
                <Text style={styles.dataValue}>{device.data.activeCalories}</Text>
                <Text style={styles.dataLabel}>Cal</Text>
              </View>
            )}
            {device.data.distanceWalked && (
              <View style={styles.dataItem}>
                <Ionicons name="map" size={16} color="#34C759" />
                <Text style={styles.dataValue}>{device.data.distanceWalked.toFixed(1)}</Text>
                <Text style={styles.dataLabel}>km</Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={styles.deviceFeatures}>
        <Text style={styles.featuresTitle}>Features:</Text>
        <View style={styles.featuresTags}>
          {device.features.slice(0, 3).map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureTagText}>{feature}</Text>
            </View>
          ))}
          {device.features.length > 3 && (
            <Text style={styles.moreFeatures}>+{device.features.length - 3} more</Text>
          )}
        </View>
      </View>

      <View style={styles.deviceButtons}>
        {device.connected && (
          <TouchableOpacity
            style={[styles.actionButton, styles.syncButton]}
            onPress={() => syncDevice(device.id)}
            disabled={device.syncStatus === 'syncing'}
          >
            <Ionicons name="refresh" size={16} color="#007AFF" />
            <Text style={styles.syncButtonText}>Sync</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.actionButton,
            device.connected ? styles.disconnectButton : styles.connectButton
          ]}
          onPress={() => handleDeviceConnection(device.id)}
          disabled={device.syncStatus === 'syncing'}
        >
          <Text style={[
            styles.actionButtonText,
            device.connected ? styles.disconnectButtonText : styles.connectButtonText
          ]}>
            {device.connected ? 'Disconnect' : 'Connect'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConnectedDevices = () => (
    <View style={styles.tabContent}>
      {connectedDevices.length > 0 ? (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Sync Status</Text>
            <Text style={styles.summaryText}>
              {connectedDevices.length} device{connectedDevices.length !== 1 ? 's' : ''} connected
            </Text>
            <Text style={styles.summarySubtext}>
              Last sync: {connectedDevices[0]?.lastSync || 'Unknown'}
            </Text>
          </View>
          {connectedDevices.map(renderDeviceCard)}
        </>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="phone-portrait-outline" size={64} color="#8E8E93" />
          <Text style={styles.emptyStateTitle}>No Connected Devices</Text>
          <Text style={styles.emptyStateText}>
            Connect your health devices and apps to start syncing your data automatically.
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => setActiveTab('available')}
          >
            <Text style={styles.scanButtonText}>Browse Devices</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderAvailableDevices = () => (
    <View style={styles.tabContent}>
      <View style={styles.scanSection}>
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
          onPress={scanForDevices}
          disabled={isScanning}
        >
          {isScanning ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons name="search" size={20} color="#fff" />
          )}
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan for Devices'}
          </Text>
        </TouchableOpacity>
      </View>
      {availableDevices.map(renderDeviceCard)}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#FF9500', '#FF6B00']} style={styles.header}>
        <Text style={styles.headerTitle}>Device Connections</Text>
        <Text style={styles.headerSubtitle}>Sync your health devices and apps</Text>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'connected' && styles.activeTabButton]}
          onPress={() => setActiveTab('connected')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'connected' && styles.activeTabButtonText]}>
            Connected ({connectedDevices.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'available' && styles.activeTabButton]}
          onPress={() => setActiveTab('available')}
        >
          <Text style={[styles.tabButtonText, activeTab === 'available' && styles.activeTabButtonText]}>
            Available ({availableDevices.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'connected' ? renderConnectedDevices() : renderAvailableDevices()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#FF9500',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    paddingBottom: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: '#34C759',
    fontWeight: '600',
  },
  summarySubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  deviceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  deviceIconContainer: {
    position: 'relative',
    marginRight: 15,
  },
  statusIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deviceType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  deviceActions: {
    alignItems: 'flex-end',
  },
  batteryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  deviceStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  deviceData: {
    marginBottom: 15,
  },
  dataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  dataItem: {
    alignItems: 'center',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  dataLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  deviceFeatures: {
    marginBottom: 15,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  featuresTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  featureTag: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  featureTagText: {
    fontSize: 12,
    color: '#666',
  },
  moreFeatures: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  deviceButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 10,
  },
  syncButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  connectButton: {
    backgroundColor: '#34C759',
  },
  disconnectButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  connectButtonText: {
    color: '#fff',
  },
  disconnectButtonText: {
    color: '#fff',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  scanSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: '#FF9500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  scanButtonDisabled: {
    opacity: 0.6,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8,
  },
});