<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    // Define the table name if it doesn't follow Laravel's naming convention
    protected $table = 'product_inventory';
    protected $primaryKey = 'stock_id';
    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'product_id',
        'quantity',
        'user_id'
    ];

}
