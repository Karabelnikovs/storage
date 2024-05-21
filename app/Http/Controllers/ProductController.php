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
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name' => 'required|min:3',
                'description' => 'required|min:3',
                'quantity' => 'required',
            ]);
    
            Products::create($data);
            
            return back()->with('message', 'Produkts ir pievienots veiksmīgi!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Kļūda: ' . $e->getMessage()]);
        }
    }
    public function edit($id)
{
    $product = Products::findOrFail($id);
    return Inertia::render('ProductEdit', [
        'product' => $product
    ]);
}

public function update(Request $request, $id)
{
    $product = Products::findOrFail($id);
    $product->update($request->all());

    // Pēc veiksmīgas atjaunināšanas, pāradresē lietotāju uz /data-management
    return redirect('/data-management');
}

}
