<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Products;
use App\Models\History;
use Illuminate\Support\Facades\Auth;

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

        // Create history entry
        $history = new History();
        $history->user_id = Auth::id(); // Get the authenticated user's ID
        $history->action = 'Product Added';
        $history->description = '<span style="color:blue;">' . Auth::user()->name . '</span> added Product ' . $product->name . ' to the database.';
        $history->save();

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

        // Create history entry
        $history = new History();
        $history->user_id = Auth::id(); // Get the authenticated user's ID
        $history->action = 'Product Updated';
        $history->description = '<span style="color:blue;">' . Auth::user()->name . '</span> updated Product ' . $product->name . ' in the database.';
        $history->save();

        return redirect(route("data.management"))->with('message', 'Product updated successfully!');
    }
}
