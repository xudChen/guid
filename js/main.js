$(function(){
	$('#mode').change(function(){
		juma.emulation_mode($(this).val());
	});

	$('#scan-button').click(function() {
		juma.scan('#device-list');
    });

	$('#temperature').click(function() {
	    juma.read("/service/temperature",function(value){
		    $('#temperature-value').html(value+"℃");
	    });
	});

	$('#beep-button').click(function() {
	    juma.write("/service/buzzer",{'duration':'5s'});
	}); 
	
	var canvas = document.getElementById('picker');
	var ctx = canvas.getContext('2d');
	var image = new Image();
	image.onload = function(){
	    ctx.drawImage(image, 0, 0, image.width, image.height);
	}
	var imageSrc = 'img/colorwheel1.png';
	image.src = imageSrc;
	$('#picker').click(function(e) {
		var canvasOffset = $(canvas).offset();
        var canvasX = Math.floor(e.pageX - canvasOffset.left);
        var canvasY = Math.floor(e.pageY - canvasOffset.top);
        var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
        var pixel = imageData.data;
        var pixelColor = "rgb("+pixel[0]+", "+pixel[1]+", "+pixel[2]+")";
        var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
		$('#hexVal').css('color',' #' + ('0000' + dColor.toString(16)).substr(-6));
        $('#hexVal').html(' #' + ('0000' + dColor.toString(16)).substr(-6)+' ');
		juma.write("/service/light",{'color':('0000' + dColor.toString(16)).substr(-6)});
	}); 
});