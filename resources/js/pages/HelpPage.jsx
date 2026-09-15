import React from 'react';
import { HelpCircle, MessageCircle, Search } from 'lucide-react';

const faqs = [
  ['How do I upload a video?', 'Use the upload button in the header. The React modal posts to the Laravel /api/videos endpoint.'],
  ['Can I keep the old design?', 'Yes. The original theme assets and class names are still used, with a modern CSS layer on top.'],
  ['Where is the backend data?', 'Videos, channels, categories and comments are seeded into SQLite through Laravel migrations.'],
  ['Can this become a real YouTube clone?', 'Yes. Add transcoding, queues, storage, notifications and moderation on top of this base.'],
];

export default function HelpPage() {
  return (
    <>
      <section className="page-hero help-hero">
        <span className="eyebrow">
          <HelpCircle size={16} /> Community
        </span>
        <h1>Help Community</h1>
        <p>Quick answers for running and extending this GoTube build.</p>
      </section>

      <div className="help-search">
        <Search size={20} />
        <input type="search" placeholder="Search help articles" />
      </div>

      <div className="faq-list">
        {faqs.map(([question, answer]) => (
          <details key={question} open={question === faqs[0][0]}>
            <summary>
              <MessageCircle size={18} /> {question}
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}

