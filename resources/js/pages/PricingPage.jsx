import React from 'react';
import { Bolt, CheckCircle2, Shield, UploadCloud } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    text: 'For viewers and small creator experiments.',
    features: ['Unlimited watch history', 'Basic uploads', 'Community comments'],
  },
  {
    name: 'Creator Pro',
    price: '$12',
    text: 'For creators who publish often.',
    featured: true,
    features: ['Priority uploads', 'Channel analytics', 'Monetization tools'],
  },
  {
    name: 'Studio',
    price: '$29',
    text: 'For teams managing multiple channels.',
    features: ['Team roles', 'Advanced moderation', 'Exportable reports'],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="page-hero pricing-hero">
        <span className="eyebrow">
          <Bolt size={16} /> Go PRO
        </span>
        <h1>Upgrade To Premium</h1>
        <p>Pricing page from the theme, tightened for real creator workflows.</p>
      </section>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div key={plan.name} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
            <div className="plan-icon">{plan.featured ? <Bolt size={22} /> : <Shield size={22} />}</div>
            <h3>{plan.name}</h3>
            <p>{plan.text}</p>
            <strong>
              {plan.price}
              <span>/mo</span>
            </strong>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckCircle2 size={16} /> {feature}
                </li>
              ))}
            </ul>
            <button type="button" className={plan.featured ? 'button warning' : 'button soft-warning'}>
              <UploadCloud size={16} /> Choose Plan
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

