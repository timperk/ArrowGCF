'use strict';
var SPWebUrl;

$(document).ready(function () {

    SPWebUrl = _spPageContextInfo.webServerRelativeUrl; //getting current site url

    var jData = new JobData(SPWebUrl); //initalize the data api
    
    $.when(jData.getJobTitles("Marketing","General Marketing")).done(function (jobs) { // when the ajax call is done
        var i;
        for (i = 0; i < jobs.d.results.length; i += 1) { //loop though json returned from server
            var item = jobs.d.results[i];
            // dynamically creating html - div with button and details
            $('#results').append("<div class='row'>" +
            "<button id='" + item.ID + "' onClick='ShowDetail(event,this.id)' class='accordion'>" + "<span class='show_hide'></span>" + item.Title + "<span class='mgr ic'>" + "(" + item.CareerPath + ")" + "</span>" +  "<span class='job-level-right'>" + "  Level " + item.JobLevel + "</span>" + "</button>" +
            "<div class='jobdetail'><h5>Principal Accountabilities</h5><div class='acb'></div><br /><br /><h5>Job Complexity</h5><div class='comp'></div><br /><br /><h5>Experience / Education</h5><div class='exp'></div></div></div>");
        }
    }).fail(function (data, errorCode, errorMessage) {
        console.log(errorMessage); // just logging to console. create your own error processing.
    });
});

//button click event
function ShowDetail(event, id) {
    event.preventDefault();

    var jData = new JobData(SPWebUrl);

    $.when(jData.getJobDetail(id)).done(function (detail) { // ajax call to get job detail by id.
        var item = detail.d.results[0];
        $('#' + id).next(".jobdetail").find(".acb").html(item.Accountabilities);
        $('#' + id).next(".jobdetail").find(".comp").html(item.Complexity);
        $('#' + id).next(".jobdetail").find(".exp").html(item.Experience);
        
        $('#' + id).find(".show_hide").toggleClass("minus");

        $('#' + id).next(".jobdetail").slideToggle();
    }).fail(function (data, errorCode, errorMessage) {
        console.log(errorMessage); // just logging to console. create your own error processing.
    });

   
}