<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'channel_id',
        'category_id',
        'title',
        'slug',
        'description',
        'thumbnail',
        'source_url',
        'embed_url',
        'duration',
        'views_count',
        'likes_count',
        'dislikes_count',
        'comments_count',
        'published_at',
        'featured',
        'is_live',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'featured' => 'boolean',
            'is_live' => 'boolean',
        ];
    }

    public function channel(): BelongsTo
    {
        return $this->belongsTo(Channel::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->latest();
    }
}

