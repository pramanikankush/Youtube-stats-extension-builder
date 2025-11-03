import React, { useState, useEffect } from 'react';
import type { ChannelData, VideoData } from '../types';
import { fetchLatestVideos } from '../services/youtubeService';
import { EditIcon, GenerateIcon, SubscribersIcon, VideosIcon, ViewsIcon, LoadingSpinner } from './icons';

interface SuccessStepProps {
    channelData: ChannelData;
    apiKey: string;
    onEdit: () => void;
    onGenerate: () => void;
}

const formatNumber = (numStr: string): string => {
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return '-';
    return num.toLocaleString();
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="bg-gray-100 dark:bg-gray-800/50 p-4 rounded-lg text-center flex flex-col items-center justify-center transition-colors">
        <div className="text-red-500 dark:text-red-400 mb-2">{icon}</div>
        <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
    </div>
);


export const SuccessStep: React.FC<SuccessStepProps> = ({ channelData, apiKey, onEdit, onGenerate }) => {
    const { snippet, statistics } = channelData;
    const [latestVideos, setLatestVideos] = useState<VideoData[]>([]);
    const [videosLoading, setVideosLoading] = useState<boolean>(true);
    const [videoError, setVideoError] = useState<string | null>(null);

    useEffect(() => {
        const loadVideos = async () => {
            if (!channelData.contentDetails?.relatedPlaylists?.uploads) {
                setVideoError("Could not find the channel's upload playlist.");
                setVideosLoading(false);
                return;
            }

            try {
                setVideosLoading(true);
                setVideoError(null);
                const videos = await fetchLatestVideos(apiKey, channelData.contentDetails.relatedPlaylists.uploads);
                setLatestVideos(videos);
            } catch (err) {
                setVideoError(err instanceof Error ? err.message : 'Could not load videos.');
            } finally {
                setVideosLoading(false);
            }
        };

        loadVideos();
    }, [apiKey, channelData]);

    return (
        <div className="w-full flex flex-col items-center gap-6 text-center animate-fade-in">
            <div className="flex flex-col items-center gap-3">
                <img src={snippet.thumbnails.high.url} alt={snippet.title} className="w-24 h-24 rounded-full border-2 border-red-500 shadow-lg"/>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{snippet.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Details verified successfully!</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 w-full">
                <StatCard icon={<SubscribersIcon />} label="Subscribers" value={formatNumber(statistics.subscriberCount)} />
                <StatCard icon={<VideosIcon />} label="Videos" value={formatNumber(statistics.videoCount)} />
                <StatCard icon={<ViewsIcon />} label="Total Views" value={formatNumber(statistics.viewCount)} />
            </div>

            <div className="w-full text-left max-h-52 overflow-y-auto pr-2">
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Latest Videos</h3>
                {videosLoading && (
                    <div className="flex justify-center items-center p-4">
                        <LoadingSpinner />
                    </div>
                )}
                {videoError && <p className="text-red-500 dark:text-red-400 text-center bg-red-500/10 dark:bg-red-900/20 py-2 rounded-md">{videoError}</p>}
                {!videosLoading && !videoError && latestVideos.length > 0 && (
                    <ul className="space-y-3">
                        {latestVideos.map(video => (
                            <li key={video.id}>
                                <a
                                    href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/70 transition-colors"
                                >
                                    <img
                                        src={video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url}
                                        alt=""
                                        className="w-24 h-14 object-cover rounded-md flex-shrink-0"
                                    />
                                    <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2">{video.snippet.title}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
                 {!videosLoading && !videoError && latestVideos.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-500 text-center py-4">No recent videos found.</p>
                )}
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                    onClick={onEdit}
                    className="w-full flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300"
                >
                   <EditIcon /> Edit Details
                </button>
                <button
                    onClick={onGenerate}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-red-500/40"
                >
                   <GenerateIcon/> Generate Extension
                </button>
            </div>
        </div>
    );
};