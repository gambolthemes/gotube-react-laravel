<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_feed_returns_videos(): void
    {
        $this->seed();

        $this->getJson('/api/home')
            ->assertOk()
            ->assertJsonStructure([
                'hero',
                'featured',
                'updates',
                'trending',
                'channels',
                'categories',
            ]);
    }
}

