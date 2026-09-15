import React from 'react';
import { SearchX } from 'lucide-react';

export default function EmptyState({ title = 'Nothing found', text = 'Try another search or category.' }) {
  return (
    <div className="gotube-empty">
      <SearchX size={34} />
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

