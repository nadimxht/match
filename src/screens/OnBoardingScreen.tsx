import React, { useState } from 'react';
import { View, Button } from 'react-native';
import StepQuestion from '../components/StepQuestion';
import { useAppStore } from '../store/useAppStore';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const saveProfile = useAppStore((s) => s.saveProfile);
  const nav = useNavigation();

  const steps = [
    { key: 'name', question: 'What is your name?', isInput: true },
    { key: 'age', question: 'Your age?', isInput: true },
    { key: 'gender', question: 'Your gender?', options: ['Male', 'Female', 'Other'] },
    { key: 'lookingFor', question: 'Looking for?', options: ['Male', 'Female', 'Any'] },
    { key: 'interests', question: 'Pick your interests', options: ['Music', 'Sports', 'Travel', 'Food'] },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step + 1 < steps.length) setStep(step + 1);
    else {
      saveProfile(answers);
      nav.navigate('Tickets');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <StepQuestion
        question={currentStep.question}
        options={currentStep.options}
        value={answers[currentStep.key]}
        onSelect={(opt) => setAnswers({ ...answers, [currentStep.key]: opt })}
        onChangeText={(text) => setAnswers({ ...answers, [currentStep.key]: text })}
        isInput={currentStep.isInput}
      />
      <View style={{ padding: 16 }}>
        <Button title={step + 1 === steps.length ? 'Finish' : 'Next'} onPress={handleNext} color="#ff6b81" />
      </View>
    </View>
  );
}
