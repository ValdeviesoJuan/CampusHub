<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            DepartmentSeeder::class,
            SchoolYearSeeder::class,
            YearLevelSeeder::class,
            SemesterSeeder::class,
            ProgramSeeder::class,
            SectionSeeder::class,
            SubjectSeeder::class,
        ]);
    }
}
