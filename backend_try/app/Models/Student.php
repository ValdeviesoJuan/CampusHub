<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'birthdate',
        'phone_number',
        'email',
        'user_id',
        'program_id',
        'year_level_id',
        'semester_id',
        'section_id',
        'school_year_id',
        'profile_image',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function yearLevel()
    {
        return $this->belongsTo(YearLevel::class);
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }
    
    public function subjectsEnrolled()
    {
        return $this->hasMany(SubjectEnrolled::class);
    }
}
