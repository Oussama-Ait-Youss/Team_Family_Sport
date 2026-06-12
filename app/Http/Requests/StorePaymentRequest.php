<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Restrict to Admin (1) or Coach (2)
        return $this->user() && in_array($this->user()->role_id, [1, 2]);
    }

    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = User::find($value);
                    if ($user && $user->role_id != 3) { // 3 is Player
                        $fail('The selected user must be a Player.');
                    }
                },
            ],
            'amount' => ['required', 'numeric', 'min:0'],
            'payment_date' => ['required', 'date'],
        ];
    }
}
