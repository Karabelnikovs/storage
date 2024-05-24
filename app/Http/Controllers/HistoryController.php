<?php

// /app/Http/Controllers/HistoryController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        // Šeit jūs varat iegūt un atgriezt vēstures ierakstus no datubāzes
        $history = \App\Models\History::all();

        // Pēc tam atgrieziet Inertia skatu ar vēstures datiem
        return Inertia::render('History/Index', [
            'history' => $history,
        ]);
    }
}

