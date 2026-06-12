<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tournament extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'date',
        'location',
        'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function categories(): HasMany
    {
        return $this->hasMany(TournamentCategory::class);
    }
}
