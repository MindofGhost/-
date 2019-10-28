$(document).ready(function() {
	function alert(alert_text){
		$("#alertbox").empty();
		$("#alertbox").append('<div id="alert" class="alert alert-danger alert-dismissible fade show" role="alert">'+ alert_text +'</div>');
		$('#arab').val('');
		$('#rim').val('');
	}

	var output='';
	var outputRim='';
	var trace=[];
	var arr;
	
	var error=false;
	var arr1={one:1, two:2, three:3, four:4, five:5, six:6, seven:7, eight:8, nine:9,};
	var arr10={ twenty:2, thirty:3, forty:4, fifty:5, sixty:6, seventy:7, eighty:8, ninety:9, ten:10, eleven: 11, twelve:12, thirteen:13, fourteen:14, fifteen:15, sixteen:16, seventeen:17, eighteen:18, nineteen:19, };
	var arr2=['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
	arrRim=[{'val':900, 'name':'DM'}, {'val':500, 'name':'D'}, {'val':400, 'name':'CD'}, {'val':100, 'name':'C'}, {'val':90, 'name':'XC'}, {'val':50, 'name':'L'}, {'val':40, 'name':'XL'}, {'val':10, 'name':'X'}, {'val':9, 'name':'IX'}, {'val':4, 'name':'IV'}, {'val':1, 'name':'I'}];
	function errorHandler(id,i){
		//1-unknown word; 2-wrong order; 3-repeats
		error=true;
		if (id==1){
			if(trace.length==0) alert ('Ожидалось единицы или десятки или сотни, получено неизвестное слово ' + arr[i]);
			else{
				if(trace[trace.length-1]=='hundred') alert ('Ожидалось единицы или десятки или конец, получено неизвестное слово ' + arr[i]);
				if(trace[trace.length-1]=='ten') alert ('Ожидалось единицы или конец, получено неизвестное слово '+ arr[i]);
				if(trace[trace.length-1]=='one'&&$.inArray('hundred', trace)>=0) alert ('Ожидалось конец предложения, получено неизвестное слово ' + arr[i]);
				if(trace[trace.length-1]=='one'&&$.inArray('hundred', trace)==-1) alert ('Ожидалось конец предложения или слово "hundred", получено неизвестное слово ' + arr[i]);
			}
		};
		if (id==2){
			if(trace[trace.length-2]=='ten') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось единицы или конец, получено сотни');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='ten'&&$.inArray(arr[i], arr2)==-1&&arr[i]!='ten') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось конец предложения, получено eleven-nineteen');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='ten'&&($.inArray(arr[i], arr2)>=0||arr[i]=='ten')) alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось конец предложения, получено десятки');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='hundred') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось конец предложения, получено сотни');
		}
		if (id==3){
			if(trace[trace.length-2]=='ten'&&trace[trace.length-1]=='ten'&&$.inArray(arr[i], arr2)==-1&&arr[i]!='ten') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось единицы или конец, получено eleven-nineteen');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='ten'&&$.inArray(arr[i], arr2)==-1&&arr[i]!='ten') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось  конец, получено eleven-nineteen');
			if(trace[trace.length-2]=='ten'&&trace[trace.length-1]=='ten'&&($.inArray(arr[i], arr2)>=0||arr[i]=='ten')) alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось единицы или конец, получено десятки');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='ten'&&($.inArray(arr[i], arr2)>=0||arr[i]=='ten')) alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось  конец, получено десятки');
			
			if(trace[trace.length-2]=='ten'&&trace[trace.length-1]=='hundred') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось единицы или конец, получено сотни');
			if(trace[trace.length-2]=='hundred'&&trace[trace.length-1]=='hundred') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось десятки или единицы или конец, получено сотни');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='one') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось  конец, получено единицы');
			if(trace[trace.length-2]=='one'&&trace[trace.length-1]=='hundred') alert ('Ошибка после слова "'+arr[i-1]+'"'+' Ожидалось  конец, получено сотни');
		};
		if (id==4){
			if(arr.length==1)alert ('Ожидалось указание колличества сотен');
			else{ 
				if(arr10[arr[i]]!=undefined) alert(arr[i]+' больше 9');
				else alert ('Ожидалось единицы перед hundred, получено неизвестное слово ' + arr[i]);
			}
		}
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
			if ($.inArray(string, arr2)>=0 && typeof next === "undefined"){
				output = output + '0';
			};
			return true;
		}
	}
	function hundred(string, next, i){
		if (string=='hundred'&&arr.length>1){
			if (typeof next==="undefined"){
				output = output + '00';
			}			
			if (arr1[next]!=undefined){
				output = output + '0';
			}
			return true;
		}
		if (string=='hundred'&&arr.length==1){
			errorHandler(4,i);
			return true;
		};
		if (next=='hundred'){
			if (arr1[string]==undefined){
				errorHandler(4,i);
			}
			output = output + arr1[string];
			return true;
		}else return false;
	}
	$('#save').click(function() {
		output='';
		outputRim='';
		trace=[];
		error=false;
		var hund=false
		var str = $('#input').val();
		str=str.toLowerCase();
		str = str.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g, '');
		arr = str.split(' ');
		
		for(i=0;i<arr.length;i++){
			if (hundred(arr[i], arr[i+1], i)==false){
				
				if (ten(arr[i],arr[i+1])==false){
					
					if (one(arr[i])==false){
						errorHandler(1,i);						
					}else{
						if ($.inArray('one', trace)>=0){ 
							trace.push('one');
							errorHandler(3,i);
						};
						trace.push('one');
					}
					
				}else{
					if ($.inArray('ten', trace)>=0){
						trace.push('ten');
						errorHandler(3,i);
					}else trace.push('ten');
					if ($.inArray('one', trace)>=0) errorHandler(2,i);
					//Если в тексте встречается слово, включающее десятки и единицы
					if ($.inArray(arr[i], arr2)==-1)trace.push('one');
				}
				
			}else{
				if ($.inArray('hundred', trace)>=0){
					trace.push('hundred');
					errorHandler(3,i);
				};
				if(hund==true){
				trace.push('hundred');
				hund=false;
				}
				else {hund = true;}
				if ($.inArray('one', trace)>=0 || $.inArray('ten', trace)>=0) errorHandler(2,i);
			}
			if (error==true) break;
		};

		if (error==false){
			$('#arab').val(output);
			while (output>0){
				for(i=0;i<arrRim.length;i++){
					if (output-arrRim[i]['val']>=0){
						outputRim = outputRim + arrRim[i]['name'];
						output=output-arrRim[i]['val'];
						break;
					}
				}
			}
			$('#rim').val(outputRim);
		} 
		window.setTimeout(function(){
			$('#alert').alert('close');
		},5000);
	});
	
});