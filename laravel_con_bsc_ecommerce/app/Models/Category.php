<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Define the table name if it doesn't follow Laravel's naming convention
    protected $table = 'product_categories';
    protected $primaryKey = 'category_id';
    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'category'
    ];
}
