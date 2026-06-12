<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMatchRequest;
use App\Http\Resources\MatchResource;
use App\Models\TournamentMatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MatchController extends Controller
{
    public function updateResult(UpdateMatchRequest $request, TournamentMatch $tournamentMatch)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($tournamentMatch, $validated) {
            // Update the current match with the winner
            $tournamentMatch->update([
                'winner_id' => $validated['winner_id']
            ]);

            // Automatically advance winner to the next match if it exists
            if ($tournamentMatch->next_match_id) {
                $nextMatch = TournamentMatch::find($tournamentMatch->next_match_id);
                
                if ($nextMatch) {
                    // Assign the winner to the first available slot in the next match
                    if (is_null($nextMatch->fighter1_id)) {
                        $nextMatch->update(['fighter1_id' => $validated['winner_id']]);
                    } elseif (is_null($nextMatch->fighter2_id)) {
                        $nextMatch->update(['fighter2_id' => $validated['winner_id']]);
                    }
                }
            }
        });

        return response()->json([
            'message' => 'Match updated and winner advanced successfully.',
            'match' => new MatchResource($tournamentMatch->load(['fighter1', 'fighter2', 'winner']))
        ]);
    }
}
