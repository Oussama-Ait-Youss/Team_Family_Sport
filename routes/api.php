<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
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
        
        // Phase 4: Financial Module
        Route::get('/payments', [\App\Http\Controllers\PaymentController::class, 'index']);
        Route::post('/payments', [\App\Http\Controllers\PaymentController::class, 'store']);
        
        // Phase 5: Competitive Module (Active Users)
        Route::get('/tournaments', [\App\Http\Controllers\TournamentController::class, 'index']);
        
        // Admin Routes
        Route::middleware('admin')->group(function () {
            Route::get('/admin/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index']);
            
            // Phase 5: Competitive Module (Admin Only)
            Route::post('/tournaments', [\App\Http\Controllers\TournamentController::class, 'store']);
            Route::patch('/matches/{tournament_match}/winner', [\App\Http\Controllers\MatchController::class, 'updateResult']);
        });
    });
});
