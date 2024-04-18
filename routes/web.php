<?php

use App\Http\Controllers\AkademikController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\ProfileController;
use App\Models\Akademik;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';

route::get('/profile/update', function() {
    return Inertia::render('Profile/Update');
})->middleware(['auth', 'verified'])->name('update');

route::get('/profile/reset_password', function() {
    return Inertia::render('Profile/ResetPassword');
})->middleware(['auth', 'verified'])->name('reset');

Route::get('/dospem', [DosenController::class, 'index'])->name('dospem');

Route::get('/tugasakhir', function() {
    return Inertia::render('TugasAkhir');
})->middleware(['auth', 'verified'])->name('tugasakhir');