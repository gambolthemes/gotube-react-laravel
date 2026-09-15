import React, { useEffect, useMemo, useState } from 'react';
import { Radio, UsersRound } from 'lucide-react';
import { api } from '../api';
import ChannelCard from '../components/ChannelCard';
import EmptyState from '../components/EmptyState';
import SectionHeader from '../components/SectionHeader';
import { channels as fallbackChannels } from '../data/fallback';

export default function ChannelsPage({ navigate, search }) {
  const [channels, setChannels] = useState(fallbackChannels);

  useEffect(() => {
    let mounted = true;
    api.channels().then((result) => {
      if (mounted) {
        setChannels(result.data);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) {
      return channels;
    }

    const term = search.toLowerCase();
    return channels.filter((channel) => `${channel.name} ${channel.category}`.toLowerCase().includes(term));
  }, [channels, search]);

  const grouped = filtered.reduce((group, channel) => {
    const key = channel.category || 'Creators';
    group[key] = [...(group[key] || []), channel];
    return group;
  }, {});

  return (
    <>
      <section className="page-hero channel-hero">
        <span className="eyebrow">
          <UsersRound size={16} /> Creator Network
        </span>
        <h1>Browse Channels</h1>
        <p>Same subscription-first GoTube page, now grouped and powered by the Laravel channel API.</p>
      </section>

      <SectionHeader title="Creator on the top" subtitle="Highest performing channels in this build." />
      {filtered.length ? (
        <div className="channel-grid">
          {filtered.slice(0, 5).map((channel) => (
            <ChannelCard key={channel.slug} channel={channel} navigate={navigate} />
          ))}
        </div>
      ) : (
        <EmptyState title="No channels found" />
      )}

      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="creator-band">
          <SectionHeader title={category} subtitle="Channels matched to this category." />
          <div className="channel-grid">
            {items.map((channel) => (
              <ChannelCard key={channel.slug} channel={channel} navigate={navigate} />
            ))}
          </div>
        </section>
      ))}

      <div className="creator-note">
        <Radio size={20} />
        <div>
          <strong>Subscription drawer is live</strong>
          <span>Use the top bookmark icon to open a compact feed like the original offcanvas.</span>
        </div>
      </div>
    </>
  );
}

