export const categories = [
  {
    id: 1,
    slug: 'design',
    name: 'Design',
    description: 'UI, UX, visual systems and practical product craft.',
    accent: '#f98f1d',
    icon: 'PenTool',
    videosCount: 3,
  },
  {
    id: 2,
    slug: 'development',
    name: 'Development',
    description: 'Laravel, PHP, JavaScript and full-stack tutorials.',
    accent: '#377dff',
    icon: 'Code2',
    videosCount: 3,
  },
  {
    id: 3,
    slug: 'business',
    name: 'Business',
    description: 'Creator monetization, product launches and strategy.',
    accent: '#00a86b',
    icon: 'Briefcase',
    videosCount: 1,
  },
  {
    id: 4,
    slug: 'film-entertainment',
    name: 'Film & Entertainment',
    description: 'Creator shows, storytelling and culture.',
    accent: '#ff3b30',
    icon: 'Clapperboard',
    videosCount: 1,
  },
  {
    id: 5,
    slug: 'news-politics',
    name: 'News & Politics',
    description: 'Analysis, current events and public affairs.',
    accent: '#6f42c1',
    icon: 'Newspaper',
    videosCount: 0,
  },
];

export const channels = [
  {
    id: 1,
    slug: 'jonathan-madano',
    name: 'Jonathan Madano',
    avatar: '/assets/images/avatars/avatar-3.jpg',
    coverImage: '/assets/images/banner/img2.jpg',
    description: 'Sharp design tutorials with hands-on UI breakdowns.',
    subscribers: 1420000,
    subscribersLabel: '1.4M subscribers',
    verified: true,
    videosCount: 2,
    category: 'Design',
  },
  {
    id: 2,
    slug: 'stella-johnson',
    name: 'Stella Johnson',
    avatar: '/assets/images/avatars/avatar-2.jpg',
    coverImage: '/assets/images/banner/img3.jpg',
    description: 'Clean programming lessons for PHP and JavaScript builders.',
    subscribers: 2960000,
    subscribersLabel: '3M subscribers',
    verified: true,
    videosCount: 2,
    category: 'Development',
  },
  {
    id: 3,
    slug: 'alex-dolgove',
    name: 'Alex Dolgove',
    avatar: '/assets/images/avatars/avatar-5.jpg',
    coverImage: '/assets/images/banner/img2.jpg',
    description: 'Laravel packages, architecture and product engineering.',
    subscribers: 3280000,
    subscribersLabel: '3.3M subscribers',
    verified: true,
    videosCount: 2,
    category: 'Development',
  },
  {
    id: 4,
    slug: 'adrian-mohani',
    name: 'Adrian Mohani',
    avatar: '/assets/images/avatars/avatar-4.jpg',
    coverImage: '/assets/images/banner/img3.jpg',
    description: 'Creator business, uploads, launch process and workflow.',
    subscribers: 1960000,
    subscribersLabel: '2M subscribers',
    verified: true,
    videosCount: 2,
    category: 'Business',
  },
  {
    id: 5,
    slug: 'rosanna-pansino',
    name: 'Rosanna Pansino',
    avatar: '/assets/images/avatars/avatar-1.jpg',
    coverImage: '/assets/images/banner/img2.jpg',
    description: 'Entertainment videos and creator lifestyle shows.',
    subscribers: 42200000,
    subscribersLabel: '42.2M subscribers',
    verified: true,
    videosCount: 1,
    category: 'Film & Entertainment',
  },
];

const byChannel = Object.fromEntries(channels.map((channel) => [channel.slug, channel]));
const byCategory = Object.fromEntries(categories.map((category) => [category.slug, category]));

export const videos = [
  {
    id: 1,
    slug: 'how-to-create-a-basic-sticky-html-element-using-css',
    title: 'How to create a basic Sticky HTML element using CSS',
    description:
      'A practical front-end lesson from the original GoTube theme, now wired into a React page with Laravel-ready data.',
    thumbnail: '/assets/images/video-thumbal/2.png',
    sourceUrl: null,
    embedUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    duration: '23:00',
    views: 1400000,
    viewsLabel: '1.4M views',
    countLabel: '1.4M',
    likes: 21000,
    dislikes: 1200,
    commentsCount: 5210,
    age: '2 weeks ago',
    featured: true,
    isLive: false,
    category: byCategory.design,
    channel: byChannel['jonathan-madano'],
  },
  {
    id: 2,
    slug: 'learn-how-to-create-a-php-singleton-class',
    title: 'Learn how to create a PHP singleton class',
    description:
      'A concise PHP pattern lesson, rebuilt as a GoTube video item that can be liked, saved and searched.',
    thumbnail: '/assets/images/video-thumbal/1.png',
    sourceUrl: null,
    embedUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    duration: '40:00',
    views: 2700,
    viewsLabel: '2.7k views',
    countLabel: '2.7k',
    likes: 890,
    dislikes: 44,
    commentsCount: 432,
    age: '3 weeks ago',
    featured: true,
    isLive: false,
    category: byCategory.development,
    channel: byChannel['stella-johnson'],
  },
  {
    id: 3,
    slug: 'creating-a-laravel-package-and-initializing-folders',
    title: 'Creating a Laravel Package and Initializing Folders',
    description:
      'Learn how package structure works in Laravel, with the same GoTube look plus a slightly fresher content surface.',
    thumbnail: '/assets/images/video-thumbal/3.png',
    sourceUrl: null,
    embedUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    duration: '14:00',
    views: 2300000,
    viewsLabel: '2.3M views',
    countLabel: '2.3M',
    likes: 32100,
    dislikes: 1900,
    commentsCount: 3012,
    age: '2 weeks ago',
    featured: true,
    isLive: false,
    category: byCategory.development,
    channel: byChannel['alex-dolgove'],
  },
  {
    id: 4,
    slug: 'learn-how-to-upload-files-using-laravel-and-filepond',
    title: 'Learn how to upload files using Laravel and Filepond',
    description:
      'A backend upload workflow lesson. The converted app includes an upload modal and API endpoint for this flow.',
    thumbnail: '/assets/images/video-thumbal/4.png',
    sourceUrl: null,
    embedUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    duration: '23:00',
    views: 531000,
    viewsLabel: '531k views',
    countLabel: '531k',
    likes: 8700,
    dislikes: 410,
    commentsCount: 998,
    age: '2 weeks ago',
    featured: true,
    isLive: false,
    category: byCategory.development,
    channel: byChannel['adrian-mohani'],
  },
  {
    id: 5,
    slug: 'learn-how-to-design-and-prototype-in-adobe-xd-tutorial',
    title: 'Learn How-To Design and Prototype in Adobe XD Tutorial',
    description:
      'A design lesson for wireframes, prototypes, visual hierarchy and usable interaction states.',
    thumbnail: '/assets/images/video-thumbal/img-1.png',
    sourceUrl: null,
    embedUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    duration: '18:12',
    views: 531000,
    viewsLabel: '531k views',
    countLabel: '531k',
    likes: 15400,
    dislikes: 700,
    commentsCount: 1244,
    age: '5 days ago',
    featured: false,
    isLive: false,
    category: byCategory.design,
    channel: byChannel['jonathan-madano'],
  },
  {
    id: 6,
    slug: 'learn-how-to-prototype-faster-with-mockplus-in-2026',
    title: 'Learn how to Prototype Faster with Mockplus in 2026',
    description:
      'Prototype faster with clean flows and reusable interface patterns.',
    thumbnail: '/assets/images/video-thumbal/img-3.png',
    sourceUrl: null,
    embedUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    duration: '09:42',
    views: 938000,
    viewsLabel: '938k views',
    countLabel: '938k',
    likes: 18400,
    dislikes: 600,
    commentsCount: 862,
    age: '3 weeks ago',
    featured: false,
    isLive: true,
    category: byCategory.design,
    channel: byChannel['stella-johnson'],
  },
  {
    id: 7,
    slug: 'adobe-xd-design-tutorial-website-landing-page',
    title: 'Adobe XD Design Tutorial Website Landing Page',
    description:
      'Design and ship a clean website landing page with practical component thinking.',
    thumbnail: '/assets/images/video-thumbal/img-4.png',
    sourceUrl: null,
    embedUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    duration: '16:28',
    views: 531000,
    viewsLabel: '531k views',
    countLabel: '531k',
    likes: 9300,
    dislikes: 380,
    commentsCount: 511,
    age: '2 weeks ago',
    featured: false,
    isLive: false,
    category: byCategory.design,
    channel: byChannel['alex-dolgove'],
  },
  {
    id: 8,
    slug: 'learn-ui-ux-designing-latest-website-in-adobe-xd',
    title: 'Learn UI UX Designing Latest Website In Adobe XD',
    description:
      'A modern UI and UX walkthrough for creators improving their design eye.',
    thumbnail: '/assets/images/video-thumbal/img-5.png',
    sourceUrl: null,
    embedUrl: 'https://www.youtube.com/embed/pQN-pnXPaVg',
    duration: '21:33',
    views: 531000,
    viewsLabel: '531k views',
    countLabel: '531k',
    likes: 11200,
    dislikes: 530,
    commentsCount: 734,
    age: '1 month ago',
    featured: false,
    isLive: false,
    category: byCategory.business,
    channel: byChannel['adrian-mohani'],
  },
];

export const notifications = [
  {
    id: 1,
    actor: 'Stella Johnson',
    text: 'replied to your comment on Adobe XD Tutorial',
    avatar: '/assets/images/avatars/avatar-2.jpg',
    time: '7 hours ago',
  },
  {
    id: 2,
    actor: 'Adrian Mohani',
    text: 'liked your comment on Learn Prototype Faster',
    avatar: '/assets/images/avatars/avatar-4.jpg',
    time: '9 hours ago',
  },
  {
    id: 3,
    actor: 'Alex Dolgove',
    text: 'added a new review in Full Stack PHP Developer',
    avatar: '/assets/images/avatars/avatar-5.jpg',
    time: 'Yesterday',
  },
];

export function fallbackHome() {
  return {
    hero: videos[0],
    featured: videos.filter((video) => video.featured),
    updates: videos.slice(4),
    trending: [...videos].sort((a, b) => b.views - a.views),
    channels,
    categories,
  };
}

export function fallbackVideo(slug) {
  const video = videos.find((item) => item.slug === slug) || videos[0];

  return {
    video,
    comments: [
      {
        id: 1,
        author: 'Stella Johnson',
        avatar: '/assets/images/avatars/avatar-2.jpg',
        body: 'This converted React layout feels cleaner while keeping the old GoTube personality.',
        likes: 18,
        age: '2 hours ago',
      },
      {
        id: 2,
        author: 'Adrian Mohani',
        avatar: '/assets/images/avatars/avatar-4.jpg',
        body: 'Nice, the Laravel upload path and watch-later controls make this feel like an app now.',
        likes: 11,
        age: '6 hours ago',
      },
    ],
    related: videos.filter((item) => item.slug !== video.slug).slice(0, 7),
  };
}

export function fallbackFeed(type) {
  if (type === 'liked-videos') {
    return [...videos].sort((a, b) => b.likes - a.likes).slice(0, 6);
  }

  if (type === 'watch-later') {
    return videos.filter((video) => Number.parseInt(video.duration, 10) >= 14);
  }

  if (type === 'history') {
    return [...videos].reverse();
  }

  return videos;
}

export function fallbackProfile() {
  return {
    id: 1,
    name: 'Richard Ali',
    username: 'richard',
    email: 'admin@gotube.test',
    phone: '+1 555 623 568',
    bio: 'Creator, curator, and GoTube admin.',
    avatar: '/assets/images/avatars/avatar-1.jpg',
  };
}

