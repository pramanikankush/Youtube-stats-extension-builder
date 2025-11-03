
import type { ChannelData, VideoData } from '../types';

export const validateChannel = async (apiKey: string, channelId: string): Promise<ChannelData> => {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.error) {
            const errorMessage = data.error?.message || 'Invalid API Key or Channel ID.';
            if (errorMessage.toLowerCase().includes('api key not valid')) {
                 throw new Error('The API key provided is not valid. Please check your key on the Google Cloud Console and ensure it is correct and not restricted.');
            }
            throw new Error(errorMessage);
        }

        if (!data.items || data.items.length === 0) {
            throw new Error('No channel found with the provided ID.');
        }
        
        return data.items[0];
    } catch (error) {
        console.error('YouTube API validation error:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error or invalid response from YouTube API.');
    }
};

export const fetchLatestVideos = async (apiKey: string, playlistId: string): Promise<VideoData[]> => {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=5&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.error?.message || 'Failed to fetch videos.');
        }

        return data.items || [];
    } catch (error) {
        console.error('Failed to fetch latest videos:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Network error or invalid response when fetching videos.');
    }
};
