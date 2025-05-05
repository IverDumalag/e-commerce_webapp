<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
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
            $imagePath = 'images/' . $imageName; // Store the relative path
        } else {
            return response()->json(['error' => 'Image upload failed'], 400);
        }

        $product = Product::create([
            'product_name' => $request->product_name,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'user_id' => $request->user_id,
            'product_image' => $imagePath,
            'product_price' => $request->product_price
        ]);

        return response()->json([
            'message' => 'Product is successfully created',
            'data' => $product
        ], 201);

    }

    public function getProduct()
    {
        $products = Product::all();

        return response()->json([
            'message' => 'here the products',
            'categories' => $products
        ], 200);

    }
}
