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
        Schema::create('business_requirements', function (Blueprint $table) {
            $table->id('business_requirement_id'); // Primary key
            $table->unsignedBigInteger('user_id'); // Foreign key to users table
            $table->string('identification_type'); // Type of identification (e.g., National ID, Passport)
            $table->string('image'); // Image of the identification
            $table->timestamp('submitted_at')->default(DB::raw('CURRENT_TIMESTAMP')); // Submission timestamp
            $table->timestamps(); // Created at and updated at timestamps

            // Foreign key constraint
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_requirements');
    }
};