<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Display the authenticated user's profile.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        
        // Eager load role and discipline
        $user->load(['role', 'discipline']);

        // Eager load specific details based on role (Assuming 2 is Coach)
        if ($user->role_id == 2) {
            $user->load('coachDetail');
        } else {
            $user->load('playerDetail');
        }

        return new ProfileResource($user);
    }

    /**
     * Update the authenticated user's profile.
     */
    public function update(UpdateProfileRequest $request)
    {
        $user = $request->user();
        $validated = $request->validated();

        // 1. Update global fields
        $user->update([
            'height' => $validated['height'] ?? $user->height,
            'weight' => $validated['weight'] ?? $user->weight,
        ]);

        // 2. If Coach, update coach_details
        if ($user->role_id == 2) {
            $coachData = [];
            if ($request->has('dan')) {
                $coachData['dan'] = $validated['dan'];
            }
            if ($request->has('diplomas')) {
                $coachData['diplomas'] = $validated['diplomas'];
            }
            if ($request->has('experience_years')) {
                $coachData['experience_years'] = $validated['experience_years'];
            }

            if (!empty($coachData)) {
                $user->coachDetail()->updateOrCreate(
                    ['user_id' => $user->id],
                    $coachData
                );
            }
            
            $user->load(['role', 'discipline', 'coachDetail']);
        } else {
            $user->load(['role', 'discipline', 'playerDetail']);
        }

        return response()->json([
            'message' => 'Profile updated successfully.',
            'profile' => new ProfileResource($user),
        ]);
    }
}
