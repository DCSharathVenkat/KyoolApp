import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { userAPI } from '../services/api';
import { calculateBMI, calculateBMR, calculateTDEE } from '../utils/health';
import { UserContext } from '../App';

const { width } = Dimensions.get('window');

interface HealthMetricsProps {
  navigation?: any;
}

export function HealthMetrics({ navigation }: HealthMetricsProps) {
  const { user, userProfile, updateUserProfile } = useContext(UserContext);
  
  const [weightLogs, setWeightLogs] = useState([]);
  const [backendUser, setBackendUser] = useState(null);
  const [metrics, setMetrics] = useState({
    height: userProfile?.height || 170,
    weight: userProfile?.weight || 70,
    age: userProfile?.age || 25,
    bodyFat: 15,
    restingHeartRate: 65,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: '#3B82F6', description: 'Consider gaining weight' };
    if (bmi < 25) return { label: 'Normal', color: '#10B981', description: 'Healthy weight range' };
    if (bmi < 30) return { label: 'Overweight', color: '#F59E0B', description: 'Consider losing weight' };
    return { label: 'Obese', color: '#EF4444', description: 'Consult healthcare provider' };
  };

  const getBodyFatCategory = (bodyFat: number, gender: string = 'male') => {
    if (gender === 'male') {
      if (bodyFat < 6) return { label: 'Essential', color: '#3B82F6' };
      if (bodyFat < 14) return { label: 'Athletic', color: '#10B981' };
      if (bodyFat < 18) return { label: 'Fitness', color: '#10B981' };
      if (bodyFat < 25) return { label: 'Average', color: '#F59E0B' };
      return { label: 'Obese', color: '#EF4444' };
    } else {
      if (bodyFat < 12) return { label: 'Essential', color: '#3B82F6' };
      if (bodyFat < 21) return { label: 'Athletic', color: '#10B981' };
      if (bodyFat < 25) return { label: 'Fitness', color: '#10B981' };
      if (bodyFat < 32) return { label: 'Average', color: '#F59E0B' };
      return { label: 'Obese', color: '#EF4444' };
    }
  };


  useEffect(() => {
    const loadHealthData = async () => {
      if (!user?.uid) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        console.log('📊 Loading health data for user:', user.uid);
        
        // Fetch user data from backend
        const userData = await userAPI.getUser(user.uid);
        console.log('✅ Backend user data:', userData);
        setBackendUser(userData);
        
        // Update metrics with backend data
        setMetrics(prev => ({
          ...prev,
          height: userData.height || prev.height,
          weight: userData.weight || prev.weight,
          age: userData.age || prev.age,
        }));
        
        // Fetch weight logs
        const logs = await userAPI.getWeightLogs(user.uid);
        console.log('📊 Weight logs loaded:', logs);
        setWeightLogs(logs || []);
        
      } catch (err) {
        console.error('❌ Failed to load health data:', err);
        setError('Failed to load health data');
      } finally {
        setIsLoading(false);
      }
    };

    loadHealthData();
  }, [user?.uid]);

  // Update metrics when userProfile changes
  useEffect(() => {
    if (userProfile) {
      setMetrics(prev => ({
        ...prev,
        height: userProfile.height || prev.height,
        weight: userProfile.weight || prev.weight,
        age: userProfile.age || prev.age,
      }));
    }
  }, [userProfile]);

  const handleSave = async () => {
    if (!user?.uid) {
      Alert.alert('Error', 'Please sign in to save your metrics');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log('💾 Saving health metrics...');
      
      // Update user profile with new metrics
      const updatedProfile = {
        ...userProfile,
        height: metrics.height,
        weight: metrics.weight,
        age: metrics.age,
        updatedAt: new Date().toISOString()
      };
      
      // Update profile in backend
      await userAPI.updateProfile(user.uid, updatedProfile);
      
      // Update local context
      updateUserProfile(updatedProfile);
      
      // Add weight log if weight changed
      if (metrics.weight !== userProfile?.weight) {
        const now = new Date().toISOString();
        const bmi = calculateBMI(metrics.weight, metrics.height);
        const bmr = calculateBMR(metrics.weight, metrics.height, metrics.age, userProfile?.gender || 'male');
        const tdee = calculateTDEE(bmr ?? 0, userProfile?.activityLevel || 'moderately_active');
        
        await userAPI.addWeightLog(
          user.uid,
          metrics.weight,
          now,
          bmi,
          bmr,
          tdee
        );
        
        // Refresh weight logs
        const updatedLogs = await userAPI.getWeightLogs(user.uid);
        setWeightLogs(updatedLogs);
      }
      
      Alert.alert('Success', 'Metrics saved successfully!');
      console.log('✅ Health metrics saved successfully');
      
    } catch (err) {
      console.error('❌ Failed to save metrics:', err);
      setError('Failed to save changes');
      Alert.alert('Error', 'Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Ensure we always have data for demo - use backend data when available
  const displayLogs = weightLogs.length > 0 ? weightLogs : [];
  
  const bmi = calculateBMI(metrics.weight, metrics.height);
  const bmiCategory = getBMICategory(bmi ?? 0);
  const bodyFatCategory = getBodyFatCategory(metrics.bodyFat, userProfile?.gender || backendUser?.gender || 'male');
  const bmr = calculateBMR(metrics.weight, metrics.height, metrics.age, userProfile?.gender || backendUser?.gender || 'male');
  const tdee = calculateTDEE(bmr ?? 0, userProfile?.activityLevel || backendUser?.activity_level || 'moderately_active');

  // Show loading state
  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#666' }}>Loading health data...</Text>
      </View>
    );
  }

  const MetricCard = ({ title, value, subtitle, icon, color = '#6366F1' }: any) => (
    <View style={[styles.metricCard, { borderColor: color }]}>
      <LinearGradient
        colors={[color + '20', color + '10']}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <Ionicons name={icon} size={24} color={color} />
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
        {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
      </LinearGradient>
    </View>
  );

  const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default' }: any) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value.toString()}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType as any}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );

  // Enhanced chart component for React Native
  const SimpleWeightChart = ({ logs }: { logs: any[] }) => {
    const recentLogs = logs.slice(-7);
    
    if (recentLogs.length === 0) {
      return (
        <View style={styles.simpleChart}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.chartGradient}
          >
            <Text style={styles.chartTitle}>Weight Progress</Text>
            <View style={styles.noDataContainer}>
              <Ionicons name="analytics-outline" size={48} color="rgba(255,255,255,0.6)" />
              <Text style={styles.noDataText}>No weight data available</Text>
              <Text style={styles.noDataSubtext}>Start tracking your weight to see progress</Text>
            </View>
          </LinearGradient>
        </View>
      );
    }
    
    const maxWeight = Math.max(...recentLogs.map(log => log.weight));
    const minWeight = Math.min(...recentLogs.map(log => log.weight));
    const range = maxWeight - minWeight || 1;

    return (
      <View style={styles.simpleChart}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.chartGradient}
        >
          <Text style={styles.chartTitle}>Weight Progress (Last 7 Days)</Text>
          <View style={styles.chartBars}>
            {recentLogs.map((log, index) => {
              const height = Math.max(((log.weight - minWeight) / range) * 120 + 30, 30);
              const date = new Date(log.date);
              const isLatest = index === recentLogs.length - 1;
              return (
                <View key={index} style={styles.chartBarContainer}>
                  <Text style={styles.chartBarValue}>{log.weight}kg</Text>
                  <View 
                    style={[
                      styles.chartBar, 
                      { 
                        height: height, 
                        backgroundColor: isLatest ? '#10B981' : '#667eea',
                        shadowColor: isLatest ? '#10B981' : '#667eea',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 3,
                      }
                    ]} 
                  />
                  <Text style={styles.chartBarLabel}>
                    {`${date.getMonth() + 1}/${date.getDate()}`}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#667eea' }]} />
              <Text style={styles.legendText}>Previous</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.legendText}>Latest</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Health Metrics</Text>
        <Text style={styles.headerSubtitle}>Track and monitor your vital health indicators</Text>
      </LinearGradient>

      {/* Input Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Update Your Metrics</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={styles.halfInput}>
              <InputField
                label="Height (cm)"
                value={metrics.height}
                onChangeText={(text: string) => setMetrics({ ...metrics, height: parseFloat(text) || 0 })}
                placeholder="170"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <InputField
                label="Weight (kg)"
                value={metrics.weight}
                onChangeText={(text: string) => setMetrics({ ...metrics, weight: parseFloat(text) || 0 })}
                placeholder="70"
                keyboardType="numeric"
              />
            </View>
          </View>
          
          <View style={styles.inputRow}>
            <View style={styles.halfInput}>
              <InputField
                label="Age"
                value={metrics.age}
                onChangeText={(text: string) => setMetrics({ ...metrics, age: parseFloat(text) || 0 })}
                placeholder="25"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.halfInput}>
              <InputField
                label="Body Fat (%)"
                value={metrics.bodyFat}
                onChangeText={(text: string) => setMetrics({ ...metrics, bodyFat: parseFloat(text) || 0 })}
                placeholder="15"
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, loading && styles.saveButtonDisabled]} 
            onPress={handleSave} 
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="save" size={20} color="white" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Calculated Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Health Metrics</Text>
        <View style={styles.metricsGrid}>
          <MetricCard
            title="BMI"
            value={bmi?.toFixed(1) || '0.0'}
            subtitle={`${bmiCategory.label} - ${bmiCategory.description}`}
            icon="fitness"
            color={bmiCategory.color}
          />
          
          <MetricCard
            title="Body Fat"
            value={`${metrics.bodyFat}%`}
            subtitle={bodyFatCategory.label}
            icon="analytics"
            color={bodyFatCategory.color}
          />
          
          <MetricCard
            title="BMR"
            value={bmr?.toFixed(0) || '0'}
            subtitle="calories/day at rest"
            icon="flame"
            color="#F97316"
          />
          
          <MetricCard
            title="TDEE"
            value={tdee?.toFixed(0) || '0'}
            subtitle="total daily calories"
            icon="trending-up"
            color="#8B5CF6"
          />
        </View>
      </View>

      {/* Vital Signs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vital Signs</Text>
        <View style={styles.vitalSignsContainer}>
          <View style={styles.vitalSignCard}>
            <View style={styles.vitalSignHeader}>
              <Ionicons name="heart" size={24} color="#EF4444" />
              <Text style={styles.vitalSignTitle}>Resting Heart Rate</Text>
            </View>
            <Text style={styles.vitalSignValue}>{metrics.restingHeartRate} bpm</Text>
            <TextInput
              style={styles.vitalInput}
              value={metrics.restingHeartRate.toString()}
              onChangeText={(text) => setMetrics({ ...metrics, restingHeartRate: parseFloat(text) || 0 })}
              keyboardType="numeric"
              placeholder="65"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.vitalSignCard}>
            <View style={styles.vitalSignHeader}>
              <MaterialIcons name="favorite" size={24} color="#DC2626" />
              <Text style={styles.vitalSignTitle}>Blood Pressure</Text>
            </View>
            <Text style={styles.vitalSignValue}>
              {metrics.bloodPressureSystolic}/{metrics.bloodPressureDiastolic} mmHg
            </Text>
            <View style={styles.bloodPressureInputs}>
              <TextInput
                style={[styles.vitalInput, { flex: 1, marginRight: 5 }]}
                value={metrics.bloodPressureSystolic.toString()}
                onChangeText={(text) => setMetrics({ ...metrics, bloodPressureSystolic: parseFloat(text) || 0 })}
                keyboardType="numeric"
                placeholder="120"
                placeholderTextColor="#9CA3AF"
              />
              <Text style={styles.slashText}>/</Text>
              <TextInput
                style={[styles.vitalInput, { flex: 1, marginLeft: 5 }]}
                value={metrics.bloodPressureDiastolic.toString()}
                onChangeText={(text) => setMetrics({ ...metrics, bloodPressureDiastolic: parseFloat(text) || 0 })}
                keyboardType="numeric"
                placeholder="80"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>
      </View>

      {/* Caloric Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Caloric Goals</Text>
        <View style={styles.goalContainer}>
          <View style={styles.goalCard}>
            <Ionicons name="pause" size={20} color="#10B981" />
            <Text style={styles.goalValue}>{tdee?.toFixed(0) || '0'}</Text>
            <Text style={styles.goalLabel}>Maintain Weight</Text>
          </View>
          
          <View style={styles.goalCard}>
            <Ionicons name="trending-down" size={20} color="#EF4444" />
            <Text style={styles.goalValue}>{((tdee ?? 0) - 500).toFixed(0)}</Text>
            <Text style={styles.goalLabel}>Lose 0.5kg/week</Text>
          </View>
          
          <View style={styles.goalCard}>
            <Ionicons name="trending-up" size={20} color="#3B82F6" />
            <Text style={styles.goalValue}>{((tdee ?? 0) + 300).toFixed(0)}</Text>
            <Text style={styles.goalLabel}>Gain Weight</Text>
          </View>
          
          <View style={styles.goalCard}>
            <Ionicons name="water" size={20} color="#06B6D4" />
            <Text style={styles.goalValue}>2.5L</Text>
            <Text style={styles.goalLabel}>Water Intake</Text>
          </View>
        </View>
      </View>

      {/* Weight Progress Chart */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weight Progress</Text>
        <View style={styles.chartContainer}>
          <SimpleWeightChart logs={displayLogs} />
          
          <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatLabel}>Latest</Text>
                <Text style={styles.progressStatValue}>
                  {displayLogs[displayLogs.length - 1]?.weight}kg
                </Text>
              </View>
              {displayLogs.length > 1 && (
                <View style={styles.progressStat}>
                  <Text style={styles.progressStatLabel}>Change</Text>
                  <Text style={[
                    styles.progressStatValue,
                    { 
                      color: (displayLogs[displayLogs.length - 1]?.weight - displayLogs[0]?.weight) > 0 
                        ? '#EF4444' : '#10B981' 
                    }
                  ]}>
                    {(displayLogs[displayLogs.length - 1]?.weight - displayLogs[0]?.weight).toFixed(1)}kg
                  </Text>
                </View>
              )}
              <View style={styles.progressStat}>
                <Text style={styles.progressStatLabel}>Entries</Text>
                <Text style={styles.progressStatValue}>
                  {displayLogs.length}
                </Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatLabel}>Average</Text>
                <Text style={styles.progressStatValue}>
                  {(displayLogs.reduce((sum, log) => sum + log.weight, 0) / displayLogs.length).toFixed(1)}kg
                </Text>
              </View>
            </View>
          </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 6,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    minHeight: 48,
    textAlignVertical: 'center',
  },
  saveButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    width: (width - 60) / 2,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  vitalSignsContainer: {
    gap: 16,
  },
  vitalSignCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  vitalSignHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  vitalSignTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  vitalSignValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  vitalInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    minHeight: 44,
    textAlignVertical: 'center',
  },
  bloodPressureInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  slashText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
    marginHorizontal: 8,
  },
  goalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  goalCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: (width - 64) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  goalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 8,
  },
  goalLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  progressStat: {
    alignItems: 'center',
  },
  progressStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  progressStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  simpleChart: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  chartBarContainer: {
    alignItems: 'center',
  },
  chartBar: {
    width: 28,
    backgroundColor: '#667eea',
    marginVertical: 8,
    borderRadius: 14,
    minHeight: 30,
  },
  chartBarLabel: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
  },
  chartBarValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 6,
  },
  chartGradient: {
    borderRadius: 16,
    padding: 20,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noDataText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 12,
  },
  noDataSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    textAlign: 'center',
  },
});