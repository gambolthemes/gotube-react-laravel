<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('library_actions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('video_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->timestamp('touched_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'video_id', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('library_actions');
    }
};

