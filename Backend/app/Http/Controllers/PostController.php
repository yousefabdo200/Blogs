<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;

use Illuminate\Http\Request;
use App\Traits\Response;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    //
    use Response;
    public function index(){
        //Post::factory(20)->create();
        $posts = Post::with('user')->orderByDesc('created_at')->paginate(10);
        return $this->SucessResponse($posts,"Data loaded successfully",200);
    }
    public function store(Request $request)
    {
        $validator=Validator::make($request->all(),[
            'title'=>'required',
            'body'=>'required|string',
            'user_id' => 'required|exists:users,id',
            'img' => 'image'
        ]);
        if($validator->fails()){
            return $this->ErrorResponse($validator->errors());
        }
        $data=$validator->validated();
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $path = $image->store('posts', 'public');
            $data['img'] = "http://localhost:8000/storage/".$path;
        }
        else
        {
            $data['img'] ="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp";
        }
        //return $this->SucessResponse($data,"Data loaded successfully",200);

        $post=Post::create($data);
        if($post)
            return $this->SucessResponse($post,"Data loaded successfully",200);
        else
            return $this->ErrorResponse("Failed to create post",400);
    }
    public function update($id,Request $request){
        $validator=Validator::make($request->all(),[
            'title'=>'required',
            'body'=>'required|string',
            'img' => 'image'
        ]);
        if($validator->fails()){
            return $this->ErrorResponse($validator->errors());
        }
        $data=$validator->validated();
        if ($request->hasFile('img')) {
            $image = $request->file('img');
            $path = $image->store('posts', 'public');
            $data['img'] = "http://localhost:8000/storage/".$path;
        }
        $post=Post::find($id)->update($data);
        if($post)
            return $this->SucessResponse($post,"Data loaded successfully",200);
        else
            return $this->ErrorResponse("Failed to update post",500);
    }
    public function post($id)
    {
        $post=Post::find($id);
        if($post)
            return $this->SucessResponse($post,"Data loaded successfully",200);
        else
        {
            return $this->ErrorResponse("Data not found",404);
        }
    }
    public function destroy($id)
    {
        Post::where('id',$id)->delete();
        return $this->SucessResponse("","Data deleted successfully",200);
    }
}
