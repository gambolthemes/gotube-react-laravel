<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Channel;
use App\Models\Comment;
use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'admin@gotube.test'],
            [
                'name' => 'Richard Ali',
                'username' => 'richard',
                'password' => Hash::make('password'),
                'avatar' => '/assets/images/avatars/avatar-1.jpg',
                'bio' => 'Creator, curator, and GoTube admin.',
            ],
        );

        $categories = collect([
            ['name' => 'Design', 'accent' => '#f98f1d', 'icon' => 'PenTool', 'description' => 'UI, UX, visual systems and product craft.'],
            ['name' => 'Development', 'accent' => '#377dff', 'icon' => 'Code2', 'description' => 'Laravel, PHP, JavaScript and full-stack tutorials.'],
            ['name' => 'Business', 'accent' => '#00a86b', 'icon' => 'Briefcase', 'description' => 'Growth, product launches and creator monetization.'],
            ['name' => 'Film & Entertainment', 'accent' => '#ff3b30', 'icon' => 'Clapperboard', 'description' => 'Entertainment, storytelling, and creator shows.'],
            ['name' => 'News & Politics', 'accent' => '#6f42c1', 'icon' => 'Newspaper', 'description' => 'Analysis, current events and public affairs.'],
        ])->mapWithKeys(function (array $data) {
            $category = Category::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                $data + ['slug' => Str::slug($data['name'])]
            );

            return [$category->slug => $category];
        });

        $channels = collect([
            ['name' => 'Jonathan Madano', 'avatar' => '/assets/images/avatars/avatar-3.jpg', 'category' => 'design', 'subscribers' => 1420000],
            ['name' => 'Stella Johnson', 'avatar' => '/assets/images/avatars/avatar-2.jpg', 'category' => 'development', 'subscribers' => 2960000],
            ['name' => 'Alex Dolgove', 'avatar' => '/assets/images/avatars/avatar-5.jpg', 'category' => 'development', 'subscribers' => 3280000],
            ['name' => 'Adrian Mohani', 'avatar' => '/assets/images/avatars/avatar-4.jpg', 'category' => 'business', 'subscribers' => 1960000],
            ['name' => 'Rosanna Pansino', 'avatar' => '/assets/images/avatars/avatar-1.jpg', 'category' => 'film-entertainment', 'subscribers' => 42200000],
        ])->mapWithKeys(function (array $data) use ($categories) {
            $channel = Channel::updateOrCreate(
                ['slug' => Str::slug($data['name'])],
                [
                    'user_id' => $data['name'] === 'Jonathan Madano' ? null : null,
                    'category_id' => $categories[$data['category']]->id,
                    'name' => $data['name'],
                    'avatar' => $data['avatar'],
                    'cover_image' => '/assets/images/banner/img2.jpg',
                    'description' => $data['name'].' shares practical videos for creators who like sharp tutorials and zero fluff.',
                    'subscribers_count' => $data['subscribers'],
                    'verified' => true,
                ]
            );

            return [$channel->slug => $channel];
        });

        $videos = [
            ['How to create a basic Sticky HTML element using CSS', 'jonathan-madano', 'design', '/assets/images/video-thumbal/2.png', '23:00', 1400000, 21000, true],
            ['Learn how to create a PHP singleton class', 'stella-johnson', 'development', '/assets/images/video-thumbal/1.png', '40:00', 2700, 890, true],
            ['Creating a Laravel Package and Initializing Folders', 'alex-dolgove', 'development', '/assets/images/video-thumbal/3.png', '14:00', 2300000, 32100, true],
            ['Learn how to upload files using Laravel and Filepond', 'adrian-mohani', 'development', '/assets/images/video-thumbal/4.png', '23:00', 531000, 8700, true],
            ['Learn How-To Design and Prototype in Adobe XD Tutorial', 'jonathan-madano', 'design', '/assets/images/video-thumbal/img-1.png', '18:12', 531000, 15400, false],
            ['Learn how to Prototype Faster with Mockplus in 2026', 'stella-johnson', 'design', '/assets/images/video-thumbal/img-3.png', '09:42', 938000, 18400, false],
            ['Adobe XD Design Tutorial Website Landing Page', 'alex-dolgove', 'design', '/assets/images/video-thumbal/img-4.png', '16:28', 531000, 9300, false],
            ['Learn UI UX Designing Latest Website In Adobe XD', 'adrian-mohani', 'business', '/assets/images/video-thumbal/img-5.png', '21:33', 531000, 11200, false],
        ];

        foreach ($videos as $index => [$title, $channelSlug, $categorySlug, $thumb, $duration, $views, $likes, $featured]) {
            $video = Video::updateOrCreate(
                ['slug' => Str::slug($title)],
                [
                    'channel_id' => $channels[$channelSlug]->id,
                    'category_id' => $categories[$categorySlug]->id,
                    'title' => $title,
                    'description' => 'This GoTube lesson keeps the original theme content but connects it to a Laravel 12 API. Follow along, save it for later, and keep building with the React frontend.',
                    'thumbnail' => $thumb,
                    'source_url' => null,
                    'embed_url' => 'https://www.youtube.com/embed/pQN-pnXPaVg',
                    'duration' => $duration,
                    'views_count' => $views,
                    'likes_count' => $likes,
                    'dislikes_count' => max(1, (int) ($likes * 0.08)),
                    'comments_count' => 2,
                    'published_at' => now()->subDays(($index + 1) * 3),
                    'featured' => $featured,
                    'is_live' => $index === 5,
                    'status' => 'published',
                ]
            );

            Comment::updateOrCreate(
                ['video_id' => $video->id, 'author_name' => 'Stella Johnson'],
                [
                    'author_avatar' => '/assets/images/avatars/avatar-2.jpg',
                    'body' => 'This is much cleaner than the old static page. The React flow feels fast.',
                    'likes_count' => 18,
                ]
            );

            Comment::updateOrCreate(
                ['video_id' => $video->id, 'author_name' => 'Adrian Mohani'],
                [
                    'author_avatar' => '/assets/images/avatars/avatar-4.jpg',
                    'body' => 'Saved this one for the Laravel upload workflow.',
                    'likes_count' => 11,
                ]
            );
        }

        Channel::whereNull('user_id')->where('slug', 'jonathan-madano')->update(['user_id' => $user->id]);
    }
}

