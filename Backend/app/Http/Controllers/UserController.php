<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    use Response;
    //
    public function login(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if($validator->fails()) {
            return $this->ErrorResponse($validator->errors(), "Failed to login ", 400);
        }
        if (!$token=auth()->attempt($validator->validated())) {
            return $this->ErrorResponse([], 'User not found', 404);
        }

         return $this->respondWithTokens(auth()->user(), $token);
    }
    public function signup(Request $request)
    {
        //validation
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);
        if ($validator->fails()) {
            return $this->ErrorResponse($validator->errors(), "Failed to signup", 400);
        }

        $validatedData = $validator->validated();
        $validatedData['password'] = Hash::make($validatedData['password']);
       $user=User::create($validatedData);
        $token = auth()->login($user);
        return $this->respondWithTokens($user,$token);
    }
    private function respondWithTokens($user,$token)
    {
        $refreshToken = JWTAuth::customClaims(['type' => 'refresh'])->fromUser($user);
        return response()->json([
            'access_token' => $token,
            'token_type' => 'jwt',
            'data' => ['id'=>$user->id,'name'=>$user->name],
            'msg' => "login in successfully Done",
        ])->cookie('refresh_token', $refreshToken, 1440, '/', null, true, true, false, 'Strict');
    }
    public function refresh(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');
        if(!$refreshToken){
            return $this->ErrorResponse([], 'refresh token is missing', 401);
        }
        try{
            $payload = JWTAuth::setToken($refreshToken)->getPayload();
            if ($payload->get('type') !== 'refresh') {
                return $this->ErrorResponse([], 'Invalid refresh token type', 403);
            }
            $user = JWTAuth::setToken($refreshToken)->authenticate();
            $newAccessToken = auth()->login($user);
            return $this->respondWithTokens($user, $newAccessToken);
        } catch (\Exception $e) {
            return $this->ErrorResponse([], 'Token invalid or expired', 401);
        }
    }
    public function user()
    {
        return response()->json(auth()->user());
    }
    public function logout()
    {
        auth()->logout();
        return response()->json([
            'msg' => 'Logged out successfully'
        ])->withoutCookie('refresh_token');
    }
    }
