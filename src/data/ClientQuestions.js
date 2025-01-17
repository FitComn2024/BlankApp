export const ClientQuestions = [
  // Common Questions (For All Users)
  {
    id: 1,
    question: 'What is your current weight?',
    inputType: 'textInput',
    placeholder: 'Input weight in lbs or kg',
    keyboardType: 'numeric',
  },
  {
    id: 2,
    question: 'What is your height?',
    inputType: 'textInput',
    placeholder: 'Input height in feet/inches or cm',
    keyboardType: 'numeric',
  },
  {
    id: 3,
    question: 'How many hours of sleep do you get per night?',
    inputType: 'singleChoice',
    options: [
      'Less than 5 hours',
      '5-6 hours',
      '6-7 hours',
      '7-8 hours',
      'More than 8 hours',
    ],
  },
  {
    id: 4,
    question: 'Do you follow any specific diet or eating habits?',
    inputType: 'singleChoice',
    options: [
      'No specific diet',
      'Keto',
      'Intermittent fasting',
      'Paleo',
      'Vegan',
      'Vegetarian',
      'Low-carb',
      'Mediterranean',
    ],
  },
  {
    id: 5,
    question: 'What are your primary fitness goals? (Select all that apply)',
    inputType: 'multipleChoice',
    options: [
      'Weight loss',
      'Muscle gain',
      'Fat loss',
      'Improved cardiovascular health',
      'Increased strength',
      'Improved flexibility and mobility',
      'General fitness and wellness',
      'Competition preparation (e.g., bodybuilding, powerlifting, athletics)',
      'Other (please describe)',
    ],
    inputTypeSub: 'textInput',
    placeholder: 'Describe your other goals',
  },

  // Branching Questions
  {
    id: 6,
    question: 'Do you currently go to a gym regularly?',
    inputType: 'singleChoice',
    options: [
      'Yes',
      'No',
    ],
  },
  
  // Gym-Goer Questions
  {
    id: 7,
    question: 'How often do you exercise per week?',
    inputType: 'singleChoice',
    options: [
      '0 days',
      '1-2 days',
      '3-4 days',
      '5-6 days',
      '7 days',
    ],
  },
  {
    id: 8,
    question: 'What type of exercise do you usually perform? (Select all that apply)',
    inputType: 'multipleChoice',
    options: [
      'Cardio (running, cycling, etc.)',
      'Strength training (weights, resistance bands, etc.)',
      'Flexibility (yoga, stretching, etc.)',
      'Sports (basketball, soccer, etc.)',
      'Other (please describe)',
    ],
    inputTypeSub: 'textInput',
    placeholder: 'Describe other exercises',
  },
  {
    id: 9,
    question: 'How long is your typical workout session?',
    inputType: 'singleChoice',
    options: [
      'Less than 30 minutes',
      '30-45 minutes',
      '45-60 minutes',
      'More than 60 minutes',
    ],
  },
  {
    id: 10,
    question: 'How many push-ups can you perform in one set?',
    inputType: 'textInput',
    placeholder: 'Enter number of push-ups',
    keyboardType: 'numeric',
  },
  {
    id: 11,
    question: 'How many pull-ups can you perform in one set?',
    inputType: 'textInput',
    placeholder: 'Enter number of pull-ups',
    keyboardType: 'numeric',
  },
  {
    id: 12,
    question: 'How long can you hold a plank?',
    inputType: 'textInput',
    placeholder: 'Enter duration in minutes',
    keyboardType: 'numeric',
  },
  {
    id: 13,
    question: 'What is your one-rep max for major lifts? (if applicable)',
    inputType: 'textInput',
    placeholder: 'Enter your one-rep max weight',
  },
  {
    id: 14,
    question: 'How fast can you run a mile or 1.5 km?',
    inputType: 'textInput',
    placeholder: 'Enter time in minutes',
  },
  {
    id: 15,
    question: 'If your goal is muscle gain or strength, what is your current strength training regimen?',
    inputType: 'textInput',
    placeholder: 'Describe your strength training regimen',
  },
  {
    id: 16,
    question: 'If your goal is fat loss, are you tracking calories or macronutrients?',
    inputType: 'singleChoice',
    options: [
      'Yes',
      'No',
    ],
  },

  // Non-Gym-Goer Questions
  {
    id: 17,
    question: 'How physically active are you on an average day?',
    inputType: 'singleChoice',
    options: [
      'Not active (mostly sedentary)',
      'Lightly active (short walks, household chores)',
      'Moderately active (daily walks, light exercise)',
      'Very active (outdoor activities, regular exercise)',
    ],
  },
  {
    id: 18,
    question: 'What type of physical activities do you engage in regularly? (Select all that apply)',
    inputType: 'multipleChoice',
    options: [
      'Walking',
      'Running/jogging',
      'Cycling',
      'Swimming',
      'Yoga/Pilates',
      'Bodyweight exercises (push-ups, squats, etc.)',
      'Outdoor sports (e.g., tennis, soccer)',
      'Household chores (e.g., gardening, cleaning)',
      'Other (please describe)',
    ],
    inputTypeSub: 'textInput',
    placeholder: 'Describe other activities',
  },
  {
    id: 19,
    question: 'How long do you spend on physical activities each day?',
    inputType: 'singleChoice',
    options: [
      'Less than 15 minutes',
      '15-30 minutes',
      '30-60 minutes',
      'More than 60 minutes',
    ],
  },
  {
    id: 20,
    question: 'If your goal is weight loss, are you tracking your daily caloric intake?',
    inputType: 'singleChoice',
    options: [
      'Yes',
      'No',
    ],
  },
  {
    id: 21,
    question: 'If your goal is general wellness, are you interested in starting a home workout routine?',
    inputType: 'singleChoice',
    options: [
      'Yes',
      'No',
    ],
  },
];