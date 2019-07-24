
// google.charts.load('current', {packages: ['corechart']});

$(document).ready(function() {
    

    $("#function1SeventhButton").click(function(){
		console.log("function1 Seventh Bttuon clicked")
		var adminString ='';

		// Get the number of different admin types
		$.get('/function1/getAdminTypeNumber',function(result){
			console.log("Admin type result is: ",result)
			var length = result.length;
			for(i=0;i<length;i++){
			adminString = adminString+ result[i]._id+": "+ result[i].numbOfRev+ '\r\n';
		}
		console.log("Final string is: ",adminString)
		})

		// Construct Pie Chart for function 1 (Overall)
		$.get('/function1/getPieChart',function(result){
			var dataTable = new google.visualization.DataTable();
			length = result.length;
			console.log(result)
			var wholeList =[];
			dataTable.addColumn('string', 'Year');
			dataTable.addColumn('number', 'Number of revision');
			dataTable.addColumn({type: 'string', role: 'tooltip'});
			console.log(dataTable)
			var options = { legend: 'none' ,
			'title':"A pie chart of revision number distribution by year and by user type across the whole dataset",
			'width':850,
			'height':450,};

			
			for (i=0;i<length;i++){
				if(result[i].usertype != 'admin'){
				tempList = []
				var string = '';
				tempList.push(result[i].usertype)
				tempList.push(result[i].numbOfRev)
				string = string + result[i].usertype + ": "+ result[i].numbOfRev;
				tempList.push(string)
				console.log(tempList)
				wholeList.push(tempList)
				
			}
			else{
				console.log("We are in admin type")
				tempList =[]
				tempList.push(result[i].usertype)
				tempList.push(result[i].numbOfRev)
				tempList.push(adminString)
				console.log(tempList)
				wholeList.push(tempList)

			}
			
		}
		console.log(wholeList)
		dataTable.addRows(wholeList);

		var chart = new google.visualization.PieChart($("#pieChartSec")[0]);
		chart.draw(dataTable, options);
		})
	});
	 


	// Construct bar chart for Overall function.
	$("#function1EighthButton").click(function(){
		console.log("function1 Eighth Bttuon clicked")
		
		$.get('/function1/getBarChart',function(result){
			var firstRow = ['Year','admin','anon','bot','regular'];
			length = result.length;
			var wholeList =[];
			wholeList.push(firstRow);
			var tempListOneRow=[];
			var counter =0
			var typeMap =new Map()
		

			console.log(tempList,"At the beginning")
		
			for (i=0;i<length;i++){
				var tempList=[]
				counter+=1;
				var k = i+1;
				console.log(result[i])
				var	tempYear = result[i].year;
				console.log("This is result k: ",result[k])
				console.log(typeof result[k])
				if(typeof result[k] != 'undefined'){
				var compareYear = result[k].year;
				
				if(tempYear == compareYear){
					console.log("We are doing for year:",tempYear,"Counter: ",counter);
					
					if (result[i].usertype =='anon'){
						console.log('We find a anon user')
						typeMap.set('anon',result[i].numbOfRev)
						console.log(typeMap.size)
					}
						
						
					
					else if (result[i].usertype =='admin'){
						console.log('We find a admin user')
						typeMap.set('admin',result[i].numbOfRev)
						console.log(typeMap.size)
						
					}
					else if (result[i].usertype =='bot'){
						typeMap.set('bot',result[i].numbOfRev)
						console.log(typeMap.size)
					}
					else{
						console.log('We find a regular user')
						typeMap.set('regular',result[i].numbOfRev)
						console.log(typeMap.size)
					}
				
				}
				
				else{
					
					console.log("year are different")
					if (result[i].usertype =='anon'){
						console.log('We find a anon user')
						typeMap.set('anon',result[i].numbOfRev)
						console.log(typeMap.size)

					}

					else if (result[i].usertype =='admin'){

						console.log('We find a admin user')
						typeMap.set('admin',result[i].numbOfRev)
						console.log(typeMap.size)

					}
					else if (result[i].usertype =='bot'){
						console.log('We find a bot user')
						typeMap.set('bot',result[i].numbOfRev)
						console.log(typeMap.size)
					}

					else  {
						console.log('We find a regular user')
						typeMap.set('regular',result[i].numbOfRev)
						console.log(typeMap.size)
					}

					console.log("We are now checking do we have all 4 values in tempList")
					// Performing list  check
					console.log("Mapping size: "+typeMap.size)
					if(typeMap.size==4){
						var completeList = []
						var anonTemp = typeMap.get('anon')
						var adminTemp = typeMap.get('admin')
						var botTemp = typeMap.get('bot')
						var regularTemp = typeMap.get('regular')
						var year = tempYear
						completeList.push(year,adminTemp,anonTemp,botTemp,regularTemp)
							wholeList.push(completeList)
							
						console.log(wholeList)
						
					}
					
					else{
						console.log("We are filing for the missing type")
						var typeList = ['anon','admin','bot','regular']
						console.log(tempListOneRow)
						var tempListOneRowLength = tempListOneRow.length;
						
						if (!typeMap.has('anon')){
							typeMap.set('anon',0)
							console.log("We found anon missing!")
						}						
						else if(!typeMap.has('admin')){
							typeMap.set('admin',0)
							console.log("We found admin missing!")
						}
						

						
						else if(!typeMap.has('bot')){
							typeMap.set('bot',0)
							console.log("We found bot missing")
						}
						else{
							typeMap.set('regular',0)
							console.log("We found regular missing")
						}

						var anonTemp = typeMap.get('anon')
						var adminTemp = typeMap.get('admin')
						var botTemp = typeMap.get('bot')
						var regularTemp = typeMap.get('regular')
						var year = tempYear
						var completeList=[]
						completeList.push(year,adminTemp,anonTemp,botTemp,regularTemp)
						wholeList.push(completeList)
						console.log(wholeList)
					
						}
					}
				}			


		// Ending point k = undefined, put last i into typeMap
		else{
			console.log("This is the last result we have to input: ",result[i])
			var type = result[i].usertype
			var number = result[i].numbOfRev
			typeMap.set(type, number)
			console.log(typeMap)
			console.log(typeMap.size)
			console.log('finish')
			if(typeMap.size==4){
				var completeList = []
				var anonTemp = typeMap.get('anon')
				var adminTemp = typeMap.get('admin')
				var botTemp = typeMap.get('bot')
				var regularTemp = typeMap.get('regular')
				var year = tempYear
				completeList.push(year,adminTemp,anonTemp,botTemp,regularTemp)
					wholeList.push(completeList)
					
				console.log(wholeList)
				
			}
			else{
				console.log("We are filing for the missing type")
						var typeList = ['anon','admin','bot','regular']
						console.log(tempListOneRow)
						var tempListOneRowLength = tempListOneRow.length;
						
						if (!typeMap.has('anon')){
							typeMap.set('anon',0)
							console.log("We found anon missing!")
						}						
						else if(!typeMap.has('admin')){
							typeMap.set('admin',0)
							console.log("We found admin missing!")
						}
						

						
						else if(!typeMap.has('bot')){
							typeMap.set('bot',0)
							console.log("We found bot missing")
						}
						else{
							typeMap.set('regular',0)
							console.log("We found regular missing")
						}
			}

			}
	}
		console.log("Length of fullList", wholeList.length)
		console.log(wholeList)
		var data = google.visualization.arrayToDataTable(wholeList);
		var options = {
				'title':"A bar chart of revision number distribution by year and by user type across the whole dataset",
				'width':1450,
				'height':650
		};
		var chart = new google.visualization.ColumnChart($("#columnChartSec")[0]);
		chart.draw(data, options);
		})
	});	
	

// Individual Pie Chart Construction !
	$("#function2SecondButton").click(function(){
		console.log("function2 Second Bttuon clicked")
		// var parameters = {number: $('#unumber4').val() };
		var parameters = $('#unumber3').val();
		$.get('/function2/getPieChart?bookTitle='+parameters,function(result){
			console.log(result)
			length = result.length;
			console.log(result)
			var wholeList =[];
			var firstRow = ['Year','Numbers'];
			wholeList.push(firstRow);
			for (i=0;i<length;i++){
				tempList = []
				tempList.push(result[i].usertype)
				tempList.push(result[i].numbOfRev)
				wholeList.push(tempList);
			console.log(result[i].usertype)
			console.log(result[i].numbOfRev)
		}
		console.log("Length of fullList", wholeList.length)
		console.log(wholeList)
		var data = google.visualization.arrayToDataTable(wholeList);
		var options = {
				'title':"A pie chart of revision number distribution based on user type",
				'width':840,
				'height':450
		};
		var chart = new google.visualization.PieChart($("#function2pieChartSec")[0]);
		chart.draw(data, options);
		})
	});




	// function2ThirdButton Individual function bar chart construction
	$("#function2ThirdButton").click(function(){
		console.log("function2 Third Bttuon clicked")
		var parameters = $('#unumber3').val() ;
		$.get('/function2/BarChart?bookTitle='+parameters,function(result){
			var firstRow = ['Year','admin','anon','bot','regular'];
			length = result.length;
			var wholeList =[];
			wholeList.push(firstRow);
			var counter =0
			var typeMap =new Map()
		

			console.log(tempList,"At the beginning")
		
			for (i=0;i<length;i++){
				
				var tempList=[]
				counter+=1;
				var k = i+1;
				console.log(result[i])
				var	tempYear = result[i].year;
				console.log("This is result k: ",result[k])
				console.log(typeof result[k])
				if(typeof result[k] != 'undefined'){
				var compareYear = result[k].year;
				
				if(tempYear == compareYear){
					console.log("We are doing for year:",tempYear,"Counter: ",counter);
					
					if (result[i].usertype =='anon'){
						console.log('We find a anon user')
						typeMap.set('anon',result[i].numbOfRev)
						console.log(typeMap.size)
					}
						
						
					
					else if (result[i].usertype =='admin'){
						console.log('We find a admin user')
						typeMap.set('admin',result[i].numbOfRev)
						console.log(typeMap.size)
						
					}
					else if (result[i].usertype =='bot'){
						typeMap.set('bot',result[i].numbOfRev)
						console.log(typeMap.size)
					}
					else{
						console.log('We find a regular user')
						typeMap.set('regular',result[i].numbOfRev)
						console.log(typeMap.size)
					}
				
				}
				
				else{
					
					console.log("year are different")
					if (result[i].usertype =='anon'){
						console.log('We find a anon user')
						typeMap.set('anon',result[i].numbOfRev)
						console.log(typeMap.size)

					}

					else if (result[i].usertype =='admin'){

						console.log('We find a admin user')
						typeMap.set('admin',result[i].numbOfRev)
						console.log(typeMap.size)

					}
					else if (result[i].usertype =='bot'){
						console.log('We find a bot user')
						typeMap.set('bot',result[i].numbOfRev)
						console.log(typeMap.size)
					}

					else  {
						console.log('We find a regular user')
						typeMap.set('regular',result[i].numbOfRev)
						console.log(typeMap.size)
					}

					console.log("We are now checking do we have all 4 values in tempList")
					// Performing list  check
					console.log("Mapping size: "+typeMap.size)
					if(typeMap.size==4){
						var completeList = []
						var anonTemp = typeMap.get('anon')
						var adminTemp = typeMap.get('admin')
						var botTemp = typeMap.get('bot')
						var regularTemp = typeMap.get('regular')
						var year = tempYear
						completeList.push(year,adminTemp,anonTemp,botTemp,regularTemp)
							wholeList.push(completeList)
							
						console.log(wholeList)
						
					}
					
					else{
						console.log("We are filing for the missing type")
						var typeList = ['anon','admin','bot','regular']

						if (!typeMap.has('anon')){
							typeMap.set('anon',0)
							console.log("We found anon missing!")
						}						
						else if(!typeMap.has('admin')){
							typeMap.set('admin',0)
							console.log("We found admin missing!")
						}
						

						
						else if(!typeMap.has('bot')){
							typeMap.set('bot',0)
							console.log("We found bot missing")
						}
						else{
							typeMap.set('regular',0)
							console.log("We found regular missing")
						}

						
					
						}
					}
				}			


		// Ending point k = undefined, put last i into typeMap
		else{
			console.log("This is the last result we have to input: ",result[i])
			var type = result[i].usertype
			var number = result[i].numbOfRev
			typeMap.set(type, number)
			console.log(typeMap)
			console.log(typeMap.size)
			console.log('finish')
			if(typeMap.size==4){
				var completeList = []
				var anonTemp = typeMap.get('anon')
				var adminTemp = typeMap.get('admin')
				var botTemp = typeMap.get('bot')
				var regularTemp = typeMap.get('regular')
				var year = tempYear
				completeList.push(year,adminTemp,anonTemp,botTemp,regularTemp)
					wholeList.push(completeList)
					
				console.log(wholeList)
				
			}
			else{
				console.log("We are filing for the missing type")
						var typeList = ['anon','admin','bot','regular']
						
						if (!typeMap.has('anon')){
							typeMap.set('anon',0)
							console.log("We found anon missing!")
						}						
						else if(!typeMap.has('admin')){
							typeMap.set('admin',0)
							console.log("We found admin missing!")
						}
						

						
						else if(!typeMap.has('bot')){
							typeMap.set('bot',0)
							console.log("We found bot missing")
						}
						else{
							typeMap.set('regular',0)
							console.log("We found regular missing")
						}
			}

			}
	}
		console.log("Length of fullList", wholeList.length)
		console.log(wholeList)
		var data = google.visualization.arrayToDataTable(wholeList);
		var options = {
				'title':"A bar chart of revision number distribution by year and by user type",
				'width':1450,
				'height':650
		};
		var chart = new google.visualization.ColumnChart($("#function2BarChartSec")[0]);
		chart.draw(data, options);
		})
	});	




// Individual function Construct bar chart with range restriction 
	$("#function2FourthButton").click(function(){
		var newList =[]
		console.log("function2 Fourth Bttuon clicked");
		var user = $('#selectionBox').val();
		
		var bookTitle = $('#unumber3').val() ;
		var startYear = $('#fromRange').val();
		var endYear = $('#endRange').val()
		console.log("user we selected is: ",user);
		console.log(endYear)
		
			
			$.get('/BarChartTop5SelectedOneUser?bookTitle='+bookTitle+'&user='+user+'&from='+startYear+'&end='+endYear,function(result){
				console.log(result)
				var wholeList=[]
				var tempList=[]
				var length = result.length
				var yearSet = new Set();
				var typeMap = new Map();
				var year = startYear
				var yearInterval = parseInt(endYear)- parseInt(startYear)+1;
			
				// tempList=[];
				// wholeList.push(newList)
				var temp = ['year','numbOfRev',{ role: 'style' }]
				wholeList.push(temp)
				// Creating year set
					for (i=0;i<length;i++){
						yearSet.add(result[i].year)
					}

				
					for (k=0;k<yearInterval;k++){
						console.log(typeof year)
						year =year.toString();
						console.log(typeof year)
						var tempArray = []
						if(!yearSet.has(year)){
							console.log("year doesnt have the year")
							tempArray.push(year)
							tempArray.push(0)
							tempArray.push('color: rgb(255, 224, 224)')
							wholeList.push(tempArray)
							year++;
						}
						else{
							console.log("yearset found the year")
							for(i=0;i<length;i++){
								if(result[i].year==year){
									tempArray.push(result[i].year)
									tempArray.push(result[i].numbOfRev)
									tempArray.push('color: rgb(255, 224, 224)')
									console.log(tempArray)
									wholeList.push(tempArray)
									
								}
									
							}
							year++;
						}
					}
				
					console.log(wholeList)
					console.log(startYear)
					console.log(endYear)
					console.log(wholeList)

				
					var dataTable = new google.visualization.DataTable();
					var data = google.visualization.arrayToDataTable(wholeList);
					var options = {
				'title':"A bar chart of revision number distribution by specific user",
				'width':1450,
				'height':650,
				'colors':['rgb(255, 224, 224)']

					};
					var chart = new google.visualization.ColumnChart($("#function2BarChartSecRanged")[0]);
					chart.draw(data, options);

});
});
})


