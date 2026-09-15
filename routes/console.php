<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('gotube:hello', function () {
    $this->comment('GoTube is ready.');
})->purpose('Show GoTube readiness');

