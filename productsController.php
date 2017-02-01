<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\classification;
use App\product;


class productsController extends Controller
{
	//classfications angular CRUD


    public function addClass(Request $request){
    	$classification  = classification::create([
            'name' => $request->input('name')
        ]);
    }

    public function editClass(Request $request,$id){
    	$classification = classification::find($id);
    	$classification->name = $request->input('name');
    	$classification->save();
    }

    public function deleteClass($id){
    	$classification = classification::find($id);
    	$classification->delete();
    }

    public function getClass($id){
    	return \Response::json(classification::find($id));
    }

    public function allClass(){
    	return \Response::json(classification::all());
    }


    // products crud CRUD
    public function getAllProduct($id){
    	$classification = classification::find($id);
    	return \Response::json($classification->products);
    }
    public function addProduct(Request $request){
    	$product  = product::create([
            'name' => $request->input('name'),
            'price' => $request->input('price'),
            'Num_In_Store' => $request->input('Num_In_Store'),
            'class_id' => $request->input('class_id')
        ]);
    }

    public function editProduct(Request $request,$id){
    	$product = product::find($id);
    	$product->name = $request->input('name');
    	$product->price = $request->input('price');
    	$product->Num_In_Store = $request->input('Num_In_Store');
    	$product->save();
    }

    public function deleteProduct($id){
    	$product = product::find($id);
    	$product->delete();
    }

    public function getProduct($id){
    	return \Response::json(product::find($id));
    }



}
