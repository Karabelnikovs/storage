<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Products;
use App\Models\History;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('AddProduct', [
            'products' => Products::paginate(3),
            
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'description' => 'required|min:3',
            'quantity' => 'required|integer',
        ]);

        $product = Products::create($data);

        // Izveidojiet vēstures ierakstu
        $history = new History();
        $history->action = 'Product Added';
        $history->description = 'Product ' . $product->name . ' added to the database.';
        $history->save();//TES

        return back()->with('message', 'Product added successfully!');
    }

    public function update(Request $request, $id)
    {
        $product = Products::findOrFail($id);
        $data = $request->validate([
            'name' => 'required|min:3',
            'description' => 'required|min:3',
            'quantity' => 'required|integer',
        ]);

        $product->update($data);

        // Izveidojiet vēstures ierakstu
        $history = new History();
        $history->action = 'Product Updated';
        $history->description = 'Product ' . $product->name . ' updated in the database.';
        $history->save();

        return redirect(route("data.management"))->with('message', 'Product updated successfully!');
    }
}
