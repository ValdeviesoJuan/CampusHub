<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectEnrolled extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'subject_id',
        'instructor_id',
        'class_schedule',
        'midterm_grade',
        'final_grade',
        'remarks',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class)->withDefault();
    }
}
