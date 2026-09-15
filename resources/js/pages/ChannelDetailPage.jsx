import React, { useEffect, useState } from 'react';
import { BellPlus, CheckCircle2, PlaySquare, UsersRound } from 'lucide-react';
import { api } from '../api';
import SectionHeader from '../components/SectionHeader';
import VideoCard from '../components/VideoCard';
import { channels, videos } from '../data/fallback';

export default function ChannelDetailPage({ slug, navigate }) {
  const [payload, setPayload] = useState(() => {
    const channel = channels.find((item) => item.slug === slug) || channels[0];
    return {
      channel,
      videos: videos.filter((video) => video.channel.slug === channel.slug),
    };
  });

  useEffect(() => {
    let mounted = true;
    api.channel(slug).then((result) => {
      if (mounted) {
        setPayload(result);
      }
    });

    return () => {
      mounted = false;
    };
  }, [slug]);

  const { channel } = payload;

  return (
    <>
      <section className="channel-detail-cover" style={{ backgroundImage: `url(${channel.coverImage || '/assets/images/banner/img2.jpg'})` }}>
        <div className="channel-detail-inner">
          <img src={channel.avatar} alt={channel.name} />
          <div>
            <h1>
              {channel.name}
              {channel.verified ? <CheckCircle2 size={22} /> : null}
            </h1>
            <p>{channel.description}</p>
            <div className="channel-stats">
              <span>
                <UsersRound size={16} /> {channel.subscribersLabel}
              </span>
              <span>
                <PlaySquare size={16} /> {payload.videos.length} videos
              </span>
            </div>
          </div>
          <button type="button" className="button warning circle">
            <BellPlus size={16} /> Subscribe
          </button>
        </div>
      </section>

      <SectionHeader title="Latest Videos" subtitle={`Fresh uploads from ${channel.name}.`} />
      <div className="gotube-grid">
        {payload.videos.map((video) => (
          <VideoCard key={video.slug} video={video} navigate={navigate} />
        ))}
      </div>
    </>
  );
}

