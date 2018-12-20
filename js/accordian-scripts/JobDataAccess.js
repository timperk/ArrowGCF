// module that handles all sharepoint api calls
function JobData(Url) {

    this.Url = function () {
        return Url;
    }
    
    //given a job group and family, it will return all jobs.
    this.getJobTitles = function (jfgroup, jfamily) {
        var dfilter = "&$select=ID,CareerPath,Title,JobLevel&$top=1000&$orderby=JobLevel%20desc";

        dfilter += "&$filter=(JobFamilyGroup%20eq%20'" + jfgroup + "')%20and%20(JobFamily%20eq%20'" + jfamily + "')%20and%20(OData__ModerationStatus%20eq%200)";
        
        var gcfQueryUrl = Url + "/_api/web/lists/getbytitle('Job Descriptions')/items?" + dfilter;

        return $.ajax({
            url: gcfQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" }
        });
    };

    //given an id, it will return all the details.
    this.getJobDetail = function (id) {
        var dfilter = "&$select=CareerPath,Title,JobLevel,Accountabilities,Complexity,Experience"
             + "&$filter=(ID%20eq%20" + id + ")%20and%20(OData__ModerationStatus%20eq%200)";

        var gcfQueryUrl = Url + "/_api/web/lists/getbytitle('Job Descriptions')/items?" + dfilter;

        return $.ajax({
            url: gcfQueryUrl,
            method: "GET",
            headers: { "Accept": "application/json; odata=verbose" }
        });
    };

}