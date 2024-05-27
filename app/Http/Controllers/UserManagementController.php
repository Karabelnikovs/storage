<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;





class UserManagementController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @return Response
     */
    // public function index(): Response
    // {
    //     $users = User::all();
    //     return Inertia::render('UserManagement/Index', compact('users'));
    // }
    public function index()
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

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => $request->role,
    ]);

    // Redirect to a specific route after successful user creation
    return redirect()->route('user.management')->with('success', 'User created successfully.');
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

        return redirect()->route('user.management')->with('success', 'User updated successfully.');
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

    // Veikt drošības pārbaudi, vai lietotājs ir administrators, pirms veikt darbību
    if ($request->user()->role !== 'admin') {
        abort(403); // Ja lietotājs nav administrators, izvada 403 kļūdu
    }

    // Atjauno lietotāja lomu datubāzē
    $user->update(['role' => $request->role]);

    return redirect()->route('user.management')->with('success', 'Role updated successfully.');
}
    /**
     * Remove the specified user from storage.
     *
     * @param  User  $user
     * @return RedirectResponse
     */
    public function destroy(User $user): RedirectResponse
    {
        $user->delete();
        return redirect()->route('user.management')->with('success', 'User deleted successfully.');
    }
}
