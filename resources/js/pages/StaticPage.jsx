import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';

const copy = {
  privacy: {
    icon: ShieldCheck,
    title: 'Privacy Policy',
    subtitle: 'A lightweight privacy page matching the original GoTube theme.',
    sections: [
      ['Data we collect', 'Account details, uploaded video metadata, watch history and saved actions are stored for core product behavior.'],
      ['How it is used', 'The app uses this data to personalize feeds, power search, and keep creator workflows organized.'],
      ['Your controls', 'Profile settings can be updated from the account page, and library actions can be removed with backend extensions.'],
    ],
  },
  terms: {
    icon: FileText,
    title: 'Terms - Conditions',
    subtitle: 'Usage terms for this converted React and Laravel demo.',
    sections: [
      ['Using GoTube', 'Do not upload content you do not have rights to share. Keep comments respectful and useful.'],
      ['Creator tools', 'Uploads, likes and watch-later actions are demo-ready and can be expanded for production rules.'],
      ['Availability', 'This project is delivered as a starter build and should be configured before production deployment.'],
    ],
  },
};

export default function StaticPage({ kind = 'privacy' }) {
  const page = copy[kind] || copy.privacy;
  const Icon = page.icon;

  return (
    <>
      <section className="page-hero static-hero">
        <span className="eyebrow">
          <Icon size={16} /> GoTube
        </span>
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
      </section>

      <article className="static-doc">
        {page.sections.map(([title, text]) => (
          <section key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </section>
        ))}
      </article>
    </>
  );
}

