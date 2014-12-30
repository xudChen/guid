var juma = {

    baseUrl : "http://127.0.0.1:8086/ble",
    device : null, 
    
    emulation_mode : function(value){
        if(!value){
        	console.log('value is not be null');
        	return;
		}
        if(value == 0){
            this.baseUrl = "http://127.0.0.1:8086/ble";
        }else{
            this.baseUrl = "http://api.juma.io/ble";
        }     
    },

    status:function(){
        var tempUrl = this.baseUrl +'/status';
        $.getJSON(tempUrl,null,function(data){
            alert(JSON.stringify(data));
        });
    },
    
    scan:function(selector,settings){
        if(!selector){
        	console.log('no selector');
        	return;
        }
        var tempUrl = this.baseUrl +'/devices/nearby';
        
        $(selector).html("searching");
        
        $.getJSON(tempUrl,null,function(data){
            var devices = data['devices'];

            if (devices.length == 0) {
                $(selector).html('no device found');
                return;
            }

            html_str = "";
            for(var i=0;i<devices.length;i++){
                var device = devices[i];
                var name = device.name;
                var addr = device.address;
                var rssi = device.rssi;

                html_str += '<label for="device-' + i + '">' + name + ' &nbsp;&nbsp' + addr;
                html_str += ' ' + '</label><input type="radio" name="device" id="device-' + i;
                html_str += '" value="' + i + '"></input>';
            }

            $(selector).html(html_str);

            $('input[type="radio"]').checkboxradio();

            for(var i=0;i<devices.length;i++) {
                (function (device) {
                    $('#device-' + i).click(function() {
                        juma.device = device;
                    });
                })(devices[i]);
            }
          });
    },
    
    read : function(resource,success){
    	if(!this.device){
	    	console.log('please select device at first!');
	    	return;
	    }
        if(!resource){
            console.log('resource is not be null!');
            return;
        }
        alert(juma.device);
        var tempUrl = this.baseUrl+'/device/'+juma.device.deviceAddress+resource;
        $.getJSON(tempUrl, null, function(data){
            if(success)success(data['value']);
        });
    },
    
    write : function(resource,params){
	    if(!this.device){
	    	console.log('please select device at first!');
	    	return;
	    }
		if(!resource){
			console.log('resource is not be null!');
			return;
		}
        var tempUrl = this.baseUrl+'/device/'+juma.device.deviceAddress+resource;
        $.post(tempUrl, params, function(data){
            console.log(JSON.stringify(data));
        });
    }
}
