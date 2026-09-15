import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { api } from './api';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import CategoriesPage from './pages/CategoriesPage';
import ChannelDetailPage from './pages/ChannelDetailPage';
import ChannelsPage from './pages/ChannelsPage';
import HelpPage from './pages/HelpPage';
import HomePage from './pages/HomePage';
import LibraryPage from './pages/LibraryPage';
import PricingPage from './pages/PricingPage';
import SettingsPage from './pages/SettingsPage';
import StaticPage from './pages/StaticPage';
import VideoDetailPage from './pages/VideoDetailPage';

function currentPath() {
  return window.location.pathname === '/home' ? '/' : window.location.pathname;
}

export default function App() {
  const [path, setPath] = useState(currentPath);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem('gotube_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const onPopState = () => setPath(currentPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [path]);

  const navigate = useCallback((href, event) => {
    if (event) {
      event.preventDefault();
    }

    if (!href || href.startsWith('http') || href.startsWith('#')) {
      return;
    }

    const next = href === '/home' ? '/' : href;
    window.history.pushState({}, '', next);
    setPath(next);
  }, []);

  const handleAuth = useCallback((result) => {
    if (result?.token) {
      window.localStorage.setItem('gotube_token', result.token);
    }

    if (result?.user) {
      window.localStorage.setItem('gotube_user', JSON.stringify(result.user));
      setUser(result.user);
    }

    navigate('/');
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await api.logout?.();
    } catch {
      // Local logout still keeps the UI responsive if the backend is offline.
    }

    window.localStorage.removeItem('gotube_token');
    window.localStorage.removeItem('gotube_user');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const route = useMemo(() => resolveRoute(path), [path]);

  if (route.name === 'login' || route.name === 'register') {
    return <AuthPage mode={route.name} navigate={navigate} onAuth={handleAuth} />;
  }

  return (
    <Layout
      path={path}
      navigate={navigate}
      search={search}
      setSearch={setSearch}
      user={user}
      onLogout={handleLogout}
    >
      {renderRoute(route, { navigate, search, setSearch, user, setUser })}
    </Layout>
  );
}

function resolveRoute(path) {
  if (path === '/' || path === '/home') {
    return { name: 'home' };
  }

  const segments = path.split('/').filter(Boolean);

  if (segments[0] === 'videos' && segments[1]) {
    return { name: 'video', slug: segments[1] };
  }

  if (segments[0] === 'channels' && segments[1]) {
    return { name: 'channel', slug: segments[1] };
  }

  const named = {
    channels: 'channels',
    categories: 'categories',
    'watch-later': 'watch-later',
    'liked-videos': 'liked-videos',
    history: 'history',
    settings: 'settings',
    pricing: 'pricing',
    help: 'help',
    privacy: 'privacy',
    terms: 'terms',
    login: 'login',
    register: 'register',
  };

  return { name: named[segments[0]] || 'home' };
}

function renderRoute(route, props) {
  if (route.name === 'video') {
    return <VideoDetailPage slug={route.slug} {...props} />;
  }

  if (route.name === 'channel') {
    return <ChannelDetailPage slug={route.slug} {...props} />;
  }

  if (route.name === 'channels') {
    return <ChannelsPage {...props} />;
  }

  if (route.name === 'categories') {
    return <CategoriesPage {...props} />;
  }

  if (route.name === 'watch-later') {
    return <LibraryPage type="watch-later" title="Watch Later" subtitle="Videos saved for a better cup of focus." {...props} />;
  }

  if (route.name === 'liked-videos') {
    return <LibraryPage type="liked-videos" title="Liked Videos" subtitle="The tutorials you gave a thumbs up." {...props} />;
  }

  if (route.name === 'history') {
    return <LibraryPage type="history" title="History" subtitle="A clean list of videos you recently opened." {...props} />;
  }

  if (route.name === 'settings') {
    return <SettingsPage {...props} />;
  }

  if (route.name === 'pricing') {
    return <PricingPage {...props} />;
  }

  if (route.name === 'help') {
    return <HelpPage {...props} />;
  }

  if (route.name === 'privacy') {
    return <StaticPage kind="privacy" {...props} />;
  }

  if (route.name === 'terms') {
    return <StaticPage kind="terms" {...props} />;
  }

  return <HomePage {...props} />;
}

