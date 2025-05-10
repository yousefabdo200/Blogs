<?php
namespace App\Traits;
Trait Response {
    public function SucessLogResponse($token,)
    {

    }
    public function SucessResponse($data=[],$msg='',$status=200)
    {

        if(!empty($data))
        {
            $res=[
                'data' => $data,
                'msg' => $msg,
            ];
        }
        else
        {
            $res=[ 'msg' => $msg];
        }
        return response()->json($res,$status);
    }
    public function ErrorResponse($data=[],$msg='',$status=400)
    {
        $response = [
            'msg' => $msg,
            'data' => $data
        ];
        return response()->json($response, $status);
    }

}
