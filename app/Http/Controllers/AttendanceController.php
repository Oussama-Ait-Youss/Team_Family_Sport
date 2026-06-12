<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttendanceRequest;
use App\Models\Attendance;
use App\Models\Session;
use Illuminate\Support\Facades\DB;

class AttendanceController extends Controller
{
    public function store(StoreAttendanceRequest $request, Session $session)
    {
        // Verify that the authenticated Coach is the one who created the session
        if ($session->coach_id !== $request->user()->id) {
            return response()->json(['message' => 'You are not authorized to take attendance for this session.'], 403);
        }

        $validated = $request->validated();

        DB::transaction(function () use ($session, $validated) {
            foreach ($validated['players'] as $player) {
                Attendance::updateOrCreate(
                    [
                        'session_id' => $session->id,
                        'user_id' => $player['user_id']
                    ],
                    [
                        'status' => $player['status']
                    ]
                );
            }
        });

        return response()->json([
            'message' => 'Attendance roll call saved successfully.',
        ]);
    }
}
