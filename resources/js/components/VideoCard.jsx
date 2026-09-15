import React from 'react';
import { Clock, Eye, Heart, MoreVertical, Play } from 'lucide-react';

export default function VideoCard({ video, variant = 'grid', navigate }) {
  if (!video) {
    return null;
  }

  const href = `/videos/${video.slug}`;
  const className =
    variant === 'list'
      ? 'video-post video-post-list gotube-list-card'
      : 'video-post gotube-video-card';

  return (
    <a href={href} className={className} onClick={(event) => navigate(href, event)}>
      <div className="video-post-thumbnail">
        <span className="video-post-count">{video.countLabel}</span>
        <span className="video-post-time">{video.duration}</span>
        <span className="play-btn-trigger">
          <Play size={18} fill="currentColor" />
        </span>
        <span className="btn-option" aria-hidden="true">
          <MoreVertical size={18} />
        </span>
        {video.isLive ? <span className="live-pill">Live</span> : null}
        <img src={video.thumbnail} alt={video.title} loading="lazy" />
      </div>
      <div className="video-post-content">
        <h3>{video.title}</h3>
        {video.channel ? <img src={video.channel.avatar} alt="" loading="lazy" /> : null}
        <span className="video-post-user">
          {video.channel?.name}
          {video.channel?.verified ? <span className="verified-dot" aria-label="verified" /> : null}
        </span>
        <span className="video-post-views">
          <Eye size={13} /> {video.viewsLabel}
        </span>
        <span className="video-post-date">
          <Clock size={13} /> {video.age}
        </span>
        <span className="video-card-like">
          <Heart size={13} /> {Number(video.likes || 0).toLocaleString()}
        </span>
      </div>
    </a>
  );
}

