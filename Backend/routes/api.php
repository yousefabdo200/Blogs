<?php

use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\UserController ;
//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');
Route::post('/login',[UserController::class,'login']);
Route::post('/signup',[UserController::class,'signup']);
Route::post('/logout',[UserController::class,'logout']);
Route::get('/user',[UserController::class,'user']);
Route::get('/posts',[PostController::class,'index']);
Route::get('/posts/{id}',[PostController::class,'post']);
Route::post('/posts',[PostController::class,'store']);
Route::put('/posts/{id}',[PostController::class,'update']);
Route::delete("/posts/{id}",[PostController::class,'destroy']);
