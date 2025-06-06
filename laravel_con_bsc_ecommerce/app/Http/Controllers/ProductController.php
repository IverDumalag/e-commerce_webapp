<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Inventory;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    //
    public function createCategory(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'category' => 'required|string|max:50|unique:product_categories',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $category = Category::create([
            'category' => $request->category,
        ]);

        return response()->json([
            'message' => 'Category is successfully created',
            'data' => $category,
        ], 201);

    }

    public function getCategory()
    {

        $categories = Category::all();

        return response()->json([
            'message' => 'here the categories',
            'categories' => $categories
        ], 200);
    }

    public function addProduct(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,user_id',
            'category_id' => 'required|int|exists:product_categories',
            'product_name' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'product_price' => 'required|int',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048', // Validate file
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle the image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . $image->getClientOriginalName(); // Generate a unique name
            $image->move(public_path('images'), name: $imageName); // Move the image to 'public/images'
            $imagePath = "images/$imageName"; // Store the relative path
        } else {
            return response()->json(['error' => 'Image upload failed'], 400);
        }

        Product::create([
            'product_name' => $request->product_name,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'user_id' => $request->user_id,
            'product_image' => $imagePath,
            'product_price' => $request->product_price
        ]);

        $products = DB::table('product')
            ->leftJoin('product_inventory', 'product.product_id', '=', 'product_inventory.product_id')
            ->join('product_categories', 'product.category_id', '=', 'product_categories.category_id')
            ->selectRaw('product.product_id, product.product_name, product_categories.category_id, product_categories.category, product.description, product.product_price, SUM(product_inventory.quantity) as quantity')
            ->where('product.user_id', '=', $request->user_id)
            ->groupBy('product_name', 'product_id', 'category_id', 'category', 'description', 'product_price')
            ->get();

        return response()->json([
            'message' => 'Product is successfully created',
            'data' => $products
        ], 201);

    }

    public function getProduct()
    {
        $products = DB::table('product')
            ->join('product_categories', 'product.category_id', '=', 'product_categories.category_id')
            ->select('product.product_id', 'product.product_name', 'product_categories.category_id', 'product_categories.category', 'product.description', 'product.product_image', 'product.product_price', )
            ->get();

        return response()->json([
            'message' => 'here the products',
            'products' => $products
        ], 200);
    }

    public function getProductQuantity(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,user_id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $products = DB::table('product')
            ->leftJoin('product_inventory', 'product.product_id', '=', 'product_inventory.product_id')
            ->join('product_categories', 'product.category_id', '=', 'product_categories.category_id')
            ->selectRaw('product.product_id, product.product_name, product_categories.category_id, product_categories.category, product.description, product.product_price, SUM(product_inventory.quantity) as quantity')
            ->where('product.user_id', '=', $request->user_id)
            ->groupBy('product_name', 'product_id', 'category_id', 'category', 'description', 'product_price')
            ->get();

        return response()->json([
            'message' => 'here the products',
            'products' => $products
        ], 200);
    }

    public function addStock(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:product,product_id',
            'user_id' => 'required|exists:users,user_id',
            'quantity' => 'required|int',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        Inventory::create([
            'product_id' => $request->product_id,
            'user_id' => $request->user_id,
            'quantity' => $request->quantity,
        ]);

        $products = DB::table('product')
            ->leftJoin('product_inventory', 'product.product_id', '=', 'product_inventory.product_id')
            ->join('product_categories', 'product.category_id', '=', 'product_categories.category_id')
            ->selectRaw('product.product_id, product.product_name, product_categories.category_id, product_categories.category, product.description, product.product_price, SUM(product_inventory.quantity) as quantity')
            ->where('product.user_id', '=', $request->user_id)
            ->groupBy('product_name', 'product_id', 'category_id', 'category', 'description', 'product_price')
            ->get();

        return response()->json([
            'message' => 'Stock has been updated',
            'data' => $products
        ], 201);
    }
}
