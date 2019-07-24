



$(document).ready(function(){
    
    $("#OverallButton").on('click',function(event){
        
        
        $.ajax({
          type : 'GET',
          url : '/function1',
          success: function(data){
            $("#resultBox").html(data);
            
          }
          
        });
        
    });

    $("#IndividualButton").on('click',function(event){
        
    
        $.ajax({
          type : 'GET',
          url : '/function2',
          success: function(data){
            $("#resultBox").html(data);
            
          }
          
        });
        
    });
    $("#AuthorButton").on('click',function(event){
        

        $.ajax({
          type : 'GET',
          url : '/function3',
          success: function(data){
            $("#resultBox").html(data);
            
          }
          
        });
        
    });

        
    
    $("#function1Button").click(function(){
    console.log("function1 button clicked")
    var number = $('#unumber').val();
    var parameters = {number: $('#unumber').val() };
    $.get('/function1/getTopNumberArticleRevised', parameters,function(result) {
        
        console.log(result)
        $("#function1ResultBox").append('<p>',number, ' articles with most users revised: ')
        for (i=0;i<number;i++){
            $("#function1ResultBox").append('<p>', 'Revision name: ',result[i]._id, '<br></br>','Numbers of Revisions: ', result[i].numOfRevisions, '</p>')
        }
        
});
});



    $("#function1SecondButton").click(function(){
    console.log('function2 button clicked')
    var number2 = $('#unumber2').val();
    console.log(number2)
    var parameters = {number: $('#unumber2').val() };
    $.get('/function1/getLessNumberArticleRevised', parameters, function(result2) {
        
        
        console.log("This is a test")
        console.log(result2[0]._id,result2[0].numOfRevisions)
        $("#function2ResultBox").append('<p>',number2, ' articles with less users revised: ')
        for (i=0;i<number2;i++){
            $("#function2ResultBox").append('<p>', result2[i]._id, '<br></br>','Numbers of Revisions: ', result2[i].numOfRevisions, '</p>')
        }
    
});
});

$("#function1ThirdButton").click(function(){

    $.get('/function1/getUniqueNumberUserLargest',  function(result) {
    console.log("This is in mainpage:",result[0].count)
    $("#function3ResultBox").append('<p>','Name of revision: ', result[0]._id, '</p>')
    $("#function3ResultBox").append('<p>', 'Number of revision: ',result[0].count, '</p>')
});
});

$("#function1FourButton").click(function(){
    
    $.get('/function1/getUniqueNumberUserLowest', function(result) {
    $("#function4ResultBox").append('<p>', 'Name of revision: ',result[0]._id, '</p>')
    
    $("#function4ResultBox").append('<p>', 'Number of revision: ', result[0].count, '</p>')
    
});
});

$("#function1FifthButton").click(function(){
    var number =2;
    $.get('/function1/getLongestArticle', function(result) {
    $("#function5ResultBox").append('<p>',number, ' articles with longest history: ','</p>')
    for (i=0;i<number;i++){
        $("#function5ResultBox").append('<p>', result[i]._id, '<br></br>','Timestamp: ', result[i].timestamp, '</p>')
    }        
});
});

$("#function1SixthButton").click(function(){

    var number = 2;
    $.get('/function1/getShortestArticle', function(result) {
    $("#function6ResultBox").append('<p>',number, ' articles with shortest history: ','</p>')
    for (i=0;i<number;i++){
        $("#function6ResultBox").append('<p>', result[i]._id, '<br></br>','Timestamp: ', result[i].timestamp, '</p>')
    }        
});
});



$("#function2FirstButton").click(function(){
    console.log('function2 clicked')
    var revisionTitle = $('#unumber3').val();
    var parameters = {title: $('#unumber3').val() };
    console.log(parameters);
    var tempString ='['
    $("#IndiFunction1ResultBox").append('<p>','Revision title: ',revisionTitle, '</p>')
    $.get('/function2/getTotalNoOfRevision', parameters, function(result) {   
        $("#IndiFunction1ResultBox").append('<p>','Total number of revision: ',result[0].numOfRevisions, '</p>')
    
});
    var limit =5;
    $.get('/function2/getTop5RegularUsers',parameters, function(result2){
        var length = result2.length
        if (length >= 5){
            limit =5;
        }
        else{
            limit = result2.length
        }
        console.log(limit)
        for (i=0;i<limit;i++){
        optionID = 'option'+i
        var id = 'authorName'+i
        appendString = "<option id='"+optionID+"'>"+result2[i]._id+"</option>"
        $("#selectionBox").append(appendString)
        $("#IndiFunction1ResultBox").append('<p id="'+id+'">',"Author(user): ",result2[i]._id, '</p>')
        $("#IndiFunction1ResultBox").append('<p>','Number of revision involved: ',result2[i].numOfRevisionsByParticularUser, '</p>')
        
        tempString = tempString 
        if(i != limit-1){
        tempString= tempString + '"'+result2[i]._id+'"'+',';
            }
            else{
                tempString = tempString + '"'+result2[i]._id+'"]';
            }
        }
        
        console.log(tempString)
        // $("#UniqueNumberAuthor").append(limit)
        // $("#Top5AuthorList").append(tempString)
    })
    })



    $("#function3FirstSubmitButton").click(function(){
    
    console.log("function3FirstButton");
    var authorName = $('#unumber4').val();
    var parameters = {authorTitle: $('#unumber4').val()};
    var parametersList = []
    var LengthList = []
    
    $.get('/function3/getAuthorInfo', parameters, function(result) {
    var length = result.length
    console.log(length)
    for (i = 0; i <length ; i++) {
        optionID = 'option'+i
        noOfRevisionID = 'dropdown'+i
        blankLine = 'blank'+i
        $("#Fun3QuerySec1").append('<p>',result[i]._id, '<br id='+blankLine+'>','</p>')
        $("#Fun3QuerySec1").append("<p id='"+noOfRevisionID+"'>",'The number of revision: ',result[i].numOfRevisions,'</p>')
        appendString = "<option id='"+optionID+"'>"+result[i]._id+"</option>"
        
        $("#selectID").append(appendString)
        

        title = result[i]._id;
        var parameters2 = {authorTitle: authorName,
            bookTitle: title};
        
        LengthList.push(result[i].numOfRevisions);
        parametersList.push(parameters2);
        lengthOfNumOfRevisions = result[i].numOfRevisions;
        console.log(title)
        console.log("The parameters are: ",parameters2)
        console.log("The length for parameters are: ",lengthOfNumOfRevisions)
        console.log("Double check the number", lengthOfNumOfRevisions)
        
    }
    for (i=0;i< length;i++){
    
        console.log(i+" of parametersList: ",parametersList[i])
        console.log(i+" of LengthList: ",LengthList[i])
       
    }
    })
        
})

$("#function3ThirdButton").click(function(){
    var authorName = $('#unumber4').val();
    var revisionName = $('#selectID').val();
    var authorName = authorName.toString()
    var no = 0;


    $.get("/function3/getIndividualNumberOfRevision?authorName="+ authorName+"&bookTitle="+ revisionName,function(result1){
        
        $("#selectID2").append("<p id='numberSection' style='display:inline'>Number of revision is: </p>",'<strong id="TotalNumberOfRevision">'+result1[0].TotalnumOfRevisions+'</strong>')
        no = document.getElementById('TotalNumberOfRevision').textContent;
        
    })
    $.get("/function3/displayAllTimeStamp?authorName="+ authorName+"&bookTitle="+ revisionName,function(result1){
        $("#unumber5").append("All timestamp: ")
        $("#unumber5").append("<br></br> ")
        for (i=0;i<no;i++){
            $("#unumber5").append(result1[i]._id)
            $("#unumber5").append('<br></br>')
        }
    
    
});



})})
