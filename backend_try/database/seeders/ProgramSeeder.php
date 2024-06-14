<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('programs')->insert([
            ['program_name' => 'Bachelor of Science in Information Technology', 'abbv' => 'BSIT', 'department_id' => 1],
            ['program_name' => 'Master of Science in Information Technology', 'abbv' => 'MSIT', 'department_id' => 1],
            ['program_name' => 'Bachelor of Science in Technology Communication Management', 'abbv' => 'BSTCM', 'department_id' => 2],
            ['program_name' => 'Master of Science in Technology Communication Management', 'abbv' => 'MSTCM', 'department_id' => 2],
            ['program_name' => 'Bachelor of Science in Data Science', 'abbv' => 'BSDS', 'department_id' => 3],
            ['program_name' => 'Master of Science in Data Science', 'abbv' => 'MSDS', 'department_id' => 3],
            ['program_name' => 'Bachelor of Science in Computer Science', 'abbv' => 'BSCS', 'department_id' => 4],
            ['program_name' => 'Master of Science in Computer Science', 'abbv' => 'MSCS', 'department_id' => 4],
        ]);
    }
}
