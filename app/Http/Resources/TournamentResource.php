<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TournamentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'date' => $this->date?->toDateString(),
            'location' => $this->location,
            'status' => $this->status,
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
        ];
    }
}
