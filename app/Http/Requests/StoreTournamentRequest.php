<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTournamentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Must be Admin (role_id == 1)
        return $this->user() && $this->user()->role_id == 1;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'date' => ['required', 'date', 'after:today'],
            'location' => ['required', 'string', 'max:255'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*.name' => ['required', 'string', 'max:255'],
            'categories.*.min_age' => ['required', 'integer', 'min:0'],
            'categories.*.max_age' => ['required', 'integer', 'gte:categories.*.min_age'],
            'categories.*.min_weight' => ['required', 'numeric', 'min:0'],
            'categories.*.max_weight' => ['required', 'numeric', 'gte:categories.*.min_weight'],
        ];
    }
}
