<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Define the table name if it doesn't follow Laravel's naming convention
    protected $table = 'product';
    protected $primaryKey = 'product_id';
    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'product_name',
        'category_id',
        'description',
        'user_id',
        'product_image',
        'product_price'
    ];
}
