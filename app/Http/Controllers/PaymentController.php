<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with('user');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        return PaymentResource::collection($query->get());
    }

    public function store(StorePaymentRequest $request)
    {
        $validated = $request->validated();
        
        $paymentDate = Carbon::parse($validated['payment_date']);
        $nextDueDate = $paymentDate->copy()->addDays(30);

        $payment = Payment::create([
            'user_id' => $validated['user_id'],
            'amount' => $validated['amount'],
            'payment_date' => $paymentDate,
            'next_due_date' => $nextDueDate,
            'status' => 'paid',
        ]);

        return response()->json([
            'message' => 'Payment recorded successfully.',
            'payment' => new PaymentResource($payment->load('user'))
        ], 201);
    }
}
