<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TournamentMatch extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     * We use "matches" table but the model is named TournamentMatch
     * because "Match" is a reserved keyword in PHP 8.
     *
     * @var string
     */
    protected $table = 'matches';

    protected $fillable = [
        'category_id',
        'fighter1_id',
        'fighter2_id',
        'winner_id',
        'round_number',
        'next_match_id',
    ];

    protected $casts = [
        'round_number' => 'integer',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(TournamentCategory::class, 'category_id');
    }

    public function fighter1(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fighter1_id');
    }

    public function fighter2(): BelongsTo
    {
        return $this->belongsTo(User::class, 'fighter2_id');
    }

    public function winner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'winner_id');
    }

    public function nextMatch(): BelongsTo
    {
        return $this->belongsTo(TournamentMatch::class, 'next_match_id');
    }
}
