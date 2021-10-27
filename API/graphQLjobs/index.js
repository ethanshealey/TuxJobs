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
                applyUrl,
                company {
                    name,
                    logoUrl
                }
            }
        }
    `;

    let res = await request('https://api.graphql.jobs/', query)

    return res.jobs
}

export { getGraphQLJobs }