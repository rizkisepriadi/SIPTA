<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run()
    {
        User::factory()->create([
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
    }
}