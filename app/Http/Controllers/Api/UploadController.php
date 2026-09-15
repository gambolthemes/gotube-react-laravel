<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Channel;
use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:4000'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'source_url' => ['nullable', 'url', 'max:500'],
            'video' => ['nullable', 'file', 'mimetypes:video/mp4,video/webm,video/quicktime', 'max:1024000'],
            'thumbnail' => ['nullable', 'image', 'max:5120'],
        ]);

        $user = $request->user();
        $channel = Channel::firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => "{$user->name}'s Channel",
                'slug' => Str::slug($user->name.' channel').'-'.$user->id,
                'avatar' => $user->avatar ?: '/assets/images/avatars/avatar-1.jpg',
                'cover_image' => '/assets/images/banner/img2.jpg',
                'description' => 'Fresh uploads from '.$user->name,
                'subscribers_count' => 0,
                'verified' => false,
                'category_id' => Category::query()->value('id'),
            ],
        );

        $thumbnail = '/assets/images/video-thumbal/1.png';
        if ($request->hasFile('thumbnail')) {
            $thumbnail = '/storage/'.$request->file('thumbnail')->store('thumbnails', 'public');
        }

        $source = $data['source_url'] ?? null;
        if ($request->hasFile('video')) {
            $source = Storage::url($request->file('video')->store('videos', 'public'));
        }

        $video = Video::create([
            'channel_id' => $channel->id,
            'category_id' => $data['category_id'] ?? Category::query()->value('id'),
            'title' => $data['title'],
            'slug' => Str::slug($data['title']).'-'.Str::lower(Str::random(6)),
            'description' => $data['description'] ?? 'A new GoTube upload.',
            'thumbnail' => $thumbnail,
            'source_url' => $source,
            'embed_url' => $source,
            'duration' => '00:00',
            'views_count' => 0,
            'likes_count' => 0,
            'dislikes_count' => 0,
            'comments_count' => 0,
            'published_at' => now(),
            'featured' => false,
            'is_live' => false,
            'status' => 'published',
        ]);

        return response()->json([
            'message' => 'Video uploaded',
            'video' => [
                'id' => $video->id,
                'slug' => $video->slug,
                'title' => $video->title,
            ],
        ], 201);
    }
}

