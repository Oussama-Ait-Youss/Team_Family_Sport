<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->whenLoaded('role'),
            'discipline' => $this->whenLoaded('discipline'),
            'height' => $this->height,
            'weight' => $this->weight,
            'birth_date' => $this->birth_date?->toDateString(),
            'age' => $this->age, // From custom accessor

            // Conditionally load details based on what relationship is loaded
            'coach_detail' => $this->whenLoaded('coachDetail', function () {
                return [
                    'dan' => $this->coachDetail->dan ?? null,
                    'diplomas' => $this->coachDetail->diplomas ?? [],
                    'experience_years' => $this->coachDetail->experience_years ?? null,
                ];
            }),
            
            'player_detail' => $this->whenLoaded('playerDetail', function () {
                return [
                    'join_date' => $this->playerDetail->join_date?->toDateString(),
                    'current_grade_id' => $this->playerDetail->current_grade_id ?? null,
                ];
            }),
        ];
    }
}
