<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Traits\Response;
class PostController extends Controller
{
    //
    use Response;
    public function index(){
        //Post::factory(20)->create();
        $posts = Post::with('user')->paginate(10);
        return $this->SucessResponse($posts,"Data loaded successfully",200);
    }
}
