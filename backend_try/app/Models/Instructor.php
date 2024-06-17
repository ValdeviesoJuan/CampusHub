<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'birthdate',
        'contact_number',
        'email',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function instructorSectionsHandled()
    {
        return $this->hasMany(InstructorSectionsHandled::class);
    }

    public function subjectEnrollments()
    {
        return $this->hasMany(SubjectEnrolled::class);
    }
}
