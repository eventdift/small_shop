<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class classification extends Model
{
    protected $fillable = array('name');
    public $table = 'classifications';

    public function products(){
    	return $this->hasMany('App\product','class_id');
    }
}
