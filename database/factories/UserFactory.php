<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
            'nim' => fake()->nik(),
            'telp' => fake()->phoneNumber(),
            'dospem' => fake()->name(),
            'alamat' => fake()->address(),
            'tempatlahir' => fake()->city(),
            'tanggallahir' => '12 April 2003',
            'jeniskelamin' => 'Laki-Laki',
            'kewarganegaraan' => 'Indonesia',
            'agama' => 'islam'
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
