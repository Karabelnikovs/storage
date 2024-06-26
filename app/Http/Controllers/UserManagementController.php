<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Orders;
use App\Models\Order_Item;

class UserManagementController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Index', [
            'users' => User::paginate(4)
        ]);
    }

    /**
     * Show the form for creating a new user.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Create');
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  Request  $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => ['required', Rule::in(['admin', 'worker', 'sorter'])],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Show the form for editing the specified user.
     *
     * @param  User  $user
     * @return Response
     */
    public function edit(User $user): Response
    {
        return Inertia::render('Edit', compact('user'));
    }

    /**
     * Update the specified user in storage.
     *
     * @param  Request  $request
     * @param  User  $user
     * @return RedirectResponse
     */
    public function update(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'password' => 'nullable|string|min:8|confirmed',
            'role' => ['required', Rule::in(['admin', 'worker', 'sorter'])],
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }

    /**
     * Update the role of the specified user.
     *
     * @param  Request  $request
     * @param  User  $user
     * @return RedirectResponse
     */
    public function updateRole(Request $request, User $user): RedirectResponse
    {
        $request->validate([
            'role' => ['required', Rule::in(['admin', 'worker', 'sorter'])],
        ]);

        // Ensure the user is an admin before updating the role
        if ($request->user()->role !== 'admin') {
            abort(403); // Return a 403 error if the user is not an admin
        }

        // Update the user's role in the database
        $user->update(['role' => $request->role]);

        return redirect()->route('users.index')->with('success', 'Role updated successfully.');
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  User  $user
     * @return RedirectResponse
     */
    public function destroy(User $user): RedirectResponse
    {
        
        $orders = Orders::where('user_id', $user->id);
        foreach($orders as $order){
        Order_Item::where('order_id', $order->id)->delete();
        }
        Orders::where('user_id', $user->id)->delete();

        $user->delete();
        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }
}
