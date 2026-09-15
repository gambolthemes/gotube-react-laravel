import React, { useState } from 'react';
import { Lock, Mail, UserPlus, Video } from 'lucide-react';
import { api } from '../api';
import { fallbackProfile } from '../data/fallback';

export default function AuthPage({ mode, navigate, onAuth }) {
  const isRegister = mode === 'register';
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setStatus('');

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const result = isRegister ? await api.register(payload) : await api.login(payload);
      onAuth(result);
    } catch (error) {
      if (error.offline) {
        onAuth({ user: fallbackProfile(), token: 'offline-demo-token' });
        return;
      }

      const firstError = Object.values(error.payload?.errors || {})?.[0]?.[0];
      setStatus(firstError || 'Could not complete auth request.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-visual">
        <img src="/assets/images/logo-light.png" alt="GoTube" />
        <h1>{isRegister ? 'Create your GoTube studio' : 'Welcome back'}</h1>
        <p>React frontend with a Laravel 12 API behind the theme you shared.</p>
      </div>

      <div className="auth-card">
        <div className="my-4 uk-text-center">
          <h2 className="mb-0">{isRegister ? 'Create account' : 'Welcome back'}</h2>
          <p className="my-2">{isRegister ? 'Start managing your videos.' : 'Login to manage your account.'}</p>
        </div>

        <form onSubmit={submit}>
          {isRegister ? (
            <div className="uk-form-group">
              <label className="uk-form-label">Name</label>
              <div className="uk-position-relative w-100">
                <span className="uk-form-icon">
                  <UserPlus size={17} />
                </span>
                <input className="uk-input" name="name" type="text" placeholder="Richard Ali" required />
              </div>
            </div>
          ) : null}

          <div className="uk-form-group">
            <label className="uk-form-label">Email</label>
            <div className="uk-position-relative w-100">
              <span className="uk-form-icon">
                <Mail size={17} />
              </span>
              <input className="uk-input" name="email" type="email" placeholder="admin@gotube.test" required />
            </div>
          </div>

          <div className="uk-form-group">
            <label className="uk-form-label">Password</label>
            <div className="uk-position-relative w-100">
              <span className="uk-form-icon">
                <Lock size={17} />
              </span>
              <input className="uk-input" name="password" type="password" placeholder="password" required />
            </div>
          </div>

          {isRegister ? (
            <div className="uk-form-group">
              <label className="uk-form-label">Confirm password</label>
              <div className="uk-position-relative w-100">
                <span className="uk-form-icon">
                  <Lock size={17} />
                </span>
                <input className="uk-input" name="password_confirmation" type="password" placeholder="password" required />
              </div>
            </div>
          ) : null}

          {status ? <p className="form-status error">{status}</p> : null}

          <div className="mt-4 uk-flex-middle uk-grid-small auth-footer">
            <p>
              {isRegister ? 'Already have account?' : 'Dont have account?'}{' '}
              <a href={isRegister ? '/login' : '/register'} onClick={(event) => navigate(isRegister ? '/login' : '/register', event)}>
                {isRegister ? 'Login' : 'Sign up'}
              </a>
            </p>
            <button type="submit" className="button warning" disabled={busy}>
              <Video size={16} /> {busy ? 'Please wait' : isRegister ? 'Create' : 'Get Started'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

