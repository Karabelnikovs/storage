<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\History;
use Carbon\Carbon;


class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $history = new History();
        $history->user_id = Auth::id(); // Get the authenticated user's ID
        $history->action = 'Login';
        $formattedCreatedAt = Carbon::parse($history->created_at)->format('Y-m-d H:i:s');

        $history->description = '<span style="color:blue;">' . Auth::user()->name . '</span> Login '.$formattedCreatedAt;
        $history->save();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Create a history entry for logout
        $history = new History();
        $history->user_id = Auth::id(); // Get the authenticated user's ID
        $history->action = 'Logout';
        $formattedCreatedAt = Carbon::parse($history->created_at)->format('Y-m-d H:i:s');
        $history->description = '<span style="color:blue;">' . Auth::user()->name . '</span> logged out.'.$formattedCreatedAt;
        $history->save();
    
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    
        // Redirect the user after logout
        return redirect('/');
    }
}
