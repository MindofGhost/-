$(document).ready(function() {
	
	var error=false;
	$('[name=start], [name=stop]').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9]/g)) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});
	$('#name').bind("change keyup input click", function() {
		if (this.value.match(/[,.!?;:()\-\(\)\.\^\+]/)) {
			this.value = this.value.replace(/[,.!?;:()\-\(\)\.\^\+]/, '');
		}
	});
	function alert(alert_text){
		if (error==false){
			error=true;
			$("#alertbox").empty();
			$("#alertbox").append('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+ alert_text +'</div>')
		}
	}
	$('#save').click(function() {
		var str = $('#name').val(); 
		str = str.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g, '');
		var arr = str.split(' ');
		console.log('длина массива ' + arr.length);
		//error=false;
		if ($('[name=start]').val().length==0){
			alert('Не заданна начальная позиция');
		}	
		if ($('[name=stop]').val().length==0){
			alert('Не заданна конечная позиция');
		}
		if ($('[name=start]').val()>$('[name=stop]').val()){
			alert('Начало перестановки больше или равно концу');
		}
		if ($('[name=start]').val()>$('[name=stop]').val()){
			alert('Начальное значение больше конечного');
		}		
		if ($('[name=stop]').val()>arr.length){
			alert('Выделение больше чем предложение');
		}
		
		window.setTimeout(function(){
						$('#alert').alert('close');
						error=false;
					},5000);
		if (error==false){
			var newstring= '';
			for (i=0; i<arr.length; i++){
				if (i<($('[name=start]').val()-1) || i>($('[name=stop]').val()-1)){
					newstring=newstring+arr[i]+' ';
				}
			}
			for (i=$('[name=start]').val()-1; i<$('[name=stop]').val(); i++){
				newstring=newstring+arr[i]+' ';
			}
			console.log(newstring);
			newstring.replace(/(\s)$/g, '');
			$('#output').val(newstring);
		}
	})
});