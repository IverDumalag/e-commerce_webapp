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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); 
            $table->string('username', 50)->unique();
            $table->string('password');
            $table->string('full_name', 150);
            $table->string('address', 255)->nullable();
            $table->string('contact_number', 20)->nullable();
            $table->string('email_address', 254)->unique();
            $table->string('role', 50); // 'buyer', 'seller'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};