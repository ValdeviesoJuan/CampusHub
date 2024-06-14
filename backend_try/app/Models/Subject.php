<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'subject_code',
        'title',
        'credit_unit',
        'program_id',
    ];

    public function program()
    {
        return $this->belongsTo(Program::class);
    }

    public function subjectsEnrolled()
    {
        return $this->hasMany(SubjectEnrolled::class);
    }
}
