<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('subjects_enrolled', function (Blueprint $table) {
            Schema::table('subjects_enrolled', function (Blueprint $table) {
                $table->boolean('is_midterm_submitted')->default(false);
                $table->boolean('is_final_submitted')->default(false);
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subjects_enrolled', function (Blueprint $table) {
            $table->dropColumn(['is_midterm_submitted', 'is_final_submitted']);
        });
    }
};
