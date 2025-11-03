// This declares the JSZip type for TypeScript. It's expected to be loaded from a CDN.
declare const JSZip: any;

const getManifest = (channelName: string) => `{
  "manifest_version": 3,
  "name": "${channelName} Stats",
  "version": "1.0",
  "description": "Tracks stats for ${channelName}.",
  "permissions": ["storage", "alarms"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon128.png"
  },
  "background": {
    "service_worker": "background.js"
  },
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "host_permissions": [
    "https://www.googleapis.com/"
  ]
}`;

const getPopupHTML = (channelName: string) => `<!DOCTYPE html>
<html>
<head>
    <title>${channelName} Stats</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #18181b; color: #e4e4e7; width: 300px; margin: 0; padding: 16px; font-size: 14px; }
        .container { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .loading { font-style: italic; color: #a1a1aa; }
        .error { color: #f87171; }
        #channel-header { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 16px; width: 100%; }
        #channel-avatar { width: 64px; height: 64px; border-radius: 50%; border: 2px solid #f43f5e; }
        #channel-name { font-size: 18px; font-weight: 700; color: #fff; }
        #last-updated { font-size: 11px; color: #a1a1aa; display: flex; align-items: center; gap: 6px; }
        .live-dot { width: 6px; height: 6px; background-color: #4ade80; border-radius: 50%; animation: pulse 1.5s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        #stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; width: 100%;}
        .stat-card { background-color: #27272a; border: 1px solid #3f3f46; border-radius: 8px; padding: 12px; }
        .stat-value { font-size: 18px; font-weight: 600; color: #fff; }
        .stat-label { font-size: 12px; color: #a1a1aa; margin-top: 4px; }
        a { color: #f43f5e; text-decoration: none; }
        a:hover { text-decoration: underline; }
        #latest-videos-container { margin-top: 20px; width: 100%; }
        .section-title { font-size: 16px; font-weight: 600; color: #e4e4e7; text-align: left; margin-bottom: 12px; border-bottom: 1px solid #3f3f46; padding-bottom: 8px; }
        #latest-videos { display: flex; flex-direction: column; gap: 12px; }
        .video-item { display: flex; align-items: center; gap: 12px; background-color: #27272a; border-radius: 8px; padding: 8px; text-decoration: none; transition: background-color 0.2s; }
        .video-item:hover { background-color: #3f3f46; }
        .video-thumbnail { width: 88px; height: 50px; border-radius: 4px; object-fit: cover; flex-shrink: 0; }
        .video-title { font-size: 13px; color: #e4e4e7; font-weight: 400; text-align: left; margin: 0; line-height: 1.4; }
        .no-videos { color: #a1a1aa; font-style: italic; }
    </style>
</head>
<body>
    <div id="container" class="container">
        <div id="loading" class="loading">Loading stats...</div>
        <div id="error" class="error" style="display: none;"></div>
        <div id="content" style="display: none;">
            <div id="channel-header">
                <img id="channel-avatar" src="" alt="Channel Avatar"/>
                <div>
                    <h1 id="channel-name"></h1>
                    <div id="last-updated"><span class="live-dot"></span><span id="timestamp"></span></div>
                </div>
            </div>
            <div id="stats-grid">
                <div class="stat-card">
                    <div id="subscribers" class="stat-value">-</div>
                    <div class="stat-label">Subscribers</div>
                </div>
                <div class="stat-card">
                    <div id="videos" class="stat-value">-</div>
                    <div class="stat-label">Videos</div>
                </div>
                <div class="stat-card">
                    <div id="views" class="stat-value">-</div>
                    <div class="stat-label">Total Views</div>
                </div>
                <div class="stat-card">
                     <a id="channel-link" href="#" target="_blank">
                        <div class="stat-value" style="font-size: 24px;">→</div>
                        <div class="stat-label">View Channel</div>
                     </a>
                </div>
            </div>
            <div id="latest-videos-container">
                <h3 class="section-title">Latest Videos</h3>
                <div id="latest-videos">
                    <!-- Videos injected by JS -->
                </div>
            </div>
        </div>
    </div>
    <script src="popup.js"></script>
</body>
</html>`;

const getPopupJS = (apiKey: string, channelId: string) => `
const API_KEY = '${apiKey}';
const CHANNEL_ID = '${channelId}';

function formatNumber(numStr) {
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return '-';
    if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function updateTimestamp(timestamp) {
    const timeEl = document.getElementById('timestamp');
    if (timeEl) {
        if (!timestamp) {
            timeEl.textContent = 'Updating...';
            return;
        }
        const date = new Date(timestamp);
        timeEl.textContent = \`Updated at \${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\`;
    }
}

async function fetchStats() {
    updateTimestamp(null); // Indicate that we're fetching
    const url = \`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=\${CHANNEL_ID}&key=\${API_KEY}\`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        if (data.items && data.items.length > 0) {
            const channel = data.items[0];
            const lastUpdated = Date.now();
            updateUI(channel, lastUpdated);
            
            // Cache data
            chrome.storage.local.set({ cachedData: channel, lastUpdated });

            const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
            if (uploadsPlaylistId) {
                fetchLatestVideos(uploadsPlaylistId);
            }
        } else {
             throw new Error('Channel not found.');
        }
    } catch (error) {
        showError(error.message);
    }
}

async function fetchLatestVideos(playlistId) {
    const videosUrl = \`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=\${playlistId}&maxResults=5&key=\${API_KEY}\`;
    try {
        const response = await fetch(videosUrl);
        const data = await response.json();
        if (data.items) {
            updateVideosUI(data.items);
             chrome.storage.local.set({ cachedVideos: data.items });
        }
    } catch (error) {
        console.error('Failed to fetch videos:', error);
    }
}

function updateUI(channel, timestamp) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('content').style.display = 'block';

    const { snippet, statistics } = channel;
    document.getElementById('channel-avatar').src = snippet.thumbnails.high.url;
    document.getElementById('channel-name').textContent = snippet.title;
    document.getElementById('channel-link').href = \`https://www.youtube.com/channel/\${CHANNEL_ID}\`;

    document.getElementById('subscribers').textContent = formatNumber(statistics.subscriberCount);
    document.getElementById('videos').textContent = formatNumber(statistics.videoCount);
    document.getElementById('views').textContent = formatNumber(statistics.viewCount);
    
    updateTimestamp(timestamp);
}

function updateVideosUI(videos) {
    const videosContainer = document.getElementById('latest-videos');
    if (!videosContainer) return;
    videosContainer.innerHTML = ''; // Clear previous content

    if (!videos || videos.length === 0) {
        videosContainer.innerHTML = '<p class="no-videos">No recent videos found.</p>';
        return;
    }

    videos.forEach(video => {
        const videoEl = document.createElement('a');
        videoEl.href = \`https://www.youtube.com/watch?v=\${video.snippet.resourceId.videoId}\`;
        videoEl.target = '_blank';
        videoEl.rel = 'noopener noreferrer';
        videoEl.className = 'video-item';

        const title = document.createElement('h4');
        title.className = 'video-title';
        title.textContent = video.snippet.title;
        
        const thumbnail = document.createElement('img');
        thumbnail.src = video.snippet.thumbnails.medium.url;
        thumbnail.alt = ''; // Alt text is redundant as title is present
        thumbnail.className = 'video-thumbnail';

        videoEl.appendChild(thumbnail);
        videoEl.appendChild(title);
        
        videosContainer.appendChild(videoEl);
    });
}

function showError(message) {
    document.getElementById('loading').style.display = 'none';
    const errorEl = document.getElementById('error');
    errorEl.textContent = \`Error: \${message}\`;
    errorEl.style.display = 'block';
}


document.addEventListener('DOMContentLoaded', () => {
    // Show cached data immediately if available
    chrome.storage.local.get(['cachedData', 'lastUpdated', 'cachedVideos'], (result) => {
        if (result.cachedData && result.lastUpdated) {
            updateUI(result.cachedData, result.lastUpdated);
        }
        if (result.cachedVideos) {
            updateVideosUI(result.cachedVideos);
        }
        // Then, fetch fresh data
        fetchStats();
    });
});
`;

const getBackgroundJS = (apiKey: string, channelId: string) => `
const API_KEY = '${apiKey}';
const CHANNEL_ID = '${channelId}';

function formatBadgeNumber(numStr) {
    const num = parseInt(numStr, 10);
    if (isNaN(num)) return '';
    if (num >= 1000000) return Math.floor(num / 1000000) + 'M';
    if (num >= 1000) return Math.floor(num / 1000) + 'K';
    return num.toString();
}

async function updateBadge() {
    const url = \`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=\${CHANNEL_ID}&key=\${API_KEY}\`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            const subscriberCount = data.items[0].statistics.subscriberCount;
            chrome.action.setBadgeText({ text: formatBadgeNumber(subscriberCount) });
            chrome.action.setBadgeBackgroundColor({ color: '#f43f5e' });
        }
    } catch (error) {
        console.error('Failed to update badge:', error);
        chrome.action.setBadgeText({ text: '!' });
        chrome.action.setBadgeBackgroundColor({ color: '#facc15' });
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ apiKey: API_KEY, channelId: CHANNEL_ID });
    updateBadge();
    chrome.alarms.create('update-badge-alarm', { periodInMinutes: 5 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'update-badge-alarm') {
        updateBadge();
    }
});
`;

// Base64 encoded simple 1x1 transparent PNG to avoid needing real image files
const ICON_16_B64 = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAUSURBVDhPY2RgYPz/P10DAAALBAH+n48K2AAAAABJRU5ErkJggg==";
const ICON_48_B64 = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAaSURBVFhH7cExAQAAAMKg9U/tYwVBERVVVVVVlQ8KF6QAAQECB44AAAAASUVORK5CYII=";
const ICON_128_B64 = "iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAnSURBVFhH7cEBAQAAAIIg/69uSEABAAAAAAAAAAAAAAAAAAAAAECgSQUgAAE3CgU6AAAAAElFTSuQmCC";

function base64ToBlob(base64: string, type: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], {type: type});
}


export const generateExtensionZip = async (apiKey: string, channelId: string, channelName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (typeof JSZip === 'undefined') {
            return reject(new Error('JSZip library not found.'));
        }

        const zip = new JSZip();

        zip.file("manifest.json", getManifest(channelName));
        zip.file("popup.html", getPopupHTML(channelName));
        zip.file("popup.js", getPopupJS(apiKey, channelId));
        zip.file("background.js", getBackgroundJS(apiKey, channelId));

        // Add icons
        zip.file("icon16.png", base64ToBlob(ICON_16_B64, 'image/png'));
        zip.file("icon48.png", base64ToBlob(ICON_48_B64, 'image/png'));
        zip.file("icon128.png", base64ToBlob(ICON_128_B64, 'image/png'));

        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(content);
                const safeFileName = channelName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                link.download = `${safeFileName}_stats_extension.zip`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
                resolve();
            })
            .catch(err => reject(err));
    });
};