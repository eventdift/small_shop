app.controller('locationsController', function($http){
	var locations = this;

    locations.email = {email:'',role:'',department_id:0,name:''};

    locations.emailId = 0;

    locations.toggle = function(modalstate, dept_id){
        locations.modalstate = modalstate;
        locations.email.department_id = dept_id;
        switch(modalstate){
            case 'add':
                locations.form_title = "ADD EMAIL";
                locations.email.email = '';
                locations.email.role = '';
                locations.email.name = '';
                break;
            case 'edit':
                locations.form_title = "EDIT EMAIL";
                $http.get('email/' + dept_id)
                    .success(function(data){
                        locations.email.name = data.name;
                        locations.email.email = data.email;
                        locations.email.role = data.role;
                        locations.emailId = data.id;
                    })
                    .error(function(error){
                        console.log(error);
                    });
                break;
            default:
                break;
        }
        console.log(dept_id);
        $('#myModal').modal('show');
    }

	locations.tab = 0;

	locations.address = '';

	locations.statuss = 'edit';

	locations.showSave = true;

	locations.editAddress = true;

    locations.bhub = 0;
	locations.DeptList = [];
    locations.department = {name:'', bhub_id:0};
    locations.BusHub = {name:0, address:''};

	locations.setTab = function(val){
		locations.editAddress = true;
		locations.showSave = true;
        locations.tab = val;
        locations.bhub = val;
        locations.DeptList = [];
        locations.department.name = '';
        locations.BusHub.name = val;
        locations.department.bhub_id = val;
        $http({
        	method: 'GET',
        	url: 'locations/' + val})
        .success(function(data){
        	console.log(data.address);
        	locations.BusHub.address = data.address;
        })
        .error(function(error){
        	console.log(error);
        });
        $http({
        	method: 'GET',
        	url: 'locations/departments/' + val})
        .success(function(data){
        	console.log(data);
        	locations.DeptList = data;
        })
        .error(function(error){
        	console.log(error);
        });

    };

    locations.setEdit = function(){
        locations.editAddress = false;
        locations.statuss = 'save';
        locations.showSave = false;
    };

    locations.hideMe = function(){
        locations.setTab(locations.bhub);
    }

    locations.AddDepartment = function(){
        console.log(locations.department);
        $http({
            method: 'POST',
            url: 'department/store',
            data: locations.department
        }).
        success(function(){
            locations.setTab(locations.bhub);
        })
        .error(function(error){
            console.log(error);
        });
    };

    locations.SaveAddress = function(){
        console.log(locations.BusHub);
        $http({
            method: 'put',
            url: 'bhubadd',
            data: locations.BusHub
        })
            .success(function(){
                locations.setTab(locations.bhub);
            })
            .error(function(error){
                console.log(error);
            });
    };

    locations.DeleteDept = function(DeptId){
        console.log(DeptId);
        var isConfirmDelete = confirm('Are you sure you want to remove this Department?');
        if(isConfirmDelete){
            $http({
                method: 'delete',
                url: 'department/' + DeptId
            })
                .success(function(){
                    locations.setTab(locations.bhub);
                })
                .error(function(error){
                    console.log(error);
                });
        }
        else{
            return false;
        }
    };

    locations.DeleteMail = function(MailId){
        console.log(MailId);
        var isConfirmDelete = confirm('Are you sure you want to remove email address ?');
        if(isConfirmDelete){
            $http({
                method: 'delete',
                url: 'email/' + MailId 
            })
            .success(function(){
                locations.setTab(locations.bhub);
            })
            .error(function(error){
                console.log(error);
            });
        }
        else{
            return false;
        }
    };

    locations.StoreMail = function(){
        console.log(locations.email);
        switch(locations.modalstate){
            case 'add':
                var methood = 'POST';
                var mail = 'email';
                break;
            case 'edit':
                var methood = 'PUT';
                var mail = 'email/' + locations.emailId;
                break;
            default:
                break;
        };
        
        $http({
            method: methood,
            url: mail,
            data: locations.email
        })
        .success(function(){
            $('#myModal').modal('hide');
            locations.setTab(locations.bhub);
        })
        .error(function(error){
            alert('Email already exists');
            console.log(error);
        });
    };
});