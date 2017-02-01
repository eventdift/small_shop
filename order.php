<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class order extends Model
{
	protected $fillable = array('Product_Name','price','Customer_Name','quantity','DateRecieved','sku');
    public $table = 'orders';
}
