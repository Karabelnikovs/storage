<?php

// /app/Http/Controllers/HistoryController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\History;


class HistoryController extends Controller
{
    public function index()
    {

        return Inertia::render('History/Index', [
            'history' => History::latest()->paginate(10),
        ]);
        
    }
}

