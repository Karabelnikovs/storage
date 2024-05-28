<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\History; // Pievieno History modeli
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Orders;
use App\Models\Order_Item;
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
        Order_Item::where('product_id', $id)->delete();
        
        $history = new History();
        $history->user_id = Auth::id(); 
        $history->action = 'Product Deleted';
        $formattedCreatedAt = Carbon::parse($history->created_at)->format('Y-m-d H:i:s');
        $history->description =  Auth::user()->name . ' Product Deleted ' . $product->name . ' database '.$formattedCreatedAt;
        $history->save();

        $product->delete();

        return back()->with('message', 'Deleted successfully!');
    }    
}
