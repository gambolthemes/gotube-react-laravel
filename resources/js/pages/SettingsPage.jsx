import React, { useEffect, useState } from 'react';
import { Bell, ShieldCheck, UserCog } from 'lucide-react';
import { api } from '../api';
import { fallbackProfile } from '../data/fallback';

export default function SettingsPage({ user, setUser }) {
  const [profile, setProfile] = useState(user || fallbackProfile);
  const [status, setStatus] = useState('');

  useEffect(() => {
    let mounted = true;
    api.profile().then((result) => {
      if (mounted) {
        setProfile(result.user);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const update = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus('');

    try {
      const result = await api.updateProfile(profile);
      window.localStorage.setItem('gotube_user', JSON.stringify(result.user));
      setUser(result.user);
      setStatus('Profile saved.');
    } catch {
      window.localStorage.setItem('gotube_user', JSON.stringify(profile));
      setUser(profile);
      setStatus('Saved locally. Connect backend to persist it in Laravel.');
    }
  };

  return (
    <>
      <section className="settings-hero">
        <span className="eyebrow">
          <UserCog size={16} /> Account
        </span>
        <h1>Account Setting</h1>
      </section>

      <div className="settings-layout">
        <nav className="responsive-tab style-3 setting-menu settings-nav">
          <h4 className="mb-0 p-3">Setting Navigation</h4>
          <ul>
            <li className="uk-active">
              <a href="#general">
                <UserCog size={16} /> General
              </a>
            </li>
            <li>
              <a href="#security">
                <ShieldCheck size={16} /> Security
              </a>
            </li>
            <li>
              <a href="#notifications">
                <Bell size={16} /> Notifications
              </a>
            </li>
          </ul>
        </nav>

        <form className="settings-form" onSubmit={submit}>
          <div className="uk-card-default rounded settings-card" id="general">
            <h3>General Information</h3>
            <div className="form-grid">
              <label>
                Name
                <input className="uk-input" value={profile.name || ''} onChange={(event) => update('name', event.target.value)} />
              </label>
              <label>
                Username
                <input className="uk-input" value={profile.username || ''} onChange={(event) => update('username', event.target.value)} />
              </label>
              <label>
                Email address
                <input className="uk-input" value={profile.email || ''} disabled />
              </label>
              <label>
                Phone
                <input className="uk-input" value={profile.phone || ''} onChange={(event) => update('phone', event.target.value)} />
              </label>
              <label className="wide">
                Bio
                <textarea className="uk-textarea" rows="4" value={profile.bio || ''} onChange={(event) => update('bio', event.target.value)} />
              </label>
            </div>
          </div>

          <div className="uk-card-default rounded settings-card" id="security">
            <h3>Studio Preferences</h3>
            <div className="switch-list">
              <label>
                <input type="checkbox" defaultChecked /> Email me when uploads finish processing
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Keep watch history enabled
              </label>
              <label>
                <input type="checkbox" /> Make new uploads private by default
              </label>
            </div>
          </div>

          {status ? <p className="form-status">{status}</p> : null}

          <div className="uk-flex uk-flex-right p-4 settings-actions">
            <button type="button" className="button soft-warning mr-2">
              Cancel
            </button>
            <button type="submit" className="button warning">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

