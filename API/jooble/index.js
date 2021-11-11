
import JobObject from "../JobObject";

const getJoobleData = async (setJoobleJobs, query='', location='nc') => {
    var url = "https://jooble.org/api/";
    var key = "bbb588e7-a411-45bb-9236-8ad0a140e8a8";
    var params = `{ keywords: '${query}', location: '${location}'}`

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
            const jobs = []
            json.forEach((job) => { 
                const id = Date.now().toString(36) + Math.random().toString(36).substr(2)
                const joblisting = new JobObject(id, job.title, job.company, job.location, job.link, job.snippet, job.type, job.updated)
                jobs.push(JSON.parse(JSON.stringify(joblisting)))
            })
            setJoobleJobs(jobs)
        }
    }
    //Send request to the server
    http.send(params);

}

export { getJoobleData }