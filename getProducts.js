app.controller('shopController', function($http){
	
	var shop = this;
	shop.products = [];
	shop.classId = 0;
	shop.productId =  0;
	shop.CustomerName = '';

	shop.purchaseList = [];

	shop.getProducts = function(){
		$http.get('api/v1/classification'+'/'+shop.classId)
		.success(function(data){
			console.log(data);
			shop.products = data;
		})
		.error(function(error){
			console.log(error);
		});
	}

	shop.addToList = function(){
		$http.get('api/v1/products'+'/'+shop.productId)
		.success(function(data){
			if(data.Num_In_Store>0){
			data.Num_To_Purchase = 1;
			data.Tprice = data.Price/1;
			if(shop.purchaseList.length===0){
				shop.purchaseList.push(data);
			}

			shop.test=false;
			for (var i=0; i<shop.purchaseList.length; i++) {
				if(shop.purchaseList[i]['id'] === data.id){
					shop.test=true;
				}
				 console.log(shop.test);
			}

			if(!shop.test){
				shop.purchaseList.push(data);
			}
			shop.calcTotal();
			}else{
				alert('Item finished In Store');
			}
		});
	}

	shop.removeProduct = function(index){
		shop.purchaseList.splice(index,1);
		shop.calcTotal();
	}

	shop.increaseBy1 = function(index){
		if(shop.purchaseList[index]['Num_To_Purchase'] < shop.purchaseList[index]['Num_In_Store']){
			shop.purchaseList[index]['Num_To_Purchase'] ++;
			shop.purchaseList[index]['Tprice'] += shop.purchaseList[index]['Price']/1 ;
			shop.calcTotal();
		}
	}

	shop.reduceBy1 = function(index){
		shop.purchaseList[index]['Num_To_Purchase'] --;
		shop.purchaseList[index]['Tprice'] -= shop.purchaseList[index]['Price'];
		shop.calcTotal()
	}

	shop.calcTotal = function(){
		if(shop.purchaseList !==0){
			shop.totalPrice = 0;
			for (var i=0; i<shop.purchaseList.length; i++) {
				shop.totalPrice += shop.purchaseList[i]['Tprice'];
			};
		}
	}

	shop.Order = function(){
		shop.item = {totalPrice:shop.totalPrice,CustomerName:shop.CustomerName,purchaseList:shop.purchaseList};
		console.log(shop.item);
		
		$http({
			method: 'POST',
			data: shop.item,
			url: 'api/v1/saveOrder'
		})
		.success(function(data){
			shop.sku = data;
		})
		.error(function(error){
			console.log(error);
		});
		
	}

	shop.newPurchase  = function(){
		shop.purchaseList = [];
		shop.sku = '';
		shop.CustomerName = '';
	}

});