import React, { useEffect, useState } from 'react';
import { Briefcase, Clapperboard, Code2, Layers, Newspaper, PenTool } from 'lucide-react';
import { api } from '../api';
import SectionHeader from '../components/SectionHeader';
import { categories as fallbackCategories } from '../data/fallback';

const iconMap = {
  Briefcase,
  Clapperboard,
  Code2,
  Layers,
  Newspaper,
  PenTool,
};

export default function CategoriesPage({ navigate }) {
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    let mounted = true;
    api.categories().then((result) => {
      if (mounted) {
        setCategories(result.data);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <section className="page-hero categories-hero">
        <span className="eyebrow">
          <Layers size={16} /> Explore
        </span>
        <h1>Browse Categories</h1>
        <p>Old theme category page, upgraded with clearer tiles, counts, and API-backed taxonomy.</p>
      </section>

      <SectionHeader title="Categories" subtitle="Pick a lane and keep watching." />
      <div className="category-grid">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Layers;

          return (
            <button
              type="button"
              key={category.slug}
              className="category-tile"
              style={{ '--category-accent': category.accent }}
              onClick={(event) => navigate(`/?category=${category.slug}`, event)}
            >
              <span className="category-icon">
                <Icon size={24} />
              </span>
              <strong>{category.name}</strong>
              <p>{category.description}</p>
              <small>{category.videosCount ?? 0} videos</small>
            </button>
          );
        })}
      </div>
    </>
  );
}

