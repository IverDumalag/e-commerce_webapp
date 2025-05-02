<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:50|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'full_name' => 'required|string|max:150',
            'address' => 'nullable|string|max:255',
            'contact_number' => 'nullable|string|max:20',
            'email_address' => 'required|string|email|max:254|unique:users',
            'role' => 'required|string|in:buyer,seller',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the user
        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'full_name' => $request->full_name,
            'address' => $request->address,
            'contact_number' => $request->contact_number,
            'email_address' => $request->email_address,
            'role' => $request->role,
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    /**
     * Handle user login.
     */
    public function login(Request $request)
    {
        // Validate the request data
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt to log in the user
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json(['message' => 'Login successful', 'user' => $user], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

        /**
     * Update the role of a user.
     */
    public function updateRole(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,user_id', // Ensure user_id exists in the users table
            'role' => 'required|string|in:buyer,seller', // Role must be either 'buyer' or 'seller'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Find the user by ID
        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user's role
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'User role updated successfully', 'user' => $user], 200);
    }
}