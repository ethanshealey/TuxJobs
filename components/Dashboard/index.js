import React, { useState, useEffect } from 'react'
import { Box, Header, Center, Button, Text, Link, Spinner } from 'native-base'
import { db } from '../../firebase.js'
import JobCard from '../JobCard'
import Footer from '../Footer'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import JobSwipe from '../JobSwipe'
import { getGraphQLJobs } from '../../API/graphQLjobs/index.js'
import HeaderBar from '../HeaderBar'

const Dashboard = props => {

    const [ id, setId ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ selected, setSelected ] = useState(1)
    const [ currentJobs, setCurrentJobs ] = useState([])
    const [ jobs, setJobs ] = useState([])

    // onload, get the current user's data
    useEffect(() => {
        getCurrentUser()
    }, [])

    /*
    // if `jobs` changed, update the database
    useEffect(() => {
        const updateJobs = async () => {
            const ref = await db.collection('Users').doc(id.toString()).update({
                jobs: [...jobs]
            })
        }
        if(hasRan) {
            updateJobs()
        }
        setHasRan(true)
    }, [jobs])*/

    useEffect(() => {
        getGraphQLJobs().then(d => { setJobs(d) })
    }, [])

    useEffect(() => {
        currentJobs.forEach((job) => {
            setJobs(jobs.filter((j) => j.id !== job.id))
        })
    }, [currentJobs])
  
    const getCurrentUser = async () => {
        setIsLoaded(false)
        const data = await db.collection('Users').where('uid', '==', props.user.uid).get().then((qs) => {
            qs.forEach((doc) => {
                setId(doc.id)
                setUsername(doc.data().username)
                setEmail(doc.data().email)
                setCurrentJobs(doc.data().jobs)
            })
        })
        setIsLoaded(true)
    }

    const filterJobs = async () => {
        const ref = await db.collection('Users').where('uid', '==', props.user.uid).get().then((res) => {
            res.forEach((doc) => {
                setCurrentJobs(doc.data().jobs)
            })
        })
    /*
        currentJobs.forEach((job) => {
            setJobs(jobs.filter((j) => j.id !== job.id))
        })*/
    }

    return (
        <>
            { isLoaded ? 
                
                <Box flex={1} bg="white" safeAreaTop>
                    <HeaderBar />
                    <Center flex={1}>
                    { 
                        selected === 0 ? <>History</> :
                        selected === 1 ? <JobSwipe jobs={jobs} filterJobs={filterJobs} currentJobs={currentJobs} setCurrentJobs={setCurrentJobs} setJobs={setJobs} user={props.user} userId={id} /> :
                        selected === 2 ? <>Settings</> : <>ERROR</>
                    }
                    </Center>
                    <Footer selected={selected} setSelected={setSelected} />
                </Box>
                :
                <Center flex={1} px="3">
                    <Spinner size="lg" />
                </Center>
            }
        </>
    )
}

export default Dashboard
