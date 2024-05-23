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
        
            $data = $request->validate([
                'name' => 'required|min:3',
                'description' => 'required|min:3',
                'quantity' => 'required',
            ]);
    
            Products::create($data);
            
            return back()->with('message', 'Product added succesfully!');
        
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

        return redirect(route("data.management"))->with('message', 'Product updated succesfully!');
        

    }

}
