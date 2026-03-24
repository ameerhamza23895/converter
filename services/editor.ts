import * as FileSystem from 'expo-file-system/legacy';

export interface EditVideoOptions {
  trimStart?: number;
  trimEnd?: number;
  filter?: 'grayscale' | 'sepia' | 'cinematic';
  speed?: number;
}

export const mockEditVideo = async (videoUri: string, options: EditVideoOptions, onProgress: (progress: number) => void): Promise<string> => {
  return new Promise((resolve) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 25;
      onProgress(progress / 100);
      if (progress >= 100) {
        clearInterval(interval);
        const fileName = `edited_video_${Date.now()}.mp4`;
        const destUri = FileSystem.documentDirectory + fileName;
        resolve(destUri);
      }
    }, 300);
  });
};
