<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function Laravel\Prompts\select;

class CartController extends Controller
{
    //

    public function confirmCart(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,user_id',
            'product_id' => 'required|exists:product',
            'quantity' => 'required|int',
            // 'status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // get oldest stock
        $oldestStock = Inventory::where('product_id', '=', $request->product_id)->limit(1)->get();

        if (count($oldestStock) == 0) {
            return response()->json([
                'message' => 'It appears that this item is currently out of stock',
            ], 400);
        }

        // add to product_purchase 
        Cart::create([
            'stock_id' => $oldestStock[0]['stock_id'],
            'quantity' => $request->quantity,
            'user_id' => $request->user_id, // buyer
            'status' => 'confirmed'
        ]);

        $confirmed = Cart::
            join('laravel.product_inventory', 'product_purchase.stock_id', '=', 'product_inventory.stock_id')
            ->join('laravel.product', 'product_inventory.product_id', '=', 'product.product_id')
            ->select('product_purchase.purchase_id', 'product.product_id', 'product.product_name', 'product.product_price', 'product_purchase.quantity', 'product_purchase.status', 'product_purchase.created_at')
            ->where('product_purchase.user_id', '=', $request->user_id)
            ->where('product_purchase.status', '=', 'confirmed')
            ->get()
        ;

        return response()->json([
            'message' => 'Order confirmed',
            'data' => $confirmed,
        ], 201);

    }

    public function getConfirmedByBuyer(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,user_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $confirmed = Cart::
            join('laravel.product_inventory', 'product_purchase.stock_id', '=', 'product_inventory.stock_id')
            ->join('laravel.product', 'product_inventory.product_id', '=', 'product.product_id')
            ->select('product_purchase.purchase_id', 'product.product_id', 'product.product_name', 'product.product_price', 'product_purchase.quantity', 'product_purchase.status', 'product_purchase.created_at')
            ->where('product_purchase.user_id', '=', $request->user_id)
            ->where('product_purchase.status', '=', 'confirmed')
            ->get()
        ;

        return response()->json([
            'message' => 'Confirmed orders',
            'data' => $confirmed,
        ], 200);

    }

    public function cancelOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'purchase_id' => 'required|exists:product_purchase,purchase_id',
            'user_id' => 'required|exists:users,user_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        Cart::
            where('purchase_id', '=', $request->purchase_id)
            ->update([
                'status' => 'cancelled'
            ]);


        $confirmed = Cart::
            join('laravel.product_inventory', 'product_purchase.stock_id', '=', 'product_inventory.stock_id')
            ->join('laravel.product', 'product_inventory.product_id', '=', 'product.product_id')
            ->select('product_purchase.purchase_id', 'product.product_id', 'product.product_name', 'product.product_price', 'product_purchase.quantity', 'product_purchase.status', 'product_purchase.created_at')
            ->where('product_purchase.user_id', '=', $request->user_id)
            ->where('product_purchase.status', '=', 'confirmed')
            ->get()
        ;

        return response()->json([
            'message' => 'Order cancelled',
            'data' => $confirmed,
        ], 200);

    }

}
