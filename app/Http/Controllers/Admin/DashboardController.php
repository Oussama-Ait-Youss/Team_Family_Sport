<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $activePlayersCount = User::where('role_id', 3)->where('status', 'active')->count();
        $activeCoachesCount = User::where('role_id', 2)->where('status', 'active')->count();

        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();

        $monthlyRevenue = Payment::whereBetween('payment_date', [$currentMonthStart, $currentMonthEnd])
            ->sum('amount');

        // Overdue players: Their latest payment has a next_due_date in the past
        $now = now()->toDateString();
        $overduePlayers = User::where('role_id', 3)
            ->whereHas('payments')
            ->with(['payments' => function ($query) {
                $query->latest('payment_date');
            }])
            ->get()
            ->filter(function ($user) use ($now) {
                $latestPayment = $user->payments->first();
                return $latestPayment && $latestPayment->next_due_date < $now;
            })
            ->values();

        return response()->json([
            'metrics' => [
                'total_active_players' => $activePlayersCount,
                'total_active_coaches' => $activeCoachesCount,
                'current_month_revenue' => (float) $monthlyRevenue,
            ],
            'overdue_players' => $overduePlayers->map(function ($player) {
                return [
                    'id' => $player->id,
                    'name' => $player->name,
                    'email' => $player->email,
                    'latest_payment_date' => $player->payments->first()->payment_date?->toDateString(),
                    'next_due_date' => $player->payments->first()->next_due_date?->toDateString(),
                ];
            }),
        ]);
    }
}
