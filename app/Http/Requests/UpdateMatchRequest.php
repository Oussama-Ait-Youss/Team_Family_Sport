<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMatchRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Must be Admin (role_id == 1)
        return $this->user() && $this->user()->role_id == 1;
    }

    public function rules(): array
    {
        return [
            'winner_id' => ['required', 'exists:users,id'],
        ];
    }
}
