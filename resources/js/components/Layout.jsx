import React, { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  Bolt,
  Bookmark,
  Clock,
  HelpCircle,
  History,
  Home,
  Layers,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Settings,
  ThumbsUp,
  UploadCloud,
  User,
  Users,
  X,
} from 'lucide-react';
import { api } from '../api';
import { fallbackFeed, notifications } from '../data/fallback';
import VideoCard from './VideoCard';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/channels', label: 'Subscriptions', icon: Users },
  { href: '/watch-later', label: 'Watch Later', icon: Clock },
  { href: '/liked-videos', label: 'Liked Videos', icon: ThumbsUp },
  { href: '/categories', label: 'Categories', icon: Layers },
  { href: '/history', label: 'History', icon: History },
];

const pageItems = [
  { href: '/settings', label: 'Setting', icon: Settings },
  { href: '/help', label: 'Help Community', icon: HelpCircle },
  { href: '/pricing', label: 'Upgrade To Premium', icon: Bolt },
];

export default function Layout({
  children,
  path,
  navigate,
  search,
  setSearch,
  user,
  onLogout,
}) {
  const [collapsed, setCollapsed] = useState(() => window.innerWidth < 1100);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [night, setNight] = useState(() => window.localStorage.getItem('gmtNightMode') === 'true');
  const [activePanel, setActivePanel] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVideos, setDrawerVideos] = useState(() => fallbackFeed('watch-later').slice(0, 6));

  useEffect(() => {
    document.documentElement.classList.toggle('night-mode', night);
    if (night) {
      window.localStorage.setItem('gmtNightMode', 'true');
    } else {
      window.localStorage.removeItem('gmtNightMode');
    }
  }, [night]);

  useEffect(() => {
    api.feed('watch-later').then((result) => setDrawerVideos(result.data.slice(0, 6)));
  }, []);

  const currentUser = user || {
    name: 'Richard Ali',
    email: 'admin@gotube.test',
    avatar: '/assets/images/avatars/avatar-1.jpg',
  };

  const recentSearches = useMemo(
    () => [
      'Adobe XD Design Free Tutorial',
      'Sticky HTML element',
      'Prototype Faster with Mockplus',
      'Laravel Package Initializing',
    ],
    [],
  );

  const submitSearch = (event) => {
    event.preventDefault();
    navigate('/', event);
    setActivePanel(null);
  };

  return (
    <>
      <div
        id="wrapper"
        className={[
          collapsed ? 'collapse-sidebar' : '',
          mobileOpen ? 'mobile-visible' : '',
          night ? 'gotube-night' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <aside className="main_sidebar">
          {mobileOpen ? (
            <button
              type="button"
              className="side-overlay gotube-side-overlay"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            />
          ) : null}
          <div className="sidebar-header">
            <h4>Navigation</h4>
            <button type="button" className="btn-close clean-button" onClick={() => setMobileOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div className="sidebar">
            <div className="sidebar_innr">
              <SidebarSection title="Browse" items={navItems} path={path} navigate={navigate} />

              <div className="sections">
                <h3>Subscriptions</h3>
                <ul>
                  {drawerVideos.slice(0, 4).map((video) => (
                    <li key={video.id}>
                      <a href={`/channels/${video.channel?.slug}`} onClick={(event) => navigate(`/channels/${video.channel?.slug}`, event)}>
                        <img src={video.channel?.avatar} alt="" />
                        {video.channel?.name}
                        {video.isLive ? <span className="dot-notiv" /> : null}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="uk-flex uk-flex-center mb-3">
                  <a href="/channels" className="button default circle px-5" onClick={(event) => navigate('/channels', event)}>
                    More Channels
                  </a>
                </div>
              </div>

              <SidebarSection title="Pages" items={pageItems} path={path} navigate={navigate} />

              <div id="foot">
                <ul>
                  <li>
                    <a href="/terms" onClick={(event) => navigate('/terms', event)}>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/settings" onClick={(event) => navigate('/settings', event)}>
                      Setting
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" onClick={(event) => navigate('/privacy', event)}>
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" onClick={(event) => navigate('/terms', event)}>
                      Terms - Conditions
                    </a>
                  </li>
                </ul>
                <div className="foot-content">
                  <p>
                    (c) 2026 <strong>GoTube</strong>. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div id="main_header" className={night ? 'uk-light bg-dark gotube-header' : 'gotube-header'}>
          <header>
            <button
              type="button"
              className="header-traiger clean-button"
              onClick={() => (window.innerWidth < 960 ? setMobileOpen(true) : setCollapsed((value) => !value))}
              aria-label="Toggle navigation"
              title="Toggle navigation"
            >
              <Menu size={23} />
            </button>

            <div id="logo">
              <a href="/" onClick={(event) => navigate('/', event)}>
                <img src="/assets/images/logo.png" alt="GoTube" />
                <img src="/assets/images/logo-light.png" className="logo-inverse" alt="GoTube" />
              </a>
            </div>

            <div className="head_search">
              <form onSubmit={submitSearch}>
                <div className="head_search_cont">
                  <input
                    value={search}
                    type="text"
                    className="form-control"
                    placeholder="Search for videos, channels, courses and more"
                    autoComplete="off"
                    onChange={(event) => setSearch(event.target.value)}
                    onFocus={() => setActivePanel('search')}
                  />
                  <Search className="s_icon" size={18} />
                </div>

                {activePanel === 'search' ? (
                  <div className="dropdown-search gotube-popover">
                    <ul className="dropdown-search-list">
                      <li className="list-title">Recent Searches</li>
                      {recentSearches.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            className="clean-button dropdown-link"
                            onClick={() => {
                              setSearch(item);
                              navigate('/');
                              setActivePanel(null);
                            }}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                      <li className="list-footer">
                        <a href="/history" onClick={(event) => navigate('/history', event)}>
                          Searches History
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </form>
            </div>

            <div className="head_user">
              <a href="/pricing" className="btn-upgrade uk-visible@s" onClick={(event) => navigate('/pricing', event)}>
                <Bolt size={15} /> Pro
              </a>
              <button type="button" className="btn-upload uk-visible@s" onClick={() => setUploadOpen(true)}>
                <UploadCloud size={15} /> Upload
              </button>

              <button
                type="button"
                className="opts_icon clean-button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open subscription feed"
                title="Subscription feed"
              >
                <Bookmark size={20} />
                <span>9+</span>
              </button>

              <HeaderIcon
                icon={MessageCircle}
                label="Messages"
                badge="4"
                active={activePanel === 'messages'}
                onClick={() => setActivePanel(activePanel === 'messages' ? null : 'messages')}
              />
              <HeaderIcon
                icon={Bell}
                label="Notifications"
                badge="3"
                active={activePanel === 'notifications'}
                onClick={() => setActivePanel(activePanel === 'notifications' ? null : 'notifications')}
              />

              <button
                type="button"
                className="opts_account clean-button"
                onClick={() => setActivePanel(activePanel === 'profile' ? null : 'profile')}
                aria-label="Open profile menu"
              >
                <img src={currentUser.avatar || '/assets/images/avatars/avatar-1.jpg'} alt={currentUser.name} />
              </button>
            </div>
          </header>

          <HeaderPanels
            activePanel={activePanel}
            setActivePanel={setActivePanel}
            currentUser={currentUser}
            night={night}
            setNight={setNight}
            navigate={navigate}
            onLogout={onLogout}
          />
        </div>

        <main className="main_content">
          <div className="main_content_inner">{children}</div>
        </main>
      </div>

      {uploadOpen ? <UploadModal onClose={() => setUploadOpen(false)} navigate={navigate} /> : null}
      {drawerOpen ? (
        <SubscriptionDrawer videos={drawerVideos} onClose={() => setDrawerOpen(false)} navigate={navigate} />
      ) : null}
    </>
  );
}

function SidebarSection({ title, items, path, navigate }) {
  return (
    <div className="sections">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => {
          const Icon = item.icon;
          const active = item.href === '/' ? path === '/' || path === '/home' : path.startsWith(item.href);

          return (
            <li key={item.href} className={active ? 'active' : ''}>
              <a href={item.href} onClick={(event) => navigate(item.href, event)}>
                <Icon size={19} />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function HeaderIcon({ icon: Icon, label, badge, active, onClick }) {
  return (
    <button
      type="button"
      className={`opts_icon clean-button ${active ? 'is-active' : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon size={20} />
      {badge ? <span>{badge}</span> : null}
    </button>
  );
}

function HeaderPanels({ activePanel, setActivePanel, currentUser, night, setNight, navigate, onLogout }) {
  if (!activePanel || activePanel === 'search') {
    return null;
  }

  if (activePanel === 'profile') {
    return (
      <div className="dropdown-notifications small gotube-popover profile-popover">
        <div className="dropdown-user-details">
          <div className="dropdown-user-avatar">
            <img src={currentUser.avatar || '/assets/images/avatars/avatar-1.jpg'} alt="" />
          </div>
          <div className="dropdown-user-name">
            {currentUser.name} <span>verified</span>
          </div>
        </div>
        <ul className="dropdown-user-menu">
          <li>
            <a href="/channels/jonathan-madano" onClick={(event) => navigate('/channels/jonathan-madano', event)}>
              <User size={16} /> My Channel
            </a>
          </li>
          <li>
            <a href="/liked-videos" onClick={(event) => navigate('/liked-videos', event)}>
              <ThumbsUp size={16} /> Liked Videos
            </a>
          </li>
          <li>
            <a href="/settings" onClick={(event) => navigate('/settings', event)}>
              <Settings size={16} /> Account Settings
            </a>
          </li>
          <li>
            <button type="button" className="clean-button btn-night-mode" onClick={() => setNight(!night)}>
              <Moon size={16} /> Night mode
              <span className={`btn-night-mode-switch ${night ? 'is-on' : ''}`}>
                <span className="uk-switch-button" />
              </span>
            </button>
          </li>
          <li className="menu-divider" />
          <li>
            <button
              type="button"
              className="clean-button logout-link"
              onClick={() => {
                setActivePanel(null);
                onLogout();
              }}
            >
              <LogOut size={16} /> Log Out
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="dropdown-notifications gotube-popover notification-popover">
      <div className="dropdown-notifications-headline">
        <h4>{activePanel === 'messages' ? 'Messages' : 'Notifications'}</h4>
        <button type="button" className="clean-button" onClick={() => setActivePanel(null)} aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <div className="dropdown-notifications-content">
        {notifications.map((notification) => (
          <a href="/video" key={notification.id} onClick={(event) => navigate('/videos/how-to-create-a-basic-sticky-html-element-using-css', event)}>
            <span className="notification-avatar">
              <img src={notification.avatar} alt="" />
            </span>
            <span className="notification-text">
              <strong>{notification.actor}</strong> {notification.text}
              <br />
              <span className="time-ago">{notification.time}</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function UploadModal({ onClose, navigate }) {
  const [mode, setMode] = useState('file');
  const [status, setStatus] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mode === 'link') {
      formData.delete('video');
    } else {
      formData.delete('source_url');
    }

    try {
      const result = await api.uploadVideo(formData);
      setStatus('Upload saved. Opening your new video...');
      setTimeout(() => {
        onClose();
        navigate(`/videos/${result.video.slug}`);
      }, 650);
    } catch (error) {
      if (error.status === 401) {
        setStatus('Please login first, then upload.');
        return;
      }

      setStatus('Backend is offline here, but the Laravel upload endpoint is ready.');
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Upload video">
      <div className="upload-modal">
        <div className="dropdown-notifications-headline">
          <h4>Upload Video</h4>
          <button type="button" className="clean-button" onClick={onClose} aria-label="Close upload">
            <X size={18} />
          </button>
        </div>
        <form onSubmit={submit} className="upload-form">
          <label>
            Title
            <input name="title" className="uk-input" type="text" placeholder="Laravel upload workflow" required />
          </label>
          <label>
            Description
            <textarea name="description" className="uk-textarea" rows="4" placeholder="Tell viewers what this video covers" />
          </label>

          <div className="segmented-control" aria-label="Upload source">
            <button type="button" className={mode === 'file' ? 'active' : ''} onClick={() => setMode('file')}>
              <UploadCloud size={16} /> File
            </button>
            <button type="button" className={mode === 'link' ? 'active' : ''} onClick={() => setMode('link')}>
              <Layers size={16} /> Import
            </button>
          </div>

          {mode === 'file' ? (
            <label className="upload-drop">
              <img src="/assets/images/upload.png" alt="" />
              <span>Choose video file</span>
              <input name="video" type="file" accept="video/mp4,video/webm,video/quicktime" />
            </label>
          ) : (
            <label>
              Video URL
              <input name="source_url" className="uk-input" type="url" placeholder="https://example.com/video.mp4" />
            </label>
          )}

          <label>
            Thumbnail
            <input name="thumbnail" className="uk-input file-input" type="file" accept="image/*" />
          </label>

          {status ? <p className="form-status">{status}</p> : null}

          <div className="form-actions">
            <button type="button" className="button soft-warning" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="button warning">
              <UploadCloud size={16} /> Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SubscriptionDrawer({ videos, onClose, navigate }) {
  return (
    <div className="drawer-backdrop">
      <aside className="gotube-drawer">
        <div className="drawer-head">
          <h3>Your Subscription</h3>
          <button type="button" className="clean-button" onClick={onClose} aria-label="Close feed">
            <X size={18} />
          </button>
        </div>
        <div className="video-list-small uk-child-width-1-1">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} variant="list" navigate={navigate} />
          ))}
        </div>
      </aside>
    </div>
  );
}

