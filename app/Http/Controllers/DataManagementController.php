<?php

namespace App\Http\Controllers;

use App\Models\Products;
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

    public function destroy($id): JsonResponse
    {
        try {
            $product = Products::findOrFail($id);
            $product->delete();

            return response()->json(['message' => 'Product deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Product deletion failed'], 500);
        }
    }
    public function edit($id)
{
    $product = Products::findOrFail($id);
    return Inertia::render('ProductEdit', [
        'product' => $product
    ]);
}
}


