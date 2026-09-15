<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LibraryAction;
use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LibraryController extends Controller
{
    public function like(Request $request, Video $video): JsonResponse
    {
        $action = $this->record($request, $video, 'liked');

        if ($action->wasRecentlyCreated) {
            $video->increment('likes_count');
        }

        return response()->json([
            'message' => 'Video liked',
            'liked' => true,
            'likes' => $video->fresh()->likes_count,
        ]);
    }

    public function watchLater(Request $request, Video $video): JsonResponse
    {
        $this->record($request, $video, 'watch_later');

        return response()->json([
            'message' => 'Added to watch later',
            'saved' => true,
        ]);
    }

    public function history(Request $request, Video $video): JsonResponse
    {
        $this->record($request, $video, 'history');

        return response()->json([
            'message' => 'History updated',
            'saved' => true,
        ]);
    }

    private function record(Request $request, Video $video, string $type): LibraryAction
    {
        return LibraryAction::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'video_id' => $video->id,
                'type' => $type,
            ],
            [
                'touched_at' => now(),
            ]
        );
    }
}

