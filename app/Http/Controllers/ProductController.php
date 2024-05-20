<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Orders;
use App\Models\Products;
use App\Models\User;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('AddProduct', [
            'products' => Products::paginate(3)
        ]);
    }
    public function store(Request $request){
        $data = $request->validate(
            [
                'name' => 'required|min:3',
                'description' => 'required|min:3',
                'quantity' => 'required',
            ]
        );
        Products::create($data);
        return back()->with('message', 'Product was added');
    }
}
