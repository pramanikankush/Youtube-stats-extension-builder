export type Step = 'input' | 'verifying' | 'success' | 'generating' | 'done';

export type Page = 'home' | 'about' | 'contact';

export interface ChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url:string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  localized: {
    title: string;
    description: string;
  };
  country: string;
}

export interface ChannelStatistics {
  viewCount: string;
  subscriberCount: string;
  hiddenSubscriberCount: boolean;
  videoCount: string;
}

export interface ChannelContentDetails {
  relatedPlaylists: {
    likes: string;
    uploads: string;
  };
}

export interface ChannelData {
  kind: string;
  etag: string;
  id: string;
  snippet: ChannelSnippet;
  statistics: ChannelStatistics;
  contentDetails: ChannelContentDetails;
}

// Types for video data
export interface VideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoThumbnails {
  default: VideoThumbnail;
  medium: VideoThumbnail;
  high: VideoThumbnail;
  standard?: VideoThumbnail;
  maxres?: VideoThumbnail;
}

export interface ResourceId {
  kind: string;
  videoId: string;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: VideoThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
}

export interface VideoData {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
}