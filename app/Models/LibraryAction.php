<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LibraryAction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'video_id',
        'type',
        'touched_at',
    ];

    protected function casts(): array
    {
        return [
            'touched_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }
}

