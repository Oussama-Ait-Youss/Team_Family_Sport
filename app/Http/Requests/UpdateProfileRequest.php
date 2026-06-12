<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'height' => ['nullable', 'numeric'],
            'weight' => ['nullable', 'numeric'],
        ];

        // If the user is a Coach (assuming role_id 2 is Coach)
        if ($this->user() && $this->user()->role_id == 2) {
            $rules['dan'] = ['nullable', 'string', 'max:255'];
            $rules['diplomas'] = ['nullable', 'array'];
            $rules['diplomas.*'] = ['string'];
            $rules['experience_years'] = ['nullable', 'integer', 'min:0'];
        }

        return $rules;
    }
}
