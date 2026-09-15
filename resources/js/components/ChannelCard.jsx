import React from 'react';
import { BellPlus, CheckCircle2 } from 'lucide-react';

export default function ChannelCard({ channel, navigate }) {
  if (!channel) {
    return null;
  }

  const href = `/channels/${channel.slug}`;

  return (
    <a href={href} className="single-channal gotube-channel-card" onClick={(event) => navigate(href, event)}>
      <div className="channel-cover" style={{ backgroundImage: `url(${channel.coverImage || '/assets/images/banner/img2.jpg'})` }} />
      <div className="single-channal-creator">
        <img src={channel.avatar} alt={channel.name} loading="lazy" />
      </div>
      <div className="single-channal-body">
        <h4>
          {channel.name}
          {channel.verified ? <CheckCircle2 size={14} /> : null}
        </h4>
        <p>{channel.subscribersLabel}</p>
        <span className="button warning small circle channel-subscribe">
          <BellPlus size={14} /> Subscribe
        </span>
      </div>
    </a>
  );
}

