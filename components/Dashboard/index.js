import React, { useState, useEffect } from 'react'
import { Box, Center, Button, Text, Link, Spinner } from 'native-base'
import { db } from '../../firebase.js'

const Dashboard = props => {

    const [ id, setId ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ savedJobs, setSavedJobs ] = useState([])
    const [ isLoaded, setIsLoaded ] = useState(false)

    useEffect(() => {
        getCurrentUser()
    }, [])
    
    const getCurrentUser = async () => {
        setIsLoaded(false)
        const data = await db.collection('Users').where('uid', '==', props.user.uid).get().then((qs) => {
            qs.forEach((doc) => {
                setId(doc.id)
                setUsername(doc.data().username)
                setEmail(doc.data().email)
                setSavedJobs(doc.data().saved_jobs)
            })
        })
        setIsLoaded(true)
    }

    const addSavedJob = async () => {
        const newId = savedJobs.slice(-1)[0] ? savedJobs.slice(-1)[0]?.jobId + 1 : 0
        const newJob = {
            jobId: newId,
            jobUrl: "https://www.google.com",
            jobName: "Job " + newId
        }
        const ref = await db.collection('Users').doc(id).update({
            saved_jobs: [...savedJobs, newJob]
        })
        setSavedJobs([ ...savedJobs, newJob ])
    }

    const removeSavedJob = async (jobId) => {
        const ref = await db.collection('Users').doc(id).update({
            saved_jobs: savedJobs.filter((job) => job.jobId !== jobId)
        })
        setSavedJobs(savedJobs.filter((job) => job.jobId !== jobId))
    }

    return (
        <Center flex={1} px="3">
            { isLoaded ? 
                <>
                    <Text fontSize="xl">Welcome, {username}!</Text>
                    <Button onPress={addSavedJob}>Save Job</Button>
                    { savedJobs.map((job) => (
                        <Box key={job.jobId}>
                            <Text>{job.jobName}</Text>
                            <Link onPress={() => removeSavedJob(job.jobId)}>Remove</Link>
                        </Box>
                    )) }
                    <Button onPress={props.logout}>Logout</Button>
                </>
                :
                <Spinner size="lg" />
            }
        </Center>
    )
}

export default Dashboard
