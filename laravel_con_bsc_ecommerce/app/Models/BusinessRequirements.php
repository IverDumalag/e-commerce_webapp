<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BusinessRequirements extends Model
{
    use HasFactory;

    // Define the table name if it doesn't follow Laravel's naming convention
    protected $table = 'business_requirements';
    protected $primaryKey = 'business_requirement_id';
    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'user_id',
        'identification_type',
        'image',
        'submitted_at',
    ];
   
    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}