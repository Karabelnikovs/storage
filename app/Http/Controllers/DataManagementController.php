<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\History; // Pievieno History modeli
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;

use Inertia\Inertia;

class DataManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('DataManage', [
            'products' => Products::paginate(4)
        ]);
    }

    public function destroy($id)
    {
        $product = Products::findOrFail($id);

        // Izveidojiet vēstures ierakstu pirms produkta izdzēšanas
        $history = new History();
        $history->action = 'Product Deleted';
        $history->description = 'Product ' . $product->name . ' Deleted.';
        $history->save();

        $product->delete();

        return back()->with('message', 'Deleted successfully!');
    }    
}
