import React, { useEffect, useState } from 'react';
import { Bookmark, Eye, Heart, MessageCircle, Send, Share2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { api } from '../api';
import SectionHeader from '../components/SectionHeader';
import VideoCard from '../components/VideoCard';
import { fallbackVideo } from '../data/fallback';

export default function VideoDetailPage({ slug, navigate }) {
  const [payload, setPayload] = useState(() => fallbackVideo(slug));
  const [status, setStatus] = useState('');

  useEffect(() => {
    let mounted = true;
    api.video(slug).then((result) => {
      if (mounted) {
        setPayload(result);
      }
    });

    return () => {
      mounted = false;
    };
  }, [slug]);

  useEffect(() => {
    if (payload.video?.id && window.localStorage.getItem('gotube_token')) {
      api.history(payload.video.id).catch(() => {});
    }
  }, [payload.video?.id]);

  const video = payload.video;

  const saveAction = async (action) => {
    if (!window.localStorage.getItem('gotube_token')) {
      setStatus('Login first to save actions.');
      return;
    }

    try {
      if (action === 'like') {
        await api.like(video.id);
        setStatus('Liked. Nice pick.');
      } else {
        await api.watchLater(video.id);
        setStatus('Added to watch later.');
      }
    } catch {
      setStatus('Backend is offline here, but the endpoint is ready.');
    }
  };

  return (
    <div className="watch-layout">
      <article className="watch-main">
        <div className="player-frame">
          {video.embedUrl ? (
            <iframe src={video.embedUrl} title={video.title} allowFullScreen />
          ) : (
            <video src={video.sourceUrl} controls poster={video.thumbnail} />
          )}
        </div>

        <div className="video-info gotube-watch-panel">
          <div className="video-info-title">
            <h1>{video.title}</h1>
          </div>
          <div className="watch-meta">
            <span>
              <Eye size={16} /> {video.viewsLabel}
            </span>
            <span>{video.age}</span>
          </div>

          <div className="watch-actions">
            <button type="button" className="like-btn" onClick={() => saveAction('like')}>
              <ThumbsUp size={18} />
              <span>{Number(video.likes || 0).toLocaleString()}</span>
            </button>
            <button type="button" className="like-btn">
              <ThumbsDown size={18} />
              <span>{Number(video.dislikes || 0).toLocaleString()}</span>
            </button>
            <button type="button" className="like-btn" onClick={() => saveAction('watch')}>
              <Bookmark size={18} />
              <span>Save</span>
            </button>
            <button type="button" className="like-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
          {status ? <p className="form-status">{status}</p> : null}

          <div className="channel-row">
            <img src={video.channel?.avatar} alt="" />
            <div>
              <h3>{video.channel?.name}</h3>
              <p>{video.channel?.subscribersLabel}</p>
            </div>
            <button type="button" className="button warning circle" onClick={(event) => navigate(`/channels/${video.channel?.slug}`, event)}>
              View Channel
            </button>
          </div>

          <h3>Description</h3>
          <p>{video.description}</p>
        </div>

        <section className="comments">
          <h3>
            Comments <span className="comments-amount">{video.commentsCount || payload.comments.length}</span>
          </h3>
          <ul>
            {payload.comments.map((comment) => (
              <li key={comment.id}>
                <div className="avatar">
                  <img src={comment.avatar} alt="" />
                </div>
                <div className="comment-content">
                  <div className="comment-by">
                    {comment.author}
                    <span>{comment.age}</span>
                  </div>
                  <p>{comment.body}</p>
                  <button type="button" className="clean-button comment-like">
                    <Heart size={14} /> {comment.likes}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="comment-form">
            <h4>Your Comment</h4>
            <textarea className="uk-textarea" placeholder="Enter your comment here..." rows="5" />
            <button type="button" className="button warning">
              <Send size={16} /> Submit
            </button>
          </div>
        </section>
      </article>

      <aside className="watch-related">
        <SectionHeader title="Up Next" subtitle="Related videos" />
        <div className="video-list-small uk-child-width-1-1">
          {payload.related.map((item) => (
            <VideoCard key={item.slug} video={item} variant="list" navigate={navigate} />
          ))}
        </div>
      </aside>
    </div>
  );
}

