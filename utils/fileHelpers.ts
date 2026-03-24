import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const saveToGallery = async (fileUri: string) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    // Force the video into an exact album so it appears in the Gallery app without fail
    await MediaLibrary.createAlbumAsync('MediaForge', asset, false)
      .catch((e) => console.log('Album already exists or failed to create:', e));
    
    // Return the basic asset. We cannot call getAssetInfoAsync in Expo Go 
    // without full media library permissions, which causes a crash.
    return asset;
  } catch (error) {
    console.error('Error saving to gallery:', error);
    throw error;
  }
};

export const getFileName = (uri: string) => {
  return uri.split('/').pop() || 'file';
};
