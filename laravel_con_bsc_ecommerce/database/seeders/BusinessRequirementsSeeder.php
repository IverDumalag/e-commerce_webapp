<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BusinessRequirements;
use App\Models\User;

class BusinessRequirementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Find the seller account created in the UserSeeder
        $seller = User::where('email_address', 'seller@example.com')->first();

        if ($seller) {
            // Seed business requirements for the seller
            BusinessRequirements::create([
                'user_id' => $seller->user_id,
                'identification_type' => 'National ID',
                'image' => 'C:\Users\IverM\Downloads\randompic.png',
                'submitted_at' => now(),
            ]);
        }
    }
}