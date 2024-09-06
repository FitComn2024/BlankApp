const ClientsData = {
  "users": [
    {
      "userId": 1,
      "name": "Alice",
      "dp": "https://example.com/dp/alice.jpg",
      "dob": "1990-05-15",
      "gender": "Female",
      "height": 165,
      "weight": 60,
      "goal": "Increase muscle mass",
      "location": "New York",
      "zipcode": "10001",
      "city": "New York",
      "lat": 40.7128,
      "long": -74.0060,
      "progress": "50%",
      "languages": ["English", "Spanish"],
      "medicalComplications": "No",
      "medicalInformation": {
        "hasHeartCondition": false,
        "experiencesChestPain": false,
        "hasDiabetes": false,
        "isPregnant": false,
        "takesMedication": false,
        "otherConditions": "None"
      },
      "isGymGoer": true,
      "gymGoerQuestions": {
        "frequency": "5-6 times a week",
        "workoutType": "Weightlifting",
        "personalTrainer": "Yes",
        "preferredEquipment": "Free weights",
        "workoutStructure": "Predefined routine",
        "mainFocus": "Building muscle",
        "trackProgress": "Yes, I track every workout",
        "gymSatisfaction": "Very satisfied",
        "diet": "High protein, low carb",
        "shortTermGoals": "Increase muscle mass"
      },
      "photos": [
        "https://example.com/photos/alice1.jpg",
        "https://example.com/photos/alice2.jpg"
      ]
    },
    {
      "userId": 2,
      "name": "Bob",
      "dp": "https://example.com/dp/bob.jpg",
      "dob": "1985-03-22",
      "gender": "Male",
      "height": 180,
      "weight": 85,
      "goal": "Lose weight",
      "location": "Los Angeles",
      "zipcode": "90001",
      "city": "Los Angeles",
      "lat": 34.0522,
      "long": -118.2437,
      "progress": "30%",
      "languages": ["English"],
      "medicalComplications": "Yes",
      "medicalInformation": {
        "hasHeartCondition": false,
        "experiencesChestPain": true,
        "hasDiabetes": true,
        "isPregnant": false,
        "takesMedication": true,
        "otherConditions": "Hypertension"
      },
      "isGymGoer": false,
      "nonGymGoerQuestions": {
        "activityType": "Running, cycling",
        "frequency": "3-4 times a week",
        "workoutType": "Cardio",
        "fitnessApps": "Yes, Strava",
        "homeEquipment": "Basic equipment",
        "motivation": "Setting personal goals",
        "diet": "Balanced diet with a calorie deficit",
        "challenges": "Weather conditions",
        "progressMeasurement": "Weight scale",
        "shortTermGoals": "Increase physical activity"
      },
      "photos": [
        "https://example.com/photos/bob1.jpg",
        "https://example.com/photos/bob2.jpg"
      ]
    },
    {
      "userId": 3,
      "name": "Charlie",
      "dp": "https://example.com/dp/charlie.jpg",
      "dob": "1992-08-10",
      "gender": "Male",
      "height": 175,
      "weight": 75,
      "goal": "Improve endurance",
      "location": "Chicago",
      "zipcode": "60601",
      "city": "Chicago",
      "lat": 41.8781,
      "long": -87.6298,
      "progress": "40%",
      "languages": ["English", "French"],
      "medicalComplications": "No",
      "medicalInformation": {
        "hasHeartCondition": false,
        "experiencesChestPain": false,
        "hasDiabetes": false,
        "isPregnant": false,
        "takesMedication": false,
        "otherConditions": "None"
      },
      "isGymGoer": true,
      "gymGoerQuestions": {
        "frequency": "Every day",
        "workoutType": "HIIT",
        "personalTrainer": "No",
        "preferredEquipment": "Bodyweight exercises",
        "workoutStructure": "Following a trainer's guidance",
        "mainFocus": "Increasing strength",
        "trackProgress": "Yes, I track occasionally",
        "gymSatisfaction": "Satisfied",
        "diet": "High protein",
        "shortTermGoals": "Train for a marathon"
      },
      "photos": [
        "https://example.com/photos/charlie1.jpg",
        "https://example.com/photos/charlie2.jpg"
      ]
    },
    {
      "userId": 4,
      "name": "David",
      "dp": "https://example.com/dp/david.jpg",
      "dob": "1980-11-05",
      "gender": "Male",
      "height": 170,
      "weight": 68,
      "goal": "Enhance flexibility",
      "location": "Houston",
      "zipcode": "77001",
      "city": "Houston",
      "lat": 29.7604,
      "long": -95.3698,
      "progress": "60%",
      "languages": ["English"],
      "medicalComplications": "No",
      "medicalInformation": {
        "hasHeartCondition": false,
        "experiencesChestPain": false,
        "hasDiabetes": false,
        "isPregnant": false,
        "takesMedication": false,
        "otherConditions": "None"
      },
      "isGymGoer": false,
      "nonGymGoerQuestions": {
        "activityType": "Yoga, Pilates",
        "frequency": "Every day",
        "workoutType": "Yoga/Pilates",
        "fitnessApps": "No",
        "homeEquipment": "Yoga mat",
        "motivation": "Exercising with family",
        "diet": "Vegetarian",
        "challenges": "Limited space at home",
        "progressMeasurement": "Body measurements",
        "shortTermGoals": "Enhance flexibility"
      },
      "photos": [
        "https://example.com/photos/david1.jpg",
        "https://example.com/photos/david2.jpg"
      ]
    },
    {
      "userId": 5,
      "name": "Eve",
      "dp": "https://example.com/dp/eve.jpg",
      "dob": "1988-12-12",
      "gender": "Female",
      "height": 160,
      "weight": 55,
      "goal": "Reduce body fat",
      "location": "Phoenix",
      "zipcode": "85001",
      "city": "Phoenix",
      "lat": 33.4484,
      "long": -112.0740,
      "progress": "70%",
      "languages": ["English", "German"],
      "medicalComplications": "Yes",
      "medicalInformation": {
        "hasHeartCondition": false,
        "experiencesChestPain": true,
        "hasDiabetes": false,
        "isPregnant": true,
        "takesMedication": false,
        "otherConditions": "Asthma"
      },
      "isGymGoer": true,
      "gymGoerQuestions": {
        "frequency": "3-4 times a week",
        "workoutType": "Functional training",
        "personalTrainer": "Yes",
        "preferredEquipment": "Free weights",
        "workoutStructure": "Predefined routine",
        "mainFocus": "Burning fat",
        "trackProgress": "No, I do not track",
        "gymSatisfaction": "Neutral",
        "diet": "Keto diet",
        "shortTermGoals": "Reduce body fat"
      },
      "photos": [
        "https://example.com/photos/eve1.jpg",
        "https://example.com/photos/eve2.jpg"
      ]
    }
  ]
}





const TrainersData = {
  "trainers": [
    {
      "userId": 1,
      "name": "John Smith",
      "dp": "https://example.com/dp/johnsmith.jpg",
      "dob": "1982-07-14",
      "gender": "Male",
      "height": 180,  // height in cm
      "weight": 80,  // weight in kg
      "expertise": "Personal Trainer, Strength Training, Bodybuilding",
      "numberOfClients": 50,
      "rating": 4.9,
      "location": "New York",
      "zipcode": "10001",
      "city": "New York",
      "lat": 40.7128,
      "long": -74.0060,
      "photos": [
        "https://example.com/photos/johnsmith1.jpg",
        "https://example.com/photos/johnsmith2.jpg"
      ],
      "certifications": ["NASM Certified Personal Trainer", "CPR Certified"],
      "ratePerMonth": 300,  // in USD
      "languages": ["English", "Spanish"],
      "distanceFromUser": "5 miles",
      "contactLink": "https://example.com/contact/johnsmith",
      "reviews": [
        {
          "reviewerId": 2,
          "reviewer": "Jane Doe",
          "date": "2024-01-15",
          "rating": 5,
          "comment": "John is an excellent trainer who really helped me reach my goals!"
        },
        {
          "reviewerId": 3,
          "reviewer": "Bob Lee",
          "date": "2024-02-10",
          "rating": 4.8,
          "comment": "Great sessions, very knowledgeable!"
        }
      ]
    },
    {
      "userId": 2,
      "name": "Jane Doe",
      "dp": "https://example.com/dp/janedoe.jpg",
      "dob": "1986-02-28",
      "gender": "Female",
      "height": 165,  // height in cm
      "weight": 60,  // weight in kg
      "expertise": "Yoga Instructor, Flexibility, Meditation",
      "numberOfClients": 75,
      "rating": 4.8,
      "location": "Los Angeles",
      "zipcode": "90001",
      "city": "Los Angeles",
      "lat": 34.0522,
      "long": -118.2437,
      "photos": [
        "https://example.com/photos/janedoe1.jpg",
        "https://example.com/photos/janedoe2.jpg"
      ],
      "certifications": ["RYT 500", "First Aid Certified"],
      "ratePerMonth": 250,  // in USD
      "languages": ["English", "French"],
      "distanceFromUser": "10 miles",
      "contactLink": "https://example.com/contact/janedoe",
      "reviews": [
        {
          "reviewerId": 1,
          "reviewer": "Alice Brown",
          "date": "2024-03-05",
          "rating": 4.9,
          "comment": "Jane's yoga classes are transformative!"
        },
        {
          "reviewerId": 4,
          "reviewer": "Chris Green",
          "date": "2024-04-12",
          "rating": 4.7,
          "comment": "Very calming and professional."
        }
      ]
    },
    {
      "userId": 3,
      "name": "Michael Johnson",
      "dp": "https://example.com/dp/michaeljohnson.jpg",
      "dob": "1979-11-05",
      "gender": "Male",
      "height": 185,  // height in cm
      "weight": 85,  // weight in kg
      "expertise": "Nutritionist, Weight Loss, Dietary Planning",
      "numberOfClients": 100,
      "rating": 4.7,
      "location": "Chicago",
      "zipcode": "60601",
      "city": "Chicago",
      "lat": 41.8781,
      "long": -87.6298,
      "photos": [
        "https://example.com/photos/michaeljohnson1.jpg",
        "https://example.com/photos/michaeljohnson2.jpg"
      ],
      "certifications": ["Registered Dietitian", "Certified Nutrition Specialist"],
      "ratePerMonth": 200,  // in USD
      "languages": ["English"],
      "distanceFromUser": "3 miles",
      "contactLink": "https://example.com/contact/michaeljohnson",
      "reviews": [
        {
          "reviewerId": 2,
          "reviewer": "David White",
          "date": "2024-05-22",
          "rating": 4.6,
          "comment": "Michael's diet plan worked wonders for me."
        },
        {
          "reviewerId": 4,
          "reviewer": "Eva Black",
          "date": "2024-06-18",
          "rating": 4.7,
          "comment": "Very knowledgeable and supportive."
        }
      ]
    },
    {
      "userId": 4,
      "name": "Emily Davis",
      "dp": "https://example.com/dp/emilydavis.jpg",
      "dob": "1990-09-23",
      "gender": "Female",
      "height": 170,  // height in cm
      "weight": 58,  // weight in kg
      "expertise": "Pilates Instructor, Core Strength, Balance",
      "numberOfClients": 30,
      "rating": 4.6,
      "location": "Houston",
      "zipcode": "77001",
      "city": "Houston",
      "lat": 29.7604,
      "long": -95.3698,
      "photos": [
        "https://example.com/photos/emilydavis1.jpg",
        "https://example.com/photos/emilydavis2.jpg"
      ],
      "certifications": ["Certified Pilates Instructor", "CPR Certified"],
      "ratePerMonth": 280,  // in USD
      "languages": ["English"],
      "distanceFromUser": "7 miles",
      "contactLink": "https://example.com/contact/emilydavis",
      "reviews": [
        {
          "reviewerId": 1,
          "reviewer": "Grace Taylor",
          "date": "2024-07-14",
          "rating": 4.8,
          "comment": "Emily's Pilates sessions improved my core strength significantly."
        },
        {
          "reviewerId": 3,
          "reviewer": "Hank Martin",
          "date": "2024-08-02",
          "rating": 4.5,
          "comment": "Good instructor, very attentive."
        }
      ]
    },
    {
      "userId": 5,
      "name": "Mark Wilson",
      "dp": "https://example.com/dp/markwilson.jpg",
      "dob": "1985-06-12",
      "gender": "Male",
      "height": 175,  // height in cm
      "weight": 78,  // weight in kg
      "expertise": "CrossFit Coach, High-Intensity Training, Endurance",
      "numberOfClients": 40,
      "rating": 4.8,
      "location": "Phoenix",
      "zipcode": "85001",
      "city": "Phoenix",
      "lat": 33.4484,
      "long": -112.0740,
      "photos": [
        "https://example.com/photos/markwilson1.jpg",
        "https://example.com/photos/markwilson2.jpg"
      ],
      "certifications": ["CrossFit Level 1 Trainer", "First Aid Certified"],
      "ratePerMonth": 320,  // in USD
      "languages": ["English", "Spanish"],
      "distanceFromUser": "2 miles",
      "contactLink": "https://example.com/contact/markwilson",
      "reviews": [
        {
          "reviewerId": 3,
          "reviewer": "Ivy Brown",
          "date": "2024-08-10",
          "rating": 4.9,
          "comment": "Mark is an exceptional CrossFit coach!"
        },
        {
          "reviewerId": 2,
          "reviewer": "Jack Davis",
          "date": "2024-08-15",
          "rating": 4.8,
          "comment": "Very challenging but effective workouts."
        }
      ]
    }
  ]
}
