<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Orders;
use App\Models\User;
use App\Models\Order_Item;
use App\Models\Products;

class OredersController extends Controller
{
    public function index()
    {
        return Inertia::render('OrdersManage', [
            'orders' => Orders::paginate(4),
            'users' => User::all(),
            'products' => Products::all()
        ]);
    }

    public function store(Request $request)
    {
        \DB::transaction(function () use ($request) {
            
            $order = Orders::create([
                'user_id' => $request->user_id,
                'status' => false, 
            ]);

            foreach ($request->items as $item) {
                $product = Products::where('name', $item['productName'])->first();

                Order_Item::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                ]);
            }
        });

        return redirect()->back()->with('success', 'Order created successfully!');
    }

    public function updateStatus(int $orderId)
    {
        $order = Orders::findOrFail($orderId);

        $order->update([
            'status' => !$order->status, 
        ]);

        return redirect()->back()->with('success', 'Order status updated successfully!');
    }

}
