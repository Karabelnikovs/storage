<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    use HasFactory;

    // Šeit jūs varat definēt atbilstošo datubāzes tabulu, ja tā ir atšķirīga no noklusētās
    protected $table = 'history';

    // Šeit jūs varat definēt citus modeļa iestatījumus un metodes
}
