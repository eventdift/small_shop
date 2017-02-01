<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\order;
use App\product;

use App\Http\Requests;

class orderController extends Controller
{
    public function saveOrder(Request $request){
    	$sku = $this->createOrder($request->input('purchaseList'),$request->input('CustomerName'));
    	$this->UpdateProduct($request->input('purchaseList'));
        $data = ['purchaseList'=>$request->input('purchaseList'),
                'totalPrice'=>$request->input('totalPrice'),
                'CustomerName'=>$request->input('CustomerName')
        ];
        return $sku;
    	
    }

    private function createOrder(array $data,$name){
        $sku = bcrypt('Customer');
        $skuu = str_replace('/', '*', $sku);
    	foreach ($data as $purchase) {
    		order::create([
    			'Product_Name'=>$purchase['name'],
    			'price'=>$purchase['Tprice'],
    			'Customer_Name'=>$name,
    			'quantity'=>$purchase['Num_To_Purchase'],
                'DateRecieved'=>date('Y-m-d'),
                'sku'=>$skuu
    			]);

    	}
        return $sku;
    }
   

    private function UpdateProduct(array $data){
    	foreach ($data as $purchase){
    		$product = product::find($purchase['id']);
    		$product->Num_In_Store -= $purchase['Num_To_Purchase'];
    		$product->save();
    	}
    }

    public function generatePdf($sku){
        $data = \DB::table('orders')->where('sku',$sku)->get();
        $name = \DB::table('orders')->where('sku',$sku)->first();
        $Tprice = \DB::table('orders')->where('sku',$sku)->sum('price');
        $pdf = \PDF::loadView('order',['data'=>$data,'name'=>$name,'Tprice'=>$Tprice]);
        return $pdf->download('order.pdf');
    }
}
