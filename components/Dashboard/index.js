import React, { useState, useEffect } from 'react'
import { Box, Header, Center, Button, Text, Link, Spinner } from 'native-base'
import { db } from '../../firebase.js'
import JobCard from '../JobCard'
import Footer from '../Footer'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import JobSwipe from '../JobSwipe'
import HeaderBar from '../HeaderBar'
import History from '../History'
import Settings from '../Settings'
import { getJoobleData } from '../../API/jooble'
import { getUsaJobsData } from '../../API/usajobs'
import JobModal from '../JobModal'

const Dashboard = props => {

    const [ id, setId ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ selected, setSelected ] = useState(1)
    const [ currentJobs, setCurrentJobs ] = useState([])
    const [ jobs, setJobs ] = useState([])
    const [ showJobModal, setShowJobModal ] = useState(false)
    const [ modalJob, setModalJob ] = useState({})

    // onload, get the current user's data
    useEffect(() => { getCurrentUser() }, [])

    useEffect(() => { 
        getJoobleData(setJobs).then(getUsaJobsData(setJobs))
     }, [])

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

    const search = async (query, location) => {
        setIsLoaded(false)
        getJoobleData(setJobs, query, location).then(getUsaJobsData(setJobs, query, location)).then(() => {setIsLoaded(true)})
    } 

    const openJobModal = (job) => {
        setShowJobModal(true)
        setModalJob(job)
    }

    return (
        <>
            { isLoaded ? 
                
                <Box flex={1} bg="gray.100" safeAreaTop>
                    <JobModal job={modalJob} isOpen={showJobModal} setIsOpen={setShowJobModal} />
                    <HeaderBar />
                    <Center flex={1}>
                    { 
                        selected === 0 ? <History openJobModal={openJobModal} jobs={jobs} user={props.user} id={id} setCurrentJobs={setCurrentJobs} currentJobs={currentJobs}/> :
                        selected === 1 ? <JobSwipe openJobModal={openJobModal} search={search} jobs={jobs} currentJobs={currentJobs} setCurrentJobs={setCurrentJobs} setJobs={setJobs} user={props.user} userId={id} /> :
                        selected === 2 ? <Settings logout={props.logout} username={username} email={email} swipedJobs={currentJobs.length} /> : <>ERROR</>
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
