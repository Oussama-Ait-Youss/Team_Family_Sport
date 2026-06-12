<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Nested route group protected by auth:sanctum AND the 'active' middleware
    Route::middleware('active')->group(function () {
        Route::get('/me', function (Request $request) {
            return response()->json($request->user());
        });
        
        // Profile Management routes
        Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'show']);
        Route::put('/profile', [\App\Http\Controllers\ProfileController::class, 'update']);
        
        // Future routes (dashboard, sessions, etc.) will go here
        
        // Phase 3: Pedagogical Engine & Roll Call
        Route::get('/groups', [\App\Http\Controllers\GroupController::class, 'index']);
        Route::post('/groups/{group}/players', [\App\Http\Controllers\GroupController::class, 'assignPlayer']);
        
        Route::get('/sessions', [\App\Http\Controllers\SessionController::class, 'index']);
        Route::post('/sessions', [\App\Http\Controllers\SessionController::class, 'store']);
        
        Route::post('/sessions/{session}/attendances', [\App\Http\Controllers\AttendanceController::class, 'store']);
    });
});
