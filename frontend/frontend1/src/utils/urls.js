// utils/urls.js
export const API_URL = 'http://127.0.0.1:8000';
export const MEDIA_URL = 'http://127.0.0.1:8000/media';

export const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return `${MEDIA_URL}/avatars/default.jpg`;
    if (avatarPath.startsWith('http')) return avatarPath;
    if (avatarPath.startsWith('/media')) return `${API_URL}${avatarPath}`;
    return `${MEDIA_URL}/avatars/${avatarPath}`;
};

export const getBannerUrl = (bannerPath) => {
    if (!bannerPath) return `${MEDIA_URL}/banners/default.jpg`;
    if (bannerPath.startsWith('http')) return bannerPath;
    if (bannerPath.startsWith('/media')) return `${API_URL}${bannerPath}`;
    return `${MEDIA_URL}/banners/${bannerPath}`;
};