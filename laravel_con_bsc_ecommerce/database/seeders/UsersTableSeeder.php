<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'username' => 'seller_account',
                'password' => Hash::make('password123'), // Default password
                'full_name' => 'John Seller',
                'address' => '123 Seller Street, Cityville',
                'contact_number' => '1234567890',
                'email_address' => 'seller@example.com',
                'role' => 'seller',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'buyer_account',
                'password' => Hash::make('password123'), // Default password
                'full_name' => 'Jane Buyer',
                'address' => '456 Buyer Avenue, Townsville',
                'contact_number' => '0987654321',
                'email_address' => 'buyer@example.com',
                'role' => 'buyer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}