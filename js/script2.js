$(document).ready(function() {
	/*$('#input').bind("change keyup input click", function() {
		if (this.value.match(/[,.!?;:()='"\[\]\/\-\(\)\{\}\.\^\+]/g)) {
			this.value = this.value.replace(/[,.!?;:()='"\]\[\{\}\/\-\(\)\.\^\+]/g, '');
		}
		if (this.value.match(/[а-я]|\d/i)) {
			this.value = this.value.replace(/[а-я]|\d/i, '');
		}
	});*/
	function alert(alert_text){
		$("#alertbox").empty();
		$("#alertbox").append('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+ alert_text +'</div>');
		$('#arab').val('');
	}

	var output='';
	var trace=[];

	var error=false;
	var arr1={one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9,};
	var arr10={ twenty:2, thirty:3, forty:4, fifty:5, sixty:6, seventy:7, eighty:8, ninety:9, ten:10, eleven: 11, twelve:12, thirteen:13, fourteen:14, fifteen:15, sixteen:16, seventeen:17, eighteen:18, nineteen:19, };
	var arr2=['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	function errorHandler(id){
		//1-unknown word; 2-wrong order; 3-repeats
		error=true;
		if (id==1){
			if(trace.length==0) alert ('Ожидалось единицы или десятки или сотни, получено неизвестное слово');
			else{
				if(trace[trace.length-1]=='hundred') alert ('Ожидалось единицы или десятки или конец, получено неизвестное слово');
				if(trace[trace.length-1]=='ten') alert ('Ожидалось единицы или конец, получено неизвестное слово');
				if(trace[trace.length-1]=='one') alert ('Ожидалось конец предложения, получено неизвестное слово');
			}
			console.log(trace);
		};
		if (id==2){
			if(trace[trace.length-2]=='ten') alert ('Ожидалось единицы или конец, получено сотни');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='ten') alert ('Ожидалось конец предложения, получено десятки');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='hundred') alert ('Ожидалось конец предложения, получено сотни');
			//alert('хуйня текст неверный порядок');
			console.log(trace);
		}
		if (id==3){
			if(trace[trace.length-2]=='ten'&&trace[trace.length-1]=='ten') alert ('Ожидалось единицы или конец, получено десятки');
			if(trace[trace.length-2]=='ten'&&trace[trace.length-1]=='hundred') alert ('Ожидалось единицы или конец, получено сотни');
			if(trace[trace.length-2]=='hundred'&&trace[trace.length-1]=='hundred') alert ('Ожидалось десятки или единицы или конец, получено сотни');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='one') alert ('Ожидалось  конец, получено единицы');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='ten') alert ('Ожидалось  конец, получено десятки');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='hundred') alert ('Ожидалось  конец, получено сотни');
			//alert('хуйня текст повтор');
			console.log(trace);
		};
	}
	function one(string){
		if (arr1[string]==undefined){
			return false;
		}else{
			output = output + arr1[string];
			return true;
		}
	}
	function ten(string,next){
		
		if (arr10[string]==undefined){
			return false;
		}else{
			output = output + arr10[string];
			console.log(typeof next === "undefined");
			if ($.inArray(string, arr2)>=0 && typeof next === "undefined"){
				output = output + '0';
				console.log('hi')
			};
			return true;
		}
	}
	function hundred(string, next){
		if (string=='hundred'){
			if (typeof next==="undefined"){
				output = output + '00';
			}			
			if (arr1[next]!=undefined){
				output = output + '0';
			}
			return true;
		}
		if (next=='hundred'){
			output = output + arr1[string];
			return true;
		}else return false;
	}
	$('#save').click(function() {
		output='';
		trace=[];
		error=false;
		var hund=false
		var str = $('#input').val();
		str=str.toLowerCase();
		str = str.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g, '');
		var arr = str.split(' ');
		
		for(i=0;i<arr.length;i++){
			if (hundred(arr[i], arr[i+1])==false){
				
				if (ten(arr[i],arr[i+1])==false){
					
					if (one(arr[i])==false){
						errorHandler(1);						
					}else{
						if ($.inArray('one', trace)>=0){ 
							trace.push('one');
							errorHandler(3);
						};
						trace.push('one');
					}
					
				}else{
					if ($.inArray('ten', trace)>=0){
						trace.push('ten');
						errorHandler(3);
					}else trace.push('ten');
					if ($.inArray('one', trace)>=0) errorHandler(2);
					//Если в тексте встречается слово, включающее десятки и единицы
					if ($.inArray(arr[i], arr2)==-1)trace.push('one');
				}
				
			}else{
				if ($.inArray('hundred', trace)>=0){
					trace.push('hundred');
					errorHandler(3);
				};
				if(hund==true){
				trace.push('hundred');
				hund=false;
				}
				else {hund = true;}
				if ($.inArray('one', trace)>=0 || $.inArray('ten', trace)>=0) errorHandler(2);
			}
			if (error==true) break;
		};

		if (error==false) $('#arab').val(output);
		console.log(arr.join('\n'));
		window.setTimeout(function(){
			$('#alert').alert('close');
			//error=false;
		},5000);
	});
	
});