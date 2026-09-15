import React, { useEffect, useMemo, useState } from 'react';
import { Flame, PlayCircle, Radio, Sparkles } from 'lucide-react';
import { api } from '../api';
import ChannelCard from '../components/ChannelCard';
import EmptyState from '../components/EmptyState';
import SectionHeader from '../components/SectionHeader';
import VideoCard from '../components/VideoCard';
import { fallbackHome } from '../data/fallback';

export default function HomePage({ navigate, search }) {
  const [data, setData] = useState(fallbackHome);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.home().then((result) => {
      if (mounted) {
        setData(result);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const filteredVideos = useMemo(() => {
    const unique = new Map();
    [...data.featured, ...data.updates, ...data.trending].forEach((video) => unique.set(video.slug, video));

    if (!search.trim()) {
      return [...unique.values()];
    }

    const term = search.toLowerCase();
    return [...unique.values()].filter((video) => {
      const haystack = `${video.title} ${video.channel?.name} ${video.category?.name}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [data, search]);

  const featured = search.trim() ? filteredVideos.slice(0, 8) : data.featured;
  const updates = search.trim() ? filteredVideos.slice(0, 6) : data.updates;
  const hero = filteredVideos[0] || data.hero;

  return (
    <>
      <section className="spotlight-hero" style={{ backgroundImage: "url('/assets/images/banner/img2.jpg')" }}>
        <div className="spotlight-copy">
          <span className="eyebrow">
            <Sparkles size={16} /> GoTube React Edition
          </span>
          <h1>{hero?.title || 'Enjoy Watching'}</h1>
          <p>
            Same GoTube structure, cleaner React interactions, Laravel-backed content, and a warmer visual finish.
          </p>
          <div className="hero-actions">
            <button type="button" className="button warning" onClick={(event) => navigate(`/videos/${hero.slug}`, event)}>
              <PlayCircle size={18} /> Watch now
            </button>
            <button type="button" className="button soft-white" onClick={(event) => navigate('/channels', event)}>
              <Radio size={18} /> Explore channels
            </button>
          </div>
        </div>
        <div className="hero-video-stack">
          {data.trending.slice(0, 3).map((video) => (
            <button
              type="button"
              className="hero-mini-video"
              key={video.slug}
              onClick={(event) => navigate(`/videos/${video.slug}`, event)}
            >
              <img src={video.thumbnail} alt="" />
              <span>{video.duration}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="quick-metrics">
        <Metric icon={Flame} label="Trending views" value="4.8M" />
        <Metric icon={Radio} label="Live channels" value="12" />
        <Metric icon={Sparkles} label="Fresh uploads" value={loading ? '...' : String(data.updates.length)} />
      </div>

      <SectionHeader title={search ? `Search results for "${search}"` : 'Featured Videos'} subtitle="Channels you are following." />
      {featured.length ? (
        <div className="gotube-grid">
          {featured.map((video) => (
            <VideoCard key={video.slug} video={video} navigate={navigate} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      <SectionHeader title="Updates from Subscriptions" subtitle="Fresh lessons from creators you follow." action="See all" onAction={(event) => navigate('/watch-later', event)} />
      <div className="gotube-grid compact">
        {updates.slice(0, 4).map((video) => (
          <VideoCard key={video.slug} video={video} navigate={navigate} />
        ))}
      </div>

      <SectionHeader title="Find Channels" subtitle="Creators your friends are watching." action="See all" onAction={(event) => navigate('/channels', event)} />
      <div className="channel-grid">
        {data.channels.slice(0, 5).map((channel) => (
          <ChannelCard key={channel.slug} channel={channel} navigate={navigate} />
        ))}
      </div>
    </>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="metric-card">
      <Icon size={20} />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

