<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTournamentRequest;
use App\Http\Resources\TournamentResource;
use App\Models\Tournament;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TournamentController extends Controller
{
    public function index()
    {
        $tournaments = Tournament::with('categories')->orderBy('date', 'asc')->get();
        return TournamentResource::collection($tournaments);
    }

    public function store(StoreTournamentRequest $request)
    {
        $validated = $request->validated();

        $tournament = DB::transaction(function () use ($validated) {
            $t = Tournament::create([
                'name' => $validated['name'],
                'date' => $validated['date'],
                'location' => $validated['location'],
                'status' => 'upcoming',
            ]);

            foreach ($validated['categories'] as $categoryData) {
                $t->categories()->create($categoryData);
            }

            return $t;
        });

        return response()->json([
            'message' => 'Tournament created successfully.',
            'tournament' => new TournamentResource($tournament->load('categories')),
        ], 201);
    }
}
