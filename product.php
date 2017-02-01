<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class product extends Model
{
   protected $fillable = array('name','price','Num_In_Store','class_id','updated_at','created_at');
   public $table = 'products';

}
