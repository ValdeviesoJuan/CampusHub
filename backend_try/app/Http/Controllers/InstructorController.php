<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InstructorController extends Controller
{
    public function index()
    {
        $instructors = Instructor::all();
        return response()->json($instructors);
    }

    public function enroll(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'birthdate' => 'required|date',
            'contact_number' => 'nullable|string|max:20',
            'email' => 'required|email|max:255',
        ]);

        $user = auth()->user();

        Instructor::updateOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $request->name,
                'birthdate' => $request->birthdate,
                'contact_number' => $request->contact_number,
                'email' => $request->email,
            ]
        );

        return response()->json(['message' => 'Instructor Enrollment completed successfully']);
    }

    public function isEnrolled()
    {
        $user = auth()->user();
        $instructor = Instructor::where('user_id', $user->id)->first();
        
        if ($instructor) {
            return response()->json(['isEnrolled' => true, 'studentId' => $instructor->id]);
        } else {
            return response()->json(['isEnrolled' => false, 'studentId' => null]);
        }
    }
}
