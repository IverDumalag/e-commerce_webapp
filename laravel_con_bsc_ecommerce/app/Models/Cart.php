<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;


    // Define the table name if it doesn't follow Laravel's naming convention
    protected $table = 'product_purchase';
    protected $primaryKey = 'purchase_id';
    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'stock_id',
        'quantity',
        'status',
        'user_id' // buyer
    ];
}
