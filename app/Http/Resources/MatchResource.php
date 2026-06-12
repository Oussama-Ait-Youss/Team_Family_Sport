<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MatchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'round_number' => $this->round_number,
            'fighter1' => $this->whenLoaded('fighter1', function () {
                return [
                    'id' => $this->fighter1->id,
                    'name' => $this->fighter1->name,
                ];
            }),
            'fighter2' => $this->whenLoaded('fighter2', function () {
                return [
                    'id' => $this->fighter2->id,
                    'name' => $this->fighter2->name,
                ];
            }),
            'winner' => $this->whenLoaded('winner', function () {
                return [
                    'id' => $this->winner->id,
                    'name' => $this->winner->name,
                ];
            }),
            'next_match_id' => $this->next_match_id,
        ];
    }
}
