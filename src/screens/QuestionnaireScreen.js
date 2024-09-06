import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles, colors } from '../styles/GlobalStyles'; // Import global styles and colors
import { QuestionnaireScreenStyles as localStyles } from '../styles/QuestionnaireScreenStyles'; // Import local styles
import { Questions as questions } from '../data/Questions';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons from react-native-vector-icons

const QuestionnaireScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isGymGoer, setIsGymGoer] = useState(null); // State to track gym-goer status
  const fadeAnim = useState(new Animated.Value(1))[0];
  const [questionHistory, setQuestionHistory] = useState([0]); // Stack to track visited questions

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5, // Smooth transition duration
      useNativeDriver: true,
    }).start();

    const currentQuestion = questions[currentQuestionIndex];
    if (answers[currentQuestion.id]) {
      setCurrentAnswer(answers[currentQuestion.id]);
    } else {
      setCurrentAnswer(currentQuestion.inputType === 'multipleChoice' ? [] : '');
    }
  }, [currentQuestionIndex]);

  const handleAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
  
    // Log the current question ID to track when an answer is submitted
    console.log('Answering Question ID:', currentQuestion.id);
  
    // Store the answer
    if (currentAnswer !== undefined && currentAnswer !== null) {
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [currentQuestion.id]: currentAnswer
      }));
  
      // Track the current question in history for back navigation
      setQuestionHistory(prevHistory => [...prevHistory, currentQuestionIndex]);
  
      // Handle specific logic for question 6 (gym-goer question)
      if (currentQuestion.id === 6) {
        const gymGoerStatus = currentAnswer === 'Yes';
        setIsGymGoer(gymGoerStatus);
  
        if (gymGoerStatus) {
          // Jump to the first gym-goer question
          setCurrentQuestionIndex(6);
        } else {
          // Jump to the first non-gym-goer question
          setCurrentQuestionIndex(16);
        }
      } else {
        goToNextQuestion();
      }
    } else {
      console.warn('Current answer is invalid or undefined.');
    }
  };
  
  
  
  
  
  

  const handleSingleChoiceSelection = (option) => {
    if (option === 'No specific diet') {
      setCurrentAnswer(option);  // Set the answer directly if no description is needed
    } else if (option === 'Yes (please describe)' || option === 'Other (please describe)') {
      setCurrentAnswer([option, '']);  // Initialize an array with the option and an empty string for description
    } else {
      setCurrentAnswer(option);  // Handle other single choice options
    }
  };

  const handleMultiChoiceSelection = (option) => {
    let updatedAnswer = [...currentAnswer];
    if (updatedAnswer.includes(option)) {
      updatedAnswer = updatedAnswer.filter((item) => item !== option);
    } else {
      updatedAnswer.push(option);
    }
    setCurrentAnswer(updatedAnswer);
  };

  const goToNextQuestion = () => {
    let nextIndex = currentQuestionIndex + 1;
  
    // Determine if the next question should be skipped based on gym-goer status
    while (nextIndex < questions.length) {
      const nextQuestion = questions[nextIndex];
  
      if (
        (isGymGoer === null) || // Show all questions before gym-goer status is determined
        (isGymGoer && nextQuestion.id >= 7 && nextQuestion.id <= 16) || // Gym-Goer questions
        (!isGymGoer && nextQuestion.id >= 17 && nextQuestion.id <= 21) || // Non-Gym-Goer questions
        (nextQuestion.id <= 6) // Always show common questions
      ) {
        break;
      }
      nextIndex++;
    }
  
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      handleSubmit(); // Or navigate to the next section
    }
  };
  
  
  

  const goToPreviousQuestion = () => {
    if (questionHistory.length > 1) {
      // Pop the last question from the history stack to go back
      const previousIndex = questionHistory[questionHistory.length - 1];
      setQuestionHistory(questionHistory.slice(0, questionHistory.length - 1));
  
      if (previousIndex === 6 || previousIndex === 16) {
        // If the user is on the first question of the gym-goer or non-gym-goer sections,
        // ensure they can go back to question 6.
        setCurrentQuestionIndex(5);
      } else {
        // Otherwise, navigate to the last question in the history
        setCurrentQuestionIndex(previousIndex);
      }
    } else {
      console.warn('No previous question available in history.');
    }
  };
  
  
  
  
  
  
  

  const handleSubmit = () => {
    console.log('Final Answers: ', answers);
    navigation.navigate('MainTabs'); // Commented out as requested
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={[GlobalStyles.container, localStyles.container]}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={localStyles.headerBackground}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={localStyles.headerText}>A few questions about you</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={localStyles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ ...localStyles.questionContainer, opacity: fadeAnim }}>
          
          <Text style={localStyles.questionText}>{`${currentQuestion.id}: ${currentQuestion.question}`}</Text>

          {currentQuestion.inputType === 'textInput' && (
            <TextInput
              style={[GlobalStyles.input, localStyles.input]}
              placeholder={currentQuestion.placeholder}
              placeholderTextColor={colors.placeholder}
              keyboardType={currentQuestion.keyboardType || 'default'}
              value={currentAnswer}
              onChangeText={(text) => setCurrentAnswer(text)}
            />
          )}

          {currentQuestion.inputType === 'singleChoice' && (
            <>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    localStyles.optionButton,
                    currentAnswer === option && localStyles.selectedOptionButton,
                  ]}
                  onPress={() => handleSingleChoiceSelection(option)}
                >
                  <Text
                    style={[
                      localStyles.optionText,
                      currentAnswer === option && localStyles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
              {Array.isArray(currentAnswer) && (currentAnswer[0] === 'Yes (please describe)' || currentAnswer[0] === 'Other (please describe)') && (
                <TextInput
                  style={[GlobalStyles.input, localStyles.input]}
                  placeholder={currentQuestion.placeholder}
                  placeholderTextColor={colors.placeholder}
                  value={currentAnswer[1] || ''}
                  onChangeText={(text) => setCurrentAnswer(prev => [prev[0], text])}
                />
              )}
            </>
          )}

          {currentQuestion.inputType === 'multipleChoice' && (
            <>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    localStyles.optionButton,
                    Array.isArray(currentAnswer) && currentAnswer.includes(option) && localStyles.selectedOptionButton,
                  ]}
                  onPress={() => handleMultiChoiceSelection(option)}
                >
                  <Text
                    style={[
                      localStyles.optionText,
                      Array.isArray(currentAnswer) && currentAnswer.includes(option) && localStyles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
              {currentAnswer.includes('Other (please describe)') && (
                <TextInput
                  style={[GlobalStyles.input, localStyles.input]}
                  placeholder={currentQuestion.placeholder}
                  placeholderTextColor={colors.placeholder}
                  value={currentAnswer.find(answer => answer.startsWith('Other (please describe): '))?.replace('Other (please describe): ', '') || ''}
                  onChangeText={(text) => {
                    const updatedAnswer = currentAnswer.filter((item) => !item.startsWith('Other (please describe): '));
                    setCurrentAnswer([...updatedAnswer, `Other (please describe): ${text}`]);
                  }}
                />
              )}
            </>
          )}

          <View style={localStyles.navigationButtons}>
            {currentQuestionIndex > 0 && (
              <TouchableOpacity onPress={goToPreviousQuestion} style={localStyles.navButton}>
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientEnd]}
                  style={localStyles.navButtonGradient}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                >
                  <Icon name="arrow-back" size={24} color={colors.buttonText} />
                </LinearGradient>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleAnswer} style={localStyles.navButton}>
              <LinearGradient
                colors={[colors.gradientStart, colors.gradientEnd]}
                style={localStyles.navButtonGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              >
                <Icon name="arrow-forward" size={24} color={colors.buttonText} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      <TouchableOpacity onPress={handleSubmit} style={localStyles.skipQuestionnaireButton}>
        <Text style={localStyles.skipButtonText}>Skip Questionnaire</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default QuestionnaireScreen;
