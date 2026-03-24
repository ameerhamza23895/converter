# 🚀 MediaForge

**MediaForge** is a complete, offline-first React Native Expo application for video handling. It includes features for downloading videos, converting video to audio, creating videos from audio, and basic video editing. 

> **Note:** The current version utilizes mock implementations for processing services to provide a responsive UI. To connect with real FFmpeg processing, you should integrate \`ffmpeg-kit-react-native\` and compile with Expo Prebuild (EAS).

## 🎯 Features

1. **Video Downloader (Mocked)**: Simulate downloading videos from URLs to local storage.
2. **Video → Audio Converter**: Pick videos and simulate conversion to MP3/AAC.
3. **Audio → Video Creator**: Turn audio into MP4 files using a static image or gradient.
4. **Basic Video Editing**: Select a video and apply simulated edits like cinematic filters.
5. **Offline Support**: Designed to handle all files within the local device storage without the need for an external backend processing service.

## 🧠 Tech Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (Bottom Tabs)
- **State Management**: Zustand
- **Styling**: NativeWind (Tailwind CSS v3)
- **Media**: \`expo-av\`, \`expo-image-picker\`, \`expo-media-library\`
- **File System**: \`expo-file-system\`

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- Expo Go app on your phone OR an Android/iOS emulator

### Installation

1. Clone or download the repository.
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Start the project:
   \`\`\`bash
   npm start
   \`\`\`
4. Open the Expo Go app on your mobile device and scan the QR code in the terminal.

## 🛠 Building for Production (Native code requiring FFmpeg)

Since \`ffmpeg-kit-react-native\` is a native module, it cannot run inside Expo Go directly once fully implemented.

1. Prebuild the project to generate \`ios\` and \`android\` folders:
   \`\`\`bash
   npx expo prebuild
   \`\`\`
2. Run locally on a simulator/device:
   \`\`\`bash
   npx expo run:android
   # or
   npx expo run:ios
   \`\`\`

## 📝 Legal & Safety

> “You are responsible for content rights. Private and DRM-protected videos are not supported.”

## 🔮 Future Improvements

- Connect \`ffmpeg-kit-react-native\` for real local video/audio manipulation.
- Implement real extractors (e.g., youtube-dl based endpoints) for the downloader.
- Google Ads integration for monetization.
