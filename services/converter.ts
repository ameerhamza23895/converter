// Replace this implementation with FFmpeg later for actual conversions
import * as FileSystem from 'expo-file-system/legacy';

export const mockConvertVideoToAudio = async (videoUri: string, format: 'MP3' | 'AAC' | 'WAV', bitrate: string, onProgress: (progress: number) => void): Promise<string> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      onProgress(progress / 100);
      if (progress >= 100) {
        clearInterval(interval);
        const fileName = `converted_audio_${Date.now()}.${format.toLowerCase()}`;
        const destUri = FileSystem.documentDirectory + fileName;
        resolve(destUri);
      }
    }, 400);
  });
};

export const mockConvertAudioToVideo = async (audioUri: string, bgType: 'image' | 'gradient', onProgress: (progress: number) => void): Promise<string> => {
    return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 15;
          onProgress(progress / 100);
          if (progress >= 100) {
            clearInterval(interval);
            const fileName = `generated_video_${Date.now()}.mp4`;
            const destUri = FileSystem.documentDirectory + fileName;
            resolve(destUri);
          }
        }, 500);
      });
};
