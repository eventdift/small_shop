app.controller('itemController', function($http){
	var item  = this;

	item.ModalState1 = '';
	item.ModalState2 = '';
	item.dummy = 0;
	item.tab = 0;

	item.classification  = {name:''};
	item.product = {name:'',price:0,Num_In_Store:0,class_id:item.tab};

	item.classList = [];
	item.productList = [];

	//load classification
	item.getClassifications = function(){
		$http.get('api/v1/allclassifications')
		.success(function(data){
			item.classList = data;
		})
		.error(function(error){
			console.log(error);
		})
	}

	item.getClassifications();

	//load classification


	item.showEditor1 = false;
	item.showEditor2 = false;

	item.AddTo = function(){
		item.product.Num_In_Store += item.dummy;
	}

	item.RemoveFrom = function(){
		item.product.Num_In_Store -= item.dummy;
	}
	item.Editor1 = function(State){
		item.ModalState1 = State;
		switch(State){
			case 'add':
				item.classification.name = '';
				break;
			default:
				break;
		}
		item.showEditor1 = true;
	}
	
	item.Editor2 = function(State){
		item.ModalState2 = State;
		switch(State){
			case 'add':
				item.product.name = '';
				item.product.price = 0;
				item.product.Num_In_Store = 0;	
			default:
				break;
		}
		
		item.showEditor2 = true;
	}

	item.CloseEditor2 = function(){
		item.showEditor2 = false;
	}

	item.CloseEditor1 = function(){
		item.showEditor1 = false;
	}

	//load Products
	item.LoadProducts = function(val){
		item.showEditor2 =  false;
		console.log(val);
		item.tab = val;
		item.product.class_id = val;
		$http.get('api/v1/classification'+'/'+val)
		.success(function(data){
			console.log(data);
			item.productList = data;
		})
		.error(function(error){
			console.log(error);
		});
	}

	//add new product
	item.addProduct = function(id){

		switch(item.ModalState2){
			case 'add':
				var urll = 'api/v1/products';
				break;
			case 'edit':
				var urll = 'api/v1/products'+'/'+item.editId2;
				break;
			default:
				break;
		}
		$http({
			method: 'POST',
			url: urll,
			data: item.product
		})
		.success(function(){
			item.LoadProducts(item.tab);
		})
		.error(function(error){
			console.log(error);
		});
	}

	item.editProduct = function(id){
		$http.get('api/v1/products'+'/'+id)
		.success(function(data){
			item.editId2 = data.id;
			item.product.name = data.name;
			item.product.price = data.Price;
			item.product.Num_In_Store = data.Num_In_Store;
			item.Editor2('edit');
		})
		.error(function(error){
			console.log(error);
		});
	}

	item.removeProduct = function(id){
		$http.delete('api/v1/products'+'/'+id)
		.success(function(){
			item.LoadProducts(item.tab);
		})
		.error(function(error){
			console.log(error);
		});

	}

	//add new products
	item.addClass = function(id){
		
		switch(item.ModalState1){
			case 'add':
				var urll = 'api/v1/classifications';
				break;
			case 'edit':
				var urll = 'api/v1/classifications'+'/'+item.editId;
				break;
			default:
				break;
		}

		$http({
			method: 'POST',
			url: urll, 
			data: item.classification})
		.success(function(){
			item.CloseEditor1();
			item.getClassifications();
		})
		.error(function(error){
			console.log(error);
		});

	}
	//edit class
	item.editClass = function(id){
		$http.get('api/v1/classifications'+'/'+id)
		.success(function(data){
			item.editId = data.id;
			item.classification.name = data.name;
			item.Editor1('edit');
		})
		.error(function(error){
			console.log(error);
		});
	}

	//delete class
	item.deleteClass = function(id){
		$http.delete('api/v1/classifications'+'/'+id)
		.success(function(){
			item.getClassifications();
		})
		.error(function(error){
			console.log(error);
		});

	}


});