<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //['subject_code' => '', 'title' => '', 'credit_unit' => '', 'program_id' => '', 'year_level_id' => '', 'semester_id' => '', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()]
        
        $bsitFirstYearFirstSemesterSubjects = [
            ['subject_code' => 'IT111', 'title' => 'Introduction to Computing', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'IT112', 'title' => 'Computer Programming 1', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'PurCom', 'title' => 'Purposive Communication', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'RPH', 'title' => 'Readings in Philippine History', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'TCW', 'title' => 'The Contemporary World', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'MMW', 'title' => 'Mathematics in the Modern World', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'PATHFIT 1', 'title' => 'Movement Enhancement', 'credit_unit' => 2, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'NSTP101', 'title' => 'ROTC/CWTS/LTS I', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        $bsitFirstYearSecondSemesterSubjects = [
            ['subject_code' => 'IT121', 'title' => 'Computer Programing 2', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'IT122', 'title' => 'Data Structures and Algorithms', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'IT123', 'title' => 'Discrete Mathematics', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'ArtApp', 'title' => 'Art Appreciation', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'UTS', 'title' => 'Understanding the Self', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'PATHFIT 2', 'title' => 'Fitness Activity and Exercises', 'credit_unit' => 2, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'NSTP 102', 'title' => 'ROTC/CWTS/LTS II', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['subject_code' => 'STS', 'title' => 'Science, Technology and Society', 'credit_unit' => 3, 'program_id' => 1, 'year_level_id' => 1, 'semester_id' => 2, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];
        
        DB::table('subjects')->insert(array_merge($bsitFirstYearFirstSemesterSubjects, $bsitFirstYearSecondSemesterSubjects));
    }
}
