<?php

use App\Models\Instructor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\YearLevelController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\SchoolYearController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentSubjectController;
use App\Http\Controllers\InstructorController;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware('guest')
                ->name('register');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest')
                ->name('login');

Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])
                ->middleware('guest')
                ->name('password.email');

Route::post('/reset-password', [NewPasswordController::class, 'store'])
                ->middleware('guest')
                ->name('password.store');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['auth', 'signed', 'throttle:6,1'])
                ->name('verification.verify');

Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware(['auth', 'throttle:6,1'])
                ->name('verification.send');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');

// Student routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/programs', [ProgramController::class, 'index']);
    Route::get('/year_levels', [YearLevelController::class, 'index']);
    Route::get('/semesters', [SemesterController::class, 'index']);
    Route::get('/sections', [SectionController::class, 'index']);
    Route::get('/school_years', [SchoolYearController::class, 'index']);

    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::post('/students/enroll', [StudentController::class, 'enroll'])->name('students.enroll');
    Route::get('/students/enrolled', [StudentController::class, 'isEnrolled'])->name('students.isEnrolled');
    Route::get('/students/{id}', [StudentController::class, 'show'])->name('students.show');
    Route::put('/students/{id}', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{id}', [StudentController::class, 'destroy'])->name('students.destroy');

    Route::get('/students/{student_id}/subjects', [StudentSubjectController::class, 'getStudentSubjects'])->name('students.subjects');
    Route::get('/students/{student_id}/subjects_enrolled', [StudentSubjectController::class, 'getStudentScheduleTeachers'])->name('students.subjects_enrolled');

    Route::get('/instructors', [InstructorController::class, 'index'])->name('instructors.index');
    Route::post('/instructors/enroll', [InstructorController::class, 'enroll'])->name('instructors.enroll');
    Route::get('/instructors/enrolled', [InstructorController::class, 'isEnrolled'])->name('instructors.isEnrolled');
});

