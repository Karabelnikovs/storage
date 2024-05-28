<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Shelfs;
use App\Models\History;

class ShelfController extends Controller
{
    public function addShelf()
    {
        return Inertia::render('AddShelf');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|min:3',
            
        ]);

        Shelfs::create($data);

        return back()->with('message', 'Shelf built successfully!');
    }
}
