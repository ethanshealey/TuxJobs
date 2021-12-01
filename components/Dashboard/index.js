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
import SettingsInfoModal from '../SettingsInfoModal'
import JobRatioModal from '../JobRatioModal'
import CatNapModal from '../CatNapModal'

/**
 * 
 * Dashboard
 * 
 * The main screen of the app, displayed once the user logs in.
 * 
 * Based on the selection of pages given in the Footer, this screen
 * will either show History, JobSwipe, or Settings.
 * 
 * This screen also contains the Modal for viewing a job.
 * 
 */

const Dashboard = props => {

    const [ id, setId ] = useState(1)
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ jobRatio, setJobRatio ] = useState(false)
    const [ catnap, setCatNap ] = useState(false)
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ selected, setSelected ] = useState(1)
    const [ currentJobs, setCurrentJobs ] = useState([])
    const [ jobs, setJobs ] = useState([])
    const [ showJobModal, setShowJobModal ] = useState(false)
    const [ modalJob, setModalJob ] = useState({})
    const [ expiration, setExpiration ] = useState(false)
    const [ showInfoModal, setShowInfoModal ] = useState(false)
    const [ settingsInfoModalHeader, setSettingsInfoModalHeader ] = useState('')
    const [ settingsInfoModalBody, setSettingsInfoModalBody ] = useState('')
    const [ showRatioModal, setShowRatioModal ] = useState(false)
    const [ratio, setRatio ] = useState('')
    const [ showCatNapModal, setShowCatNapModal ] = useState(false)

    // onload, get the current user's data
    useEffect(() => { getCurrentUser() }, [])

    // onload, get job board data from the APIs
    useEffect(() => { 
        getJoobleData(setJobs).then(getUsaJobsData(setJobs))
     }, [])

     useEffect(() => {
        if (expiration == 'two'){
            console.log('two')
        }
        else if (expiration == 'five'){
            console.log('five')
        }
        else if (expiration == 'ten'){
            console.log('ten')
        }
        else if (expiration == 'never'){
            console.log('never')
        }
     }, [expiration])

     useEffect(() => {
         if(currentJobs.length % 100 == 0){
            const disliked = currentJobs.filter(job=>!job.liked).length
            setRatio(parseInt((disliked/currentJobs.length) * 100) + '%')
            if (disliked / currentJobs.length > .8){
                setShowRatioModal(true) 
            }
         }
     },[currentJobs])

    useEffect(() => {
        setInterval(() => {setShowCatNapModal(true)}, 3.6 * Math.pow(10,6))
    },[])

    useEffect(() => {
        if (expiration !== 'never'){
            const current_date = new Date()
            let x = -1
            switch (expiration){
                case "two":
                    x = 2
                    break
                case "five":
                    x = 5
                    break
                case "ten":
                    x = 10
                    break
                default:
                    break
            }
            db.collection('Users').doc(id).update({
                jobs:currentJobs.filter(job=>job.date > (current_date-x))
            })
        }
    },[])

     // func to load user data from db
    const getCurrentUser = async () => {
        setIsLoaded(false)
        const data = await db.collection('Users').where('uid', '==', props.user.uid).get().then((qs) => {
            qs.forEach((doc) => {
                setId(doc.id)
                setUsername(doc.data().username)
                setEmail(doc.data().email)
                setCurrentJobs(doc.data().jobs)
                setExpiration(doc.data().expiration)
                console.log(doc.data().ratio_warning, doc.data().catnap)
                setRatio(doc.data().ratio_warning)
                setCatNap(doc.data().catnap)
            })
        })
        setIsLoaded(true)
    }

    // func to query the job board APIs
    const search = async (query, location) => {
        setIsLoaded(false)
        getJoobleData(setJobs, query, location).then(getUsaJobsData(setJobs, query, location)).then(() => {setIsLoaded(true)})
    } 

    // func to open and display a certain job
    const openJobModal = (job) => {
        setShowJobModal(true)
        setModalJob(job)
    }

    return (
        <>
            { isLoaded ? 
                <Box flex={1} bg="gray.100" safeAreaTop>
                    <JobModal job={modalJob} isOpen={showJobModal} setIsOpen={setShowJobModal} />
                    <SettingsInfoModal isOpen={showInfoModal} setIsOpen={setShowInfoModal} header={settingsInfoModalHeader} body={settingsInfoModalBody} />
                    <JobRatioModal isOpen={showRatioModal} setIsOpen={setShowRatioModal} ratio={ratio}/>
                    <CatNapModal isOpen={showCatNapModal} setIsOpen={setShowCatNapModal} ratio={ratio}/>
                    <HeaderBar />
                    <Center flex={1}>
                    { 
                        selected === 0 ? <History openJobModal={openJobModal} jobs={jobs} user={props.user} id={id} setCurrentJobs={setCurrentJobs} currentJobs={currentJobs}/> :
                        selected === 1 ? <JobSwipe openJobModal={openJobModal} search={search} jobs={jobs} currentJobs={currentJobs} setCurrentJobs={setCurrentJobs} setJobs={setJobs} user={props.user} userId={id} /> :
                        selected === 2 ? <Settings id={id} logout={props.logout} username={username} email={email} swipedJobs={currentJobs.length} setShowInfoModal={setShowInfoModal} setSettingsInfoModalHeader={setSettingsInfoModalHeader} setSettingsInfoModalBody={setSettingsInfoModalBody} jobRatio={jobRatio} catnap={catnap} setJobRatio={setJobRatio} setCatNap={setCatNap} setExpiration={setExpiration} expiration={expiration}/> : <>ERROR</>
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
