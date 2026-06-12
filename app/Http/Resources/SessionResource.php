<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SessionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'start_time' => $this->start_time->format('Y-m-d H:i:s'),
            'end_time' => $this->end_time->format('Y-m-d H:i:s'),
            'coach_name' => $this->coach ? $this->coach->name : null,
            'group_name' => $this->group ? $this->group->name : null,
            'attendances' => $this->whenLoaded('attendances'),
        ];
    }
}
