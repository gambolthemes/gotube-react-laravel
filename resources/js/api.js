import {
  categories,
  channels,
  fallbackFeed,
  fallbackHome,
  fallbackProfile,
  fallbackVideo,
  videos,
} from './data/fallback';

const API_ROOT = '/api';

function getToken() {
  return window.localStorage.getItem('gotube_token');
}

async function request(path, options = {}) {
  const { method = 'GET', body, auth = false } = options;
  const headers = {
    Accept: 'application/json',
  };

  if (auth || getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  let payload = body;
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_ROOT}${path}`, {
      method,
      headers,
      body: payload,
    });
  } catch (error) {
    error.offline = true;
    throw error;
  }

  if (!response.ok) {
    const error = new Error('Request failed');
    error.status = response.status;
    try {
      error.payload = await response.json();
    } catch {
      error.payload = {};
    }
    throw error;
  }

  return response.status === 204 ? {} : response.json();
}

async function withFallback(call, fallback) {
  try {
    return await call();
  } catch (error) {
    if (!error.status || error.status >= 500) {
      return typeof fallback === 'function' ? fallback() : fallback;
    }

    throw error;
  }
}

export const api = {
  home() {
    return withFallback(() => request('/home'), fallbackHome);
  },
  videos(search = '') {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return withFallback(() => request(`/videos${query}`), () => ({
      data: videos.filter((video) => {
        const haystack = `${video.title} ${video.channel.name} ${video.category.name}`.toLowerCase();
        return haystack.includes(search.toLowerCase());
      }),
    }));
  },
  video(slug) {
    return withFallback(() => request(`/videos/${slug}`), () => fallbackVideo(slug));
  },
  channels() {
    return withFallback(() => request('/channels'), () => ({ data: channels }));
  },
  channel(slug) {
    return withFallback(() => request(`/channels/${slug}`), () => {
      const channel = channels.find((item) => item.slug === slug) || channels[0];
      return {
        channel,
        videos: videos.filter((video) => video.channel.slug === channel.slug),
      };
    });
  },
  categories() {
    return withFallback(() => request('/categories'), () => ({ data: categories }));
  },
  feed(type) {
    return withFallback(() => request(`/feed/${type}`), () => ({ data: fallbackFeed(type) }));
  },
  login(payload) {
    return request('/auth/login', { method: 'POST', body: payload });
  },
  register(payload) {
    return request('/auth/register', { method: 'POST', body: payload });
  },
  profile() {
    if (!getToken()) {
      return Promise.resolve({ user: fallbackProfile() });
    }

    return withFallback(() => request('/profile', { auth: true }), () => ({ user: fallbackProfile() }));
  },
  updateProfile(payload) {
    return request('/profile', { method: 'PUT', body: payload, auth: true });
  },
  uploadVideo(formData) {
    return request('/videos', { method: 'POST', body: formData, auth: true });
  },
  like(videoId) {
    return request(`/videos/${videoId}/like`, { method: 'POST', auth: true });
  },
  watchLater(videoId) {
    return request(`/videos/${videoId}/watch-later`, { method: 'POST', auth: true });
  },
  history(videoId) {
    return request(`/videos/${videoId}/history`, { method: 'POST', auth: true });
  },
};

