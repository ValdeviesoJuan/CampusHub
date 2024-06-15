<?php

namespace App\Http\Controllers;

use App\Models\YearLevel;
use Illuminate\Http\Request;

class YearLevelController extends Controller
{
    public function index()
    {
        $yearLevels = YearLevel::all();
        return response()->json($yearLevels);
    }
}
