<?php

namespace App\Http\Controllers;

use App\Http\Resources\GroupResource;
use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $query = Group::query()->with(['discipline'])->withCount('players');

        if ($request->has('discipline_id')) {
            $query->where('discipline_id', $request->discipline_id);
        }

        return GroupResource::collection($query->get());
    }

    public function assignPlayer(Request $request, Group $group)
    {
        $user = $request->user();
        
        // Ensure Coach (role_id=2) or Admin (if role_id=1 exists)
        if (!in_array($user->role_id, [1, 2])) {
            return response()->json(['message' => 'Unauthorized to assign players.'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // Attach without detaching
        $group->players()->syncWithoutDetaching([$request->user_id]);

        return response()->json([
            'message' => 'Player assigned to group successfully.',
            'group' => new GroupResource($group->load('players'))
        ]);
    }
}
