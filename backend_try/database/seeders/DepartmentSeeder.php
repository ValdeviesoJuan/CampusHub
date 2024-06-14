<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('departments')->insert([
            ['department_name' => 'Department of Information Technology'],
            ['department_name' => 'Department of Technology Communication Management'],
            ['department_name' => 'Department of Data Science'],
            ['department_name' => 'Department of Computer Science'],
        ]);
    }
}
