<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Products;
use App\Models\History;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Shelfs;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('AddProduct', [
            'products' => Products::paginate(3),
            'shelfs' => Shelfs::all()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            'description' => 'required|min:3',
            'quantity' => 'required|integer',
            'shelf_id' => 'required'
        ]);

        $product = Products::create($data);

        // Create history entry
        $history = new History();
        $history->user_id = Auth::id(); // Get the authenticated user's ID
        $history->action = 'Product Added';
        $formattedCreatedAt = Carbon::parse($history->created_at)->format('Y-m-d H:i:s');
        $history->description =  Auth::user()->name . ' added Product ' . $product->name . ' to the database '.$formattedCreatedAt;
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
        $formattedCreatedAt = Carbon::parse($history->created_at)->format('Y-m-d H:i:s');
        $history->description = '<span style="linear-gradient(90deg, #2F2F2F 0%, #A7A7A7 100%);">' . Auth::user()->name . '</span> updated Product ' . $product->name . ' in the database '.$formattedCreatedAt;
        $history->save();
        $history->save();

        return redirect(route("data.management"))->with('message', 'Product updated successfully!');
    }
}
