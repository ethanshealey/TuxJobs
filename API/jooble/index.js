var url = "https://jooble.org/api/";
var key = "bbb588e7-a411-45bb-9236-8ad0a140e8a8";
var params = "{ keywords: 'it', location: 'North Carolina'}"

const getJoobleData = async (setJoobleJobs) => {
    var url = "https://jooble.org/api/";
    var key = "bbb588e7-a411-45bb-9236-8ad0a140e8a8";
    var params = "{ keywords: 'entry frontend', location: 'NC'}"

    //create xmlHttpRequest object
    var http = new XMLHttpRequest();
    //open connection. true - asynchronous, false - synchronous
    http.open("POST", url + key, true);

    //Send the proper header information
    http.setRequestHeader("Content-type", "application/json");
        
    //Callback when the state changes
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            const json = JSON.parse(http.responseText).jobs
            json.forEach(job => { 
                job.description = job.snippet.replace(/<\/?[^>]+(>|$)/g, "").replace('&nbsp;', '')
                job.snippet = null
            })
            setJoobleJobs(json)
        }
    }
    //Send request to the server
    http.send(params);

}

export { getJoobleData }