import React, { useState, useEffect } from 'react'
import { Box, Center, Button, Text, Link } from 'native-base'
import { db } from '../../firebase.js'

const Dashboard = props => {

    const [ id, setId ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ savedJobs, setSavedJobs ] = useState([])

    useEffect(() => {
        getCurrentUser()
    }, [])
    
    const getCurrentUser = async () => {
        const data = await db.collection('Users').where('uid', '==', props.user.uid).get().then((qs) => {
            qs.forEach((doc) => {
                setId(doc.id)
                setUsername(doc.data().username)
                setEmail(doc.data().email)
                setSavedJobs(doc.data().saved_jobs)
            })
        })
    }

    const addSavedJob = async () => {
        const newId = savedJobs.slice(-1)[0] ? savedJobs.slice(-1)[0].jobId + 1 : 0
        const ref = await db.collection('Users').doc(id).update({
            saved_jobs: [...savedJobs, { jobId: newId, jobURL: "https://google.com", jobName: "Job" }]
        })
        const uref = await getCurrentUser()
    }

    const removeSavedJob = async (jobId) => {
        const ref = await db.collection('Users').doc(id).update({
            saved_jobs: savedJobs.filter((job) => job.jobId !== jobId)
        })
        const uref = await getCurrentUser()
    }

    return (
        <Center flex={1} px="3">
            <Text fontSize="xl">Welcome, {username}!</Text>
            <Button onPress={addSavedJob}>Save Job</Button>
            { savedJobs.map((job) => (
                <>
                    <Text>{job.jobName}</Text>
                    <Link onPress={() => removeSavedJob(job.jobId)}>Remove</Link>
                </>
            )) }
            <Button onPress={props.logout}>Logout</Button>
        </Center>
    )
}

export default Dashboard
