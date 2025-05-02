<?php

namespace App\Http\Controllers;

use App\Models\BusinessRequirements;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BusinessRequirementsController extends Controller
{
    /**
     * Store a newly created business requirement in storage.
     */
    public function store(Request $request)
{
    // Validate the incoming request
    $validatedData = $request->validate([
        'user_id' => 'required|exists:users,user_id',
        'identification_type' => 'required|string|max:255',
        'image' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048', // Validate file
    ]);

    // Handle the image upload
    if ($request->hasFile('image')) {
        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName(); // Generate a unique name
        $image->move(public_path('images'), $imageName); // Move the image to 'public/images'
        $imagePath = 'images/' . $imageName; // Store the relative path
    } else {
        return response()->json(['error' => 'Image upload failed'], 400);
    }

    // Create a new business requirement record
    $businessRequirement = BusinessRequirements::create([
        'user_id' => $validatedData['user_id'],
        'identification_type' => $validatedData['identification_type'],
        'image' => $imagePath, // Save the path to the database
        'submitted_at' => now(),
    ]);

    return response()->json([
        'message' => 'Business requirement submitted successfully',
        'data' => $businessRequirement,
    ], 201);
}

    /**
     * Display the specified business requirement.
     */
    public function show($id)
    {
        $businessRequirement = BusinessRequirements::find($id);

        if (!$businessRequirement) {
            return response()->json(['error' => 'Business requirement not found'], 404);
        }

        return response()->json($businessRequirement);
    }

    /**
     * Delete the specified business requirement.
     */
    public function destroy($id)
    {
        $businessRequirement = BusinessRequirements::find($id);

        if (!$businessRequirement) {
            return response()->json(['error' => 'Business requirement not found'], 404);
        }

        // Delete the image from storage
        if ($businessRequirement->image) {
            $imagePath = public_path($businessRequirement->image);
            if (file_exists($imagePath)) {
                unlink($imagePath); // Delete the image file
            }
        }

        $businessRequirement->delete();

        return response()->json(['message' => 'Business requirement deleted successfully']);
    }
}