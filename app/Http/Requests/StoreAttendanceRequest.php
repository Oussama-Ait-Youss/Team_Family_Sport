<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendanceRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Ensure the user is a Coach (role_id == 2)
        return $this->user() && $this->user()->role_id == 2;
    }

    public function rules(): array
    {
        return [
            'players' => ['required', 'array'],
            'players.*.user_id' => ['required', 'exists:users,id'],
            'players.*.status' => ['required', 'in:present,absent,excused'],
        ];
    }
}
