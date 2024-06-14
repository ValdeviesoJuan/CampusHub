<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'birthdate',
        'contact_number',
        'email',
    ];

    public function subjectEnrollments()
    {
        return $this->hasMany(SubjectEnrolled::class);
    }
}
