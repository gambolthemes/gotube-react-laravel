import React from 'react';

export default function SectionHeader({ title, subtitle, action, onAction }) {
  return (
    <div className="section-header gotube-section-header">
      <div className="section-header-left">
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {action ? (
        <div className="section-header-right">
          <button type="button" className="see-all ghost-button" onClick={onAction}>
            {action}
          </button>
        </div>
      ) : null}
    </div>
  );
}

