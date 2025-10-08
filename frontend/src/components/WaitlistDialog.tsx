import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isInline?: boolean;
}

interface FormData {
  personType: string;
  activityLevel: string;
  currentSituation: string;
  desiredResults: string;
  biggestChallenge: string;
  previousAttempts: string;
  budget: string;
  email: string;
  phone: string;
}

// Custom Radio Button Component
const RadioButton = ({ selected, onPress, children }: { selected: boolean; onPress: () => void; children: React.ReactNode }) => (
  <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
    <View style={[styles.radioCircle, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioDot} />}
    </View>
    <Text style={styles.radioText}>{children}</Text>
  </TouchableOpacity>
);

// Custom Select Component
const SelectButton = memo(({ 
  value, 
  placeholder, 
  options, 
  onSelect 
}: { 
  value: string; 
  placeholder: string; 
  options: { value: string; label: string }[];
  onSelect: (value: string) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  
  return (
    <View style={styles.selectContainer}>
      <TouchableOpacity 
        style={styles.selectButton} 
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={[styles.selectText, !value && styles.selectPlaceholder]}>
          {value ? options.find(opt => opt.value === value)?.label : placeholder}
        </Text>
        <Ionicons name={showOptions ? "chevron-up" : "chevron-down"} size={20} color="#666" />
      </TouchableOpacity>
      
      {showOptions && (
        <View style={styles.optionsContainer}>
          <ScrollView style={styles.optionsList} nestedScrollEnabled>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.optionItem}
                onPress={() => {
                  onSelect(option.value);
                  setShowOptions(false);
                }}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
});

// Completely isolated step components
const Step5Component = ({ initialValue, onChangeText }: { initialValue: string; onChangeText: (text: string) => void }) => {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (text: string) => {
    setValue(text);
    onChangeText(text);
  };
  
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.questionText}>📝 What else have you tried to achieve your health goals?</Text>
      <TextInput
        style={styles.textArea}
        value={value}
        onChangeText={handleChange}
        placeholder="Tell us about previous attempts, apps, programs, or methods you've tried..."
        multiline={true}
        numberOfLines={4}
        autoCorrect={false}
        blurOnSubmit={false}
        textAlignVertical="top"
        returnKeyType="default"
      />
      <Text style={styles.helperText}>This helps us understand what hasn't worked for you so we can design something better.</Text>
    </View>
  );
};

const Step7Component = ({ 
  emailValue, 
  phoneValue, 
  onEmailChange, 
  onPhoneChange 
}: { 
  emailValue: string; 
  phoneValue: string; 
  onEmailChange: (text: string) => void; 
  onPhoneChange: (text: string) => void; 
}) => {
  const [email, setEmail] = useState(emailValue);
  const [phone, setPhone] = useState(phoneValue);
  
  const handleEmailChange = (text: string) => {
    setEmail(text);
    onEmailChange(text);
  };
  
  const handlePhoneChange = (text: string) => {
    setPhone(text);
    onPhoneChange(text);
  };
  
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.questionText}>📧 Email Address *</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={handleEmailChange}
        placeholder="your.email@company.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
        returnKeyType="next"
      />

      <Text style={[styles.questionText, { marginTop: 20 }]}>📱 Phone Number (for WhatsApp updates)</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={handlePhoneChange}
        placeholder="+1 (555) 123-4567"
        keyboardType="phone-pad"
        autoCorrect={false}
        blurOnSubmit={false}
        returnKeyType="done"
      />

      <Text style={styles.infoText}>🎉 We'll send you a confirmation email and WhatsApp message once you join the waitlist.</Text>
    </View>
  );
};

export function WaitlistDialog({ open, onOpenChange, isInline = false }: WaitlistDialogProps) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    personType: "",
    activityLevel: "",
    currentSituation: "",
    desiredResults: "",
    biggestChallenge: "",
    previousAttempts: "",
    budget: "",
    email: "",
    phone: "",
  });
  
  // Refs to prevent re-rendering issues
  const previousAttemptsRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  
  // Use refs to store current values to prevent re-renders
  const formDataRef = useRef(formData);
  formDataRef.current = formData;

  const totalSteps = 7;
  
  // Create stable handlers using direct state updates
  const updatePreviousAttempts = (text: string) => {
    setFormData(current => {
      const newData = { ...current, previousAttempts: text };
      formDataRef.current = newData;
      return newData;
    });
  };
  
  const updateEmail = (text: string) => {
    setFormData(current => {
      const newData = { ...current, email: text };
      formDataRef.current = newData;
      return newData;
    });
  };
  
  const updatePhone = (text: string) => {
    setFormData(current => {
      const newData = { ...current, phone: text };
      formDataRef.current = newData;
      return newData;
    });
  };
  
  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      formDataRef.current = newData;
      return newData;
    });
  };

  const nextStep = () => step < totalSteps && setStep((s) => s + 1);
  const prevStep = () => step > 1 && setStep((s) => s - 1);

  const handleSubmit = () => {
    console.log("Submitted data:", formData);
    setIsSubmitted(true);
    Alert.alert("Success!", "Confirmation email sent! You will also receive a WhatsApp message shortly.");
  };

  const handleClose = () => {
    setStep(1);
    setIsSubmitted(false);
    setFormData({
      personType: "",
      activityLevel: "",
      currentSituation: "",
      desiredResults: "",
      biggestChallenge: "",
      previousAttempts: "",
      budget: "",
      email: "",
      phone: "",
    });
    onOpenChange(false);
  };

  const getStepIcon = (stepNumber: number) => {
    const iconNames = ['person', 'people', 'heart', 'star', 'flash', 'card', 'checkmark-circle'];
    return iconNames[stepNumber - 1] as any;
  };

  const colors = [
    '#3B82F6', // blue
    '#8B5CF6', // purple
    '#EF4444', // red
    '#F97316', // orange
    '#10B981', // green
    '#EC4899', // pink
    '#059669', // emerald
  ];

  const getCurrentColor = () => colors[step - 1];

  const activityOptions = [
    { value: "sedentary", label: "Sedentary (desk job, minimal exercise)" },
    { value: "lightly-active", label: "Lightly Active (some walking, occasional exercise)" },
    { value: "moderately-active", label: "Moderately Active (regular exercise 2-3x/week)" },
    { value: "very-active", label: "Very Active (exercise 4+ times/week)" }
  ];

  const situationOptions = [
    { value: "no-time", label: "⏰ No time for health due to work demands" },
    { value: "stressed", label: "😰 Constantly stressed and exhausted" },
    { value: "unhealthy-habits", label: "🍔 Stuck in unhealthy eating/lifestyle habits" },
    { value: "weight-issues", label: "⚖️ Struggling with weight management" },
    { value: "low-energy", label: "🔋 Low energy and poor sleep quality" },
    { value: "health-concerns", label: "🏥 Developing health concerns" }
  ];

  const resultsOptions = [
    { value: "weight-loss", label: "🏃‍♀️ Sustainable weight loss" },
    { value: "energy-boost", label: "⚡ More energy throughout the day" },
    { value: "stress-management", label: "🧘‍♂️ Better stress management" },
    { value: "work-life-balance", label: "⚖️ Improved work-life balance" },
    { value: "fitness-routine", label: "💪 Consistent fitness routine" },
    { value: "overall-wellness", label: "🌟 Complete lifestyle transformation" }
  ];

  const challengeOptions = [
    { value: "time-constraints", label: "⏱️ Time constraints from work" },
    { value: "lack-motivation", label: "😔 Lack of motivation or consistency" },
    { value: "no-plan", label: "❓ Don't know where to start/no clear plan" },
    { value: "travel-schedule", label: "✈️ Frequent travel disrupting routines" },
    { value: "social-pressure", label: "🍸 Work social events and unhealthy culture" },
    { value: "information-overload", label: "🤯 Too much conflicting health information" }
  ];

  const budgetOptions = [
    { value: "under-50", label: "💵 Under $50/month" },
    { value: "50-100", label: "💸 $50-100/month" },
    { value: "100-200", label: "💳 $100-200/month" },
    { value: "200-500", label: "💎 $200-500/month" },
    { value: "500-plus", label: "🏆 $500+/month" },
    { value: "flexible", label: "✨ Budget is flexible for the right solution" }
  ];

  const renderStepContent = useCallback(() => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionText}>👤 What type of person are you?</Text>
            <View style={styles.radioGroup}>
              <RadioButton
                selected={formData.personType === "student"}
                onPress={() => updateFormData("personType", "student")}
              >
                Student
              </RadioButton>
              <RadioButton
                selected={formData.personType === "professional"}
                onPress={() => updateFormData("personType", "professional")}
              >
                Working Professional
              </RadioButton>
              <RadioButton
                selected={formData.personType === "executive"}
                onPress={() => updateFormData("personType", "executive")}
              >
                Executive/Leadership
              </RadioButton>
            </View>

            <Text style={[styles.questionText, { marginTop: 30 }]}>🏃‍♂️ How active are you currently?</Text>
            <SelectButton
              value={formData.activityLevel}
              placeholder="Select your activity level"
              options={activityOptions}
              onSelect={(value) => updateFormData("activityLevel", value)}
            />
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionText}>🎯 Which best describes your current situation?</Text>
            <SelectButton
              value={formData.currentSituation}
              placeholder="Select your current situation"
              options={situationOptions}
              onSelect={(value) => updateFormData("currentSituation", value)}
            />
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionText}>✨ Which best describes the results you're trying to achieve?</Text>
            <SelectButton
              value={formData.desiredResults}
              placeholder="Select your desired outcome"
              options={resultsOptions}
              onSelect={(value) => updateFormData("desiredResults", value)}
            />
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionText}>🚧 What's the biggest challenge you've experienced while trying to get that result?</Text>
            <SelectButton
              value={formData.biggestChallenge}
              placeholder="Select your biggest challenge"
              options={challengeOptions}
              onSelect={(value) => updateFormData("biggestChallenge", value)}
            />
          </View>
        );

      case 5:
        return (
          <Step5Component
            initialValue={formData.previousAttempts}
            onChangeText={updatePreviousAttempts}
          />
        );

      case 6:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.questionText}>💰 Which price point best describes your current budget for achieving your health goals?</Text>
            <SelectButton
              value={formData.budget}
              placeholder="Select your budget range"
              options={budgetOptions}
              onSelect={(value) => updateFormData("budget", value)}
            />
            <Text style={styles.helperText}>This helps us design a pricing structure that works for professionals like you.</Text>
          </View>
        );

      case 7:
        return (
          <Step7Component
            emailValue={formData.email}
            phoneValue={formData.phone}
            onEmailChange={updateEmail}
            onPhoneChange={updatePhone}
          />
        );

      default:
        return null;
    }
  }, [step, formData.personType, formData.activityLevel, formData.currentSituation, formData.desiredResults, formData.biggestChallenge, formData.previousAttempts, formData.budget, formData.email, formData.phone]);

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.personType && formData.activityLevel;
      case 2:
        return formData.currentSituation;
      case 3:
        return formData.desiredResults;
      case 4:
        return formData.biggestChallenge;
      case 5:
        return true; // Optional step
      case 6:
        return formData.budget;
      case 7:
        return formData.email;
      default:
        return false;
    }
  };

  const WizardContent = () => (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getCurrentColor() }]}>
          <Ionicons name={getStepIcon(step)} size={24} color="white" />
        </View>
        <Text style={styles.title}>Join the KyoolApp Waitlist</Text>
        <Text style={styles.description}>
          Help us personalize your KyoolApp experience by answering a few quick questions.
        </Text>
        
        {/* Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step {step} of {totalSteps}</Text>
          <View style={styles.progressBar}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.progressDot,
                  i < step && { backgroundColor: getCurrentColor() }
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        contentInsetAdjustmentBehavior="automatic"
        nestedScrollEnabled={true}
      >
        <View key={`step-content-${step}`}>
          {renderStepContent()}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton, step === 1 && styles.disabledButton]}
          onPress={prevStep}
          disabled={step === 1}
        >
          <Ionicons name="chevron-back" size={20} color={step === 1 ? "#ccc" : "#666"} />
          <Text style={[styles.buttonText, styles.secondaryButtonText, step === 1 && styles.disabledButtonText]}>
            Previous
          </Text>
        </TouchableOpacity>

        {step < totalSteps ? (
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              { backgroundColor: getCurrentColor() },
              !isStepValid() && styles.disabledButton
            ]}
            onPress={nextStep}
            disabled={!isStepValid()}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Next</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              { backgroundColor: getCurrentColor() },
              !isStepValid() && styles.disabledButton
            ]}
            onPress={handleSubmit}
            disabled={!isStepValid()}
          >
            <Ionicons name="sparkles" size={20} color="white" />
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Join Waitlist</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );

  const SubmittedContent = () => (
    <View style={styles.submittedContainer}>
      <View style={styles.submittedIconContainer}>
        <Ionicons name="checkmark-circle" size={60} color="#10B981" />
      </View>
      <Text style={styles.submittedTitle}>Welcome to KyoolApp!</Text>
      <Text style={styles.submittedDescription}>
        You've successfully joined our exclusive waitlist for early access.
      </Text>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );

  if (isInline) {
    return isSubmitted ? <SubmittedContent /> : <WizardContent />;
  }

  return (
    <Modal
      isVisible={open}
      style={styles.modal}
      backdropOpacity={0.8}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      hideModalContentWhileAnimating={false}
      propagateSwipe={false}
      swipeDirection={[]}
      onBackdropPress={() => onOpenChange(false)}
      onBackButtonPress={() => onOpenChange(false)}
      avoidKeyboard={true}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeIcon} onPress={() => onOpenChange(false)}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
        {isSubmitted ? <SubmittedContent /> : <WizardContent />}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  closeIcon: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e7eb',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    paddingVertical: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 20,
  },
  radioGroup: {
    gap: 15,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d1d5db',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#3b82f6',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  radioText: {
    fontSize: 16,
    color: '#374151',
  },
  selectContainer: {
    position: 'relative',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  selectText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  selectPlaceholder: {
    color: '#9ca3af',
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionsList: {
    maxHeight: 200,
  },
  optionItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  helperText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    marginLeft: 10,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#374151',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
  submittedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  submittedIconContainer: {
    marginBottom: 20,
  },
  submittedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  submittedDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  closeButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});