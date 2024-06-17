<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstructorSectionsHandled extends Model
{
    use HasFactory;
    
    protected $table = 'instructor_sections_handled';

    protected $fillable = [
        'subject_id',
        'instructor_id',
        'section_id',
        'school_year_id',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function instructor()
    {
        return $this->belongsTo(Instructor::class)->withDefault();
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function schoolYear()
    {
        return $this->belongsTo(SchoolYear::class);
    }
}
