<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Channel;
use App\Models\Video;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class CatalogController extends Controller
{
    public function home(): JsonResponse
    {
        $featured = $this->baseVideoQuery()
            ->where('featured', true)
            ->limit(8)
            ->get();

        $updates = $this->baseVideoQuery()
            ->latest('published_at')
            ->limit(8)
            ->get();

        $trending = $this->baseVideoQuery()
            ->orderByDesc('views_count')
            ->limit(8)
            ->get();

        return response()->json([
            'hero' => $this->videoPayload($featured->first() ?: $updates->first()),
            'featured' => $this->videoCollection($featured),
            'updates' => $this->videoCollection($updates),
            'trending' => $this->videoCollection($trending),
            'channels' => Channel::withCount('videos')->orderByDesc('subscribers_count')->limit(8)->get()->map(fn (Channel $channel) => $this->channelPayload($channel))->values(),
            'categories' => Category::withCount('videos')->orderBy('name')->get()->map(fn (Category $category) => $this->categoryPayload($category))->values(),
        ]);
    }

    public function videos(Request $request): JsonResponse
    {
        $query = $this->baseVideoQuery();

        if ($search = $request->string('search')->trim()->value()) {
            $query->where(function (Builder $builder) use ($search): void {
                $builder
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('channel', fn (Builder $channel) => $channel->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('category', fn (Builder $category) => $category->where('name', 'like', "%{$search}%"));
            });
        }

        return response()->json([
            'data' => $this->videoCollection($query->paginate(20)->getCollection()),
        ]);
    }

    public function video(Video $video): JsonResponse
    {
        $video->load(['channel', 'category', 'comments.user']);

        $related = $this->baseVideoQuery()
            ->whereKeyNot($video->id)
            ->where(function (Builder $query) use ($video): void {
                $query
                    ->where('category_id', $video->category_id)
                    ->orWhere('channel_id', $video->channel_id);
            })
            ->limit(8)
            ->get();

        return response()->json([
            'video' => $this->videoPayload($video, withDescription: true),
            'comments' => $video->comments->map(fn ($comment) => [
                'id' => $comment->id,
                'author' => $comment->user?->name ?: $comment->author_name,
                'avatar' => $comment->user?->avatar ?: $comment->author_avatar,
                'body' => $comment->body,
                'likes' => $comment->likes_count,
                'age' => $comment->created_at?->diffForHumans(),
            ])->values(),
            'related' => $this->videoCollection($related),
        ]);
    }

    public function channels(): JsonResponse
    {
        $channels = Channel::with(['category'])->withCount('videos')->orderByDesc('subscribers_count')->get();

        return response()->json([
            'data' => $channels->map(fn (Channel $channel) => $this->channelPayload($channel))->values(),
        ]);
    }

    public function channel(Channel $channel): JsonResponse
    {
        $channel->load(['category'])->loadCount('videos');

        return response()->json([
            'channel' => $this->channelPayload($channel, detailed: true),
            'videos' => $this->videoCollection($this->baseVideoQuery()->where('channel_id', $channel->id)->get()),
        ]);
    }

    public function categories(): JsonResponse
    {
        return response()->json([
            'data' => Category::withCount('videos')->orderBy('name')->get()->map(fn (Category $category) => $this->categoryPayload($category))->values(),
        ]);
    }

    public function feed(string $type): JsonResponse
    {
        $query = $this->baseVideoQuery();

        match ($type) {
            'liked-videos' => $query->orderByDesc('likes_count'),
            'history' => $query->oldest('published_at'),
            'watch-later' => $query->where('duration', '>=', '14:00')->latest('published_at'),
            default => $query->latest('published_at'),
        };

        return response()->json([
            'data' => $this->videoCollection($query->limit(16)->get()),
        ]);
    }

    private function baseVideoQuery(): Builder
    {
        return Video::with(['channel', 'category'])
            ->where('status', 'published')
            ->latest('published_at');
    }

    private function videoCollection(Collection $videos): Collection
    {
        return $videos->map(fn (Video $video) => $this->videoPayload($video))->values();
    }

    private function videoPayload(?Video $video, bool $withDescription = false): ?array
    {
        if (! $video) {
            return null;
        }

        return [
            'id' => $video->id,
            'slug' => $video->slug,
            'title' => $video->title,
            'description' => $withDescription ? $video->description : str($video->description)->limit(150)->toString(),
            'thumbnail' => $this->publicUrl($video->thumbnail),
            'sourceUrl' => $video->source_url,
            'embedUrl' => $video->embed_url,
            'duration' => $video->duration,
            'views' => $video->views_count,
            'viewsLabel' => $this->compactNumber($video->views_count).' views',
            'countLabel' => $this->compactNumber($video->views_count),
            'likes' => $video->likes_count,
            'dislikes' => $video->dislikes_count,
            'commentsCount' => $video->comments_count,
            'publishedAt' => $video->published_at?->toDateString(),
            'age' => $video->published_at?->diffForHumans(),
            'featured' => (bool) $video->featured,
            'isLive' => (bool) $video->is_live,
            'category' => $video->category ? $this->categoryPayload($video->category) : null,
            'channel' => $video->channel ? $this->channelPayload($video->channel) : null,
        ];
    }

    private function channelPayload(Channel $channel, bool $detailed = false): array
    {
        return [
            'id' => $channel->id,
            'slug' => $channel->slug,
            'name' => $channel->name,
            'avatar' => $this->publicUrl($channel->avatar),
            'coverImage' => $this->publicUrl($channel->cover_image),
            'description' => $detailed ? $channel->description : str($channel->description)->limit(120)->toString(),
            'subscribers' => $channel->subscribers_count,
            'subscribersLabel' => $this->compactNumber($channel->subscribers_count).' subscribers',
            'verified' => (bool) $channel->verified,
            'videosCount' => $channel->videos_count ?? null,
            'category' => $channel->category?->name,
        ];
    }

    private function categoryPayload(Category $category): array
    {
        return [
            'id' => $category->id,
            'slug' => $category->slug,
            'name' => $category->name,
            'description' => $category->description,
            'accent' => $category->accent,
            'icon' => $category->icon,
            'videosCount' => $category->videos_count ?? null,
        ];
    }

    private function compactNumber(int $number): string
    {
        if ($number >= 1000000) {
            return rtrim(rtrim(number_format($number / 1000000, 1), '0'), '.').'M';
        }

        if ($number >= 1000) {
            return rtrim(rtrim(number_format($number / 1000, 1), '0'), '.').'k';
        }

        return (string) $number;
    }

    private function publicUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http') || str_starts_with($path, '/')) {
            return $path;
        }

        return asset($path);
    }
}

