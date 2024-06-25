<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            ['name' => 'admin', 'email' => 'admin@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'admin'],
            ['name' => 'teach', 'email' => 'teach@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'instructor'],
            ['name' => 'student0', 'email' => 'student0@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student1', 'email' => 'student1@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student2', 'email' => 'student2@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student3', 'email' => 'student3@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student4', 'email' => 'student4@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student5', 'email' => 'student5@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student6', 'email' => 'student6@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student7', 'email' => 'student7@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student8', 'email' => 'student8@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
            ['name' => 'student9', 'email' => 'student9@gmail.com', 'password' => Hash::make('12345678'), 'role' => 'student'],
        ]);
    }
}
