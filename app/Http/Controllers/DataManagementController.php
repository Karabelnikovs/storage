<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DataManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('DataManage', [
            'products' => Products::all()
        ]);
    }
}
