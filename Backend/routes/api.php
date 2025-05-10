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
Route::middleware('auth:api')->get('/user',[UserController::class,'user']);
Route::middleware('auth:api')->post('/refresh',[UserController::class,'refresh']);
Route::prefix('posts')->controller(PostController::class)->group(function(){
    Route::get('/','index');
    Route::middleware('auth:api')->group(function(){
        Route::get('/{id}','post');
        Route::post('/','store');
        Route::put('/{id}','update');
        Route::delete("/{id}",'destroy');
    });
});
