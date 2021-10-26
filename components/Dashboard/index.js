import React, { useState, useEffect } from 'react'
import { Box, Header, Center, Button, Text, Link, Spinner } from 'native-base'
import { db } from '../../firebase.js'
import JobCard from '../JobCard'
import CardStack, { Card } from 'react-native-card-stack-swiper';

const Dashboard = props => {

    const [ hasRan, setHasRan] = useState(false)
    const [ id, setId ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ jobs, setJobs ] = useState([])
    const [ isLoaded, setIsLoaded ] = useState(false)
    const [ swiper, setSwiper ] = useState(null)

    // onload, get the current user's data
    useEffect(() => {
        getCurrentUser()
    }, [])

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
    }, [jobs])

    let jobList = [ 
        {id: 1, company: 'Amazon', role: 'Software Engineer'},
        {id: 2, company: 'IBM', role: 'Software Engineer'},
        {id: 3, company: 'Google', role: 'Frontend Developer'},
        {id: 4, company: 'Twitch', role: 'Software Engineer'},
        {id: 5, company: 'Microsoft', role: 'Software Engineer'}
    ]

    const getCurrentUser = async () => {
        setIsLoaded(false)
        const data = await db.collection('Users').where('uid', '==', props.user.uid).get().then((qs) => {
            qs.forEach((doc) => {
                setId(doc.id)
                setUsername(doc.data().username)
                setEmail(doc.data().email)
                setJobs(doc.data().jobs)
            })
        })
        setIsLoaded(true)
    }

    const handleSwipe = (didLike) => {
        const current_job = jobList[0]
        current_job.liked = didLike
        jobList = jobList.splice(1)
        setJobs(prevJobs => [...prevJobs, current_job])
    }

    const handleSwipeRight = () => {
        handleSwipe(true)
    }

    const handleSwipeLeft = () => {
        handleSwipe(false)
    }

    return (
        <>
            { isLoaded ? 
                <>
                    <CardStack disableTopSwipe disableBottomSwipe ref={swiper => {setSwiper(swiper)}}>
                    { jobList.map((job) => (
                        <Card key={job.id} onSwipedRight={() => handleSwipeRight()} onSwipedLeft={() => handleSwipeLeft()}>
                            <JobCard job={job} />
                        </Card>
                    )) }
                    </CardStack>
                    <Button onPress={() => { swiper.swipeLeft() }}>Dont Like</Button>
                    <Button onPress={() => { swiper.swipeRight() }}>Like</Button>
                </>
                :
                <Spinner size="lg" />
            }
        </>
    )
}

export default Dashboard
