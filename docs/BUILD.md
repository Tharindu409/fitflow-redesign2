# FitFlow build and release guide

This project is configured as an Expo app. Use the commands below to run it locally and build Android release packages with EAS.

## Requirements
- Node.js 20+
- Expo CLI
- Android Studio / Android SDK (for Android builds)
- EAS CLI (`npm install -g eas-cli`)
- A valid Expo account and authenticated EAS login

## Run locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

Run on Android or iOS:

```bash
npx expo start --android
npx expo start --ios
```

## Build with EAS

Log in to EAS:

```bash
eas login
```

Configure the project if it has not been set up yet:

```bash
eas init
```

### Preview APK

```bash
eas build --platform android --profile preview
```

The preview profile defined in `eas.json` is configured for an Android APK build.

### Production AAB

```bash
eas build --platform android --profile production
```

The production profile is configured for Android App Bundle (AAB) generation with auto-increment enabled.

## Signed AAB workflow

To build a signed Android bundle with EAS, first create or manage credentials:

```bash
eas credentials
```

or use the keystore management helper:

```bash
eas credentials:manage
```

This opens the EAS credential flow where you can:
- create a new keystore if needed
- upload a signing key for Android
- assign it to the app
- view and update the selected build credentials

Use the `eas credentials` command whenever you need to update the Android signing keystore or select a different key for a build.

## Helpful notes
- Keep the app version and build numbers consistent with `app.json`.
- Use the `production` profile for Play Store release builds.
- Use the preview profile for internal testing and APK distribution.
