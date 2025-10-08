import React, { useState, useEffect } from 'react';
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
import { LineChart } from 'react-native-chart-kit';
import { addWeightLog, getWeightLogs } from '../api/user_api';
import { calculateBMI, calculateBMR, calculateTDEE } from '../utils/health';

const { width } = Dimensions.get('window');

interface HealthMetricsProps {
  user: any;
  setUser: (user: any) => void;
}

export function HealthMetrics({ user, setUser }: HealthMetricsProps) {
  const [weightLogs, setWeightLogs] = useState([]);
  const [metrics, setMetrics] = useState({
    height: user?.height || 170,
    weight: user?.weight || 70,
    age: user?.age || 25,
    bodyFat: 15,
    restingHeartRate: 65,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80
  });
  const [loading, setLoading] = useState(false);
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
    async function fetchLogs() {
      if (user?.id) {
        try {
          const logs = await getWeightLogs(user.id);
          setWeightLogs(logs);
        } catch (err) {
          setError('Failed to fetch weight logs');
        }
      }
    }
    fetchLogs();
  }, [user?.id]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      setUser({
        ...user,
        height: metrics.height,
        weight: metrics.weight,
        age: metrics.age
      });
      
      if (user?.id) {
        const now = new Date().toISOString();
        const bmi = calculateBMI(metrics.weight, metrics.height);
        const bmr = calculateBMR(metrics.weight, metrics.height, metrics.age, user.gender);
        const tdee = calculateTDEE(bmr ?? 0, user.activityLevel);
        
        await addWeightLog(
          user.id,
          metrics.weight,
          now,
          bmi,
          bmr,
          tdee
        );
        
        const updatedLogs = await getWeightLogs(user.id);
        setWeightLogs(updatedLogs);
        Alert.alert('Success', 'Metrics saved successfully!');
      }
    } catch (err) {
      setError('Failed to save changes');
      Alert.alert('Error', 'Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  const bmi = calculateBMI(metrics.weight, metrics.height);
  const bmiCategory = getBMICategory(bmi ?? 0);
  const bodyFatCategory = getBodyFatCategory(metrics.bodyFat, user?.gender);
  const bmr = calculateBMR(metrics.weight, metrics.height, metrics.age, user?.gender);
  const tdee = calculateTDEE(bmr ?? 0, user?.activityLevel);

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

  // Simple custom chart component as fallback
  const SimpleWeightChart = ({ logs }: { logs: any[] }) => {
    const recentLogs = logs.slice(-7);
    const maxWeight = Math.max(...recentLogs.map(log => log.weight));
    const minWeight = Math.min(...recentLogs.map(log => log.weight));
    const range = maxWeight - minWeight || 1;

    return (
      <View style={styles.simpleChart}>
        <Text style={styles.chartTitle}>Weight Trend (Last 7 Days)</Text>
        <View style={styles.chartBars}>
          {recentLogs.map((log, index) => {
            const height = ((log.weight - minWeight) / range) * 100 + 20;
            const date = new Date(log.date);
            return (
              <View key={index} style={styles.chartBarContainer}>
                <View 
                  style={[
                    styles.chartBar, 
                    { height: height, backgroundColor: '#667eea' }
                  ]} 
                />
                <Text style={styles.chartBarLabel}>
                  {`${date.getMonth() + 1}/${date.getDate()}`}
                </Text>
                <Text style={styles.chartBarValue}>{log.weight}kg</Text>
              </View>
            );
          })}
        </View>
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
      {weightLogs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weight Progress</Text>
          <View style={styles.chartContainer}>
            {/* Try to use LineChart, fallback to simple chart if it fails */}
            {(() => {
              try {
                return (
                  <LineChart
                    data={{
                      labels: weightLogs.slice(-7).map(log => {
                        const date = new Date(log.date);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }),
                      datasets: [
                        {
                          data: weightLogs.slice(-7).map(log => log.weight),
                          color: (opacity = 1) => `rgba(103, 126, 234, ${opacity})`,
                          strokeWidth: 3
                        }
                      ]
                    }}
                    width={width - 80}
                    height={220}
                    yAxisSuffix="kg"
                    chartConfig={{
                      backgroundColor: '#ffffff',
                      backgroundGradientFrom: '#667eea',
                      backgroundGradientTo: '#764ba2',
                      decimalPlaces: 1,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#fff"
                      }
                    }}
                    bezier
                    style={styles.chart}
                  />
                );
              } catch (error) {
                return <SimpleWeightChart logs={weightLogs} />;
              }
            })()}
            
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatLabel}>Latest</Text>
                <Text style={styles.progressStatValue}>
                  {weightLogs[weightLogs.length - 1]?.weight}kg
                </Text>
              </View>
              {weightLogs.length > 1 && (
                <View style={styles.progressStat}>
                  <Text style={styles.progressStatLabel}>Change</Text>
                  <Text style={[
                    styles.progressStatValue,
                    { 
                      color: (weightLogs[weightLogs.length - 1]?.weight - weightLogs[0]?.weight) > 0 
                        ? '#EF4444' : '#10B981' 
                    }
                  ]}>
                    {(weightLogs[weightLogs.length - 1]?.weight - weightLogs[0]?.weight).toFixed(1)}kg
                  </Text>
                </View>
              )}
              <View style={styles.progressStat}>
                <Text style={styles.progressStatLabel}>Entries</Text>
                <Text style={styles.progressStatValue}>
                  {weightLogs.length}
                </Text>
              </View>
              <View style={styles.progressStat}>
                <Text style={styles.progressStatLabel}>Average</Text>
                <Text style={styles.progressStatValue}>
                  {(weightLogs.reduce((sum, log) => sum + log.weight, 0) / weightLogs.length).toFixed(1)}kg
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
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
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 16,
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
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  bloodPressureInputs: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  chartBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 10,
  },
  chartBarContainer: {
    alignItems: 'center',
  },
  chartBar: {
    width: 24,
    backgroundColor: '#667eea',
    marginBottom: 5,
    borderRadius: 12,
  },
  chartBarLabel: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  chartBarValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginTop: 2,
  },
});