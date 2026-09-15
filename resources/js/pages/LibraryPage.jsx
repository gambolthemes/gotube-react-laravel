import React, { useEffect, useState } from 'react';
import { Clock, Grid2X2, ListVideo } from 'lucide-react';
import { api } from '../api';
import EmptyState from '../components/EmptyState';
import SectionHeader from '../components/SectionHeader';
import VideoCard from '../components/VideoCard';
import { fallbackFeed } from '../data/fallback';

export default function LibraryPage({ type, title, subtitle, navigate, search }) {
  const [videos, setVideos] = useState(() => fallbackFeed(type));
  const [view, setView] = useState('grid');

  useEffect(() => {
    let mounted = true;
    api.feed(type).then((result) => {
      if (mounted) {
        setVideos(result.data);
      }
    });

    return () => {
      mounted = false;
    };
  }, [type]);

  const filtered = videos.filter((video) => {
    if (!search.trim()) {
      return true;
    }

    const haystack = `${video.title} ${video.channel?.name} ${video.category?.name}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  return (
    <>
      <section className="page-hero compact-hero">
        <span className="eyebrow">
          <Clock size={16} /> Library
        </span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>

      <SectionHeader
        title={`${filtered.length} Videos`}
        subtitle="Browse, save, and continue watching."
        action={view === 'grid' ? 'List view' : 'Grid view'}
        onAction={() => setView(view === 'grid' ? 'list' : 'grid')}
      />
      <div className="view-toggle" aria-label="View mode">
        <button type="button" className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="Grid view">
          <Grid2X2 size={17} />
        </button>
        <button type="button" className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="List view">
          <ListVideo size={17} />
        </button>
      </div>

      {filtered.length ? (
        <div className={view === 'grid' ? 'gotube-grid' : 'library-list'}>
          {filtered.map((video) => (
            <VideoCard key={video.slug} video={video} variant={view === 'grid' ? 'grid' : 'list'} navigate={navigate} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}

