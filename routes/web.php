<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\DataManagementController;
use App\Http\Controllers\OredersController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');

    Route::get('/user-management', [UserManagementController::class, 'index'])->name('user.management');
    Route::get('/user-management/create', [UserManagementController::class, 'create'])->name('user.management.create');
    Route::post('/user-management', [UserManagementController::class, 'store'])->name('user.management.store');
    Route::get('/user-management/{user}/edit', [UserManagementController::class, 'edit'])->name('user.management.edit');
    Route::put('/user-management/{user}', [UserManagementController::class, 'update'])->name('user.management.update');
    Route::post('/user-management/{user}/update-role', [UserManagementController::class, 'updateRole'])->name('user.management.update-role');
    Route::post('/user-management/create', [UserManagementController::class, 'store'])->name('user.management.create');

    Route::post('/products/{id}', 'App\Http\Controllers\ProductController@update');
    Route::put('/products/{id}', 'App\Http\Controllers\ProductController@update');
    Route::delete('/products/{id}', [DataManagementController::class, 'destroy'])->name('products.destroy');
    Route::get('/data-manage', [DataManagementController::class, 'index'])->name('data.manage');
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::patch('/products/edit/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/user-management/{user}', [UserManagementController::class, 'destroy'])->name('user.management.destroy');
    Route::get('/data-management', [DataManagementController::class, 'index'])->name('data.management');
    Route::get('/orders-management', [OredersController::class, 'index'])->name('orders.management');
    Route::post('/orders', [OredersController::class, 'store'])->name('orders.store');
});

require __DIR__.'/auth.php';
