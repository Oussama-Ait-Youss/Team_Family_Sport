<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoachDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'dan',
        'diplomas',
        'experience_years',
    ];

    protected $casts = [
        'diplomas' => 'array',
        'experience_years' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
