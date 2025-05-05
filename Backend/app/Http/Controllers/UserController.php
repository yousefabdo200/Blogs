<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
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
        if($validator->fails()){
            return $this->ErrorResponse($validator->errors(),"Failed to login ",400);
        }
        $user=User::where('email',$request->email)->first();
        if (!$user||!Hash::check($request->password, $user->password)) {
            return $this->ErrorResponse([], 'User not found', 404);
        }
        return $this->SucessResponse($user, 'Login successful');
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
        return $this->SucessResponse($user, 'Login successful');
    }
}
