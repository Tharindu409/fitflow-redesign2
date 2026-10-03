# FitFlow

FitFlow is a fitness tracking mobile app built with Expo and React Native for a university HCI project. It helps users log workouts, follow a generated training plan, track weekly progress, share updates in a community feed, and log daily nutrition.

## Features
- Branded FitFlow launch screen with a custom fitness-inspired dumbbell logo
- Home dashboard with an active-minute goal, calories burned summary, and one-tap quick logging
- AI Workout Planner using a rule-based generator that can be swapped for a real AI service later
- Weekly progress view with custom bar-chart styling built using React Native Views
- Community feed with post composer and like toggling
- Nutrition logger with calorie goal tracking and validation rules
- Local persistence using AsyncStorage so workouts, meals, and posts remain available across app restarts
- Touch-friendly, high-contrast, accessible interface designed for small screens

## Tech stack
- React Native
- Expo
- React Navigation bottom tabs
- AsyncStorage
- JavaScript

## Project structure

```text
fitflow/
├── App.js
├── app.json
├── eas.json
├── index.js
├── README.md
├── docs/
│   └── BUILD.md
├── src/
│   ├── components/
│   │   ├── Card.js
│   │   ├── Chip.js
│   │   ├── FitFlowLogo.js
│   │   ├── PrimaryButton.js
│   │   └── ProgressBar.js
│   ├── context/
│   │   └── AppContext.js
│   ├── screens/
│   │   ├── CommunityScreen.js
│   │   ├── HomeScreen.js
│   │   ├── NutritionScreen.js
│   │   ├── PlannerScreen.js
│   │   ├── ProgressScreen.js
│   │   └── SplashScreen.js
│   ├── services/
│   │   └── planner.js
│   └── theme/
│       └── theme.js
└── package.json
```

## Run the app

```bash
npm install
npx expo start
```

Then open the Expo Go app or run one of the platform targets:

```bash
npx expo start --android
npx expo start --ios
```

## Build and release

See [docs/BUILD.md](./docs/BUILD.md) for full commands to run the app locally and build Android APK/AAB artifacts with EAS.
