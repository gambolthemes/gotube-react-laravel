<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CatalogController;
use App\Http\Controllers\Api\LibraryController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::get('/home', [CatalogController::class, 'home']);
Route::get('/videos', [CatalogController::class, 'videos']);
Route::get('/videos/{video:slug}', [CatalogController::class, 'video']);
Route::get('/channels', [CatalogController::class, 'channels']);
Route::get('/channels/{channel:slug}', [CatalogController::class, 'channel']);
Route::get('/categories', [CatalogController::class, 'categories']);
Route::get('/feed/{type}', [CatalogController::class, 'feed']);

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::put('/profile', [AuthController::class, 'updateProfile']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/videos', [UploadController::class, 'store']);
    Route::post('/videos/{video}/like', [LibraryController::class, 'like']);
    Route::post('/videos/{video}/watch-later', [LibraryController::class, 'watchLater']);
    Route::post('/videos/{video}/history', [LibraryController::class, 'history']);
});

