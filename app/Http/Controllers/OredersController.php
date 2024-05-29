<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Orders;
use App\Models\User;
use App\Models\Order_Item;
use App\Models\Products;
use App\Models\History;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

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
                if($item['quantity'] >= $product['quantity']){
                    Order_Item::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $product['quantity'],
                    ]);
                    
                }
                else{
                    Order_Item::create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                        'quantity' => $item['quantity'],
                    ]);
                }
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

    public function destroy($id){
        $order = Orders::findOrFail($id);
        Order_Item::where('order_id', $id)->delete();

        $history = new History();
        $history->user_id = Auth::id();
        $history->action = 'Order and order items deleted';
        $formattedCreatedAt = Carbon::parse($history->created_at)->format('Y-m-d H:i:s');
        $history->description = Auth::user()->name . ' Order deleted ' . $order->name . ' database ' . $formattedCreatedAt;
        $history->save();

        $order->delete();

        return back()->with('message', 'Deleted successfully!');
    }

}
