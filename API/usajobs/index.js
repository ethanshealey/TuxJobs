import JobObject from "../JobObject";

const getUsaJobsData = async (setJobs, query='', location='nc') => {

    var host = 'data.usajobs.gov';  
    var userAgent = 'ethan.shealey@gmail.com';  
    var authKey = 'S+3Xw+18mNeDlAx729JfL5NKBqmWoGOrr6b8HEkw8sM=';    

    fetch(`https://data.usajobs.gov/api/search?Keyword=${query}&LocationName=${location}`, {  
        method: 'GET',      
        headers: {          
            "Host": host,          
            "User-Agent": userAgent,          
            "Authorization-Key": authKey      
        }  
    }).then(res => res.json())
      .then(data => {
          const jobs = []
          data.SearchResult.SearchResultItems.forEach(job => {
              const id = Date.now().toString() + Math.random().toString().substr(2)
              const logo = 'https://logo.clearbit.com/' + job.MatchedObjectDescriptor.OrganizationName.replaceAll(' ', '') + '.com?size=500'
              const desc = 'Press apply for more details...' //job.MatchedObjectDescriptor.PositionFormattedDescription[0].LabelDescription
              const joblisting = new JobObject(id, job.MatchedObjectDescriptor.PositionTitle, job.MatchedObjectDescriptor.OrganizationName, job.MatchedObjectDescriptor.PositionLocation.length > 1 ? 'Multiple Locations' : job.MatchedObjectDescriptor.PositionLocation[0]?.name, job.MatchedObjectDescriptor.PositionURI, desc, job.MatchedObjectDescriptor.PositionSchedule[0].Name, job.MatchedObjectDescriptor.PublicationStartDate, logo)
              jobs.push(JSON.parse(JSON.stringify(joblisting)))
          })
          setJobs(prevJobs => [...prevJobs, ...jobs])
    })

}

export { getUsaJobsData }