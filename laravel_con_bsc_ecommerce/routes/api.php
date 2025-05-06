<?php

use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BusinessRequirementsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/updateRole', [UserController::class, 'updateRole']);

Route::post('/business-requirements', [BusinessRequirementsController::class, 'store']);
Route::get('/business-requirements/{id}', [BusinessRequirementsController::class, 'show']);
Route::delete('/business-requirements/{id}', [BusinessRequirementsController::class, 'destroy']);

Route::post('/category', [ProductController::class, 'createCategory']);
Route::get('/category', [ProductController::class, 'getCategory']);

Route::post('/products', [ProductController::class, 'addProduct']);
Route::get('/products', [ProductController::class, 'getProduct']);
Route::post('/stockbyuser', [ProductController::class, 'getProductQuantity']);

Route::post('/stock', [ProductController::class, 'addStock']);

