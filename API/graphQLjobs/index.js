import { request } from 'graphql-request' 

const getGraphQLJobs = async () => {

    const query = `
        query {
            jobs {
                id,
                title,
                cities {
                    name
                }
                countries {
                    name
                }
                remotes {
                    name
                }
                tags {
                    name
                    }
                postedAt,
                description,
                company {
                    name
                }
            }
        }
    `;

    request('https://api.graphql.jobs/', query)
        .then(console.log)



}

export { getGraphQLJobs }