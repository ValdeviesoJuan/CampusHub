<?php

namespace App\Http\Controllers;

use App\Models\InstructorSectionsHandled;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InstructorSectionsHandledController extends Controller
{
    public function index()
    {
        $instructorHandled = InstructorSectionsHandled::all();
        return response()->json($instructorHandled);
    }
}
