<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSessionRequest;
use App\Http\Resources\SessionResource;
use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    public function index()
    {
        $sessions = Session::with(['coach', 'group'])
            ->where('start_time', '>=', now())
            ->orderBy('start_time', 'asc')
            ->get();

        return SessionResource::collection($sessions);
    }

    public function store(StoreSessionRequest $request)
    {
        $validated = $request->validated();

        $session = Session::create([
            'group_id' => $validated['group_id'],
            'coach_id' => $request->user()->id, // Force coach to authenticated user
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
        ]);

        return response()->json([
            'message' => 'Session created successfully.',
            'session' => new SessionResource($session->load(['coach', 'group']))
        ], 201);
    }
}
