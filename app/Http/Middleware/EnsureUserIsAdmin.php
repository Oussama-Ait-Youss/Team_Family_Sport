<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user() || $request->user()->role_id != 1) { // 1 is Admin
            return response()->json(['message' => 'Unauthorized. Admin access required.'], 403);
        }
        return $next($request);
    }
}
