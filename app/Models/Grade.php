<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'discipline_id',
        'name',
        'color',
    ];

    public function discipline(): BelongsTo
    {
        return $this->belongsTo(Discipline::class);
    }

    public function players(): HasMany
    {
        return $this->hasMany(PlayerDetail::class, 'current_grade_id');
    }

    public function promotions(): HasMany
    {
        return $this->hasMany(Promotion::class);
    }
}
