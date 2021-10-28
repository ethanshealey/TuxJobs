import React, { useState, useEffect, memo } from 'react'
import JobCard from '../JobCard'
import { HStack, Stack, Center, Text, Button, IconButton, Spinner } from 'native-base'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { db } from '../../firebase.js'

const JobSwipe = props => {

    const [ swiper, setSwiper ] = useState(null)

    useEffect(() => {
        props.currentJobs.forEach(job => {
            props.setJobs(prevJobs => prevJobs.filter(j => j.id !== job.id))
        })
    }, [])

    const handleSwipe = async (job) => {
        db.collection('Users').doc(props.userId.toString()).update({
            jobs: [...props.currentJobs, job]
        }).then(() => {
            props.setCurrentJobs(prevJobs => [ ...prevJobs, job ])
        })
    }

    const handleSwipeRight = async (job) => {
       job.liked = true
       handleSwipe(job)
    }

    const handleSwipeLeft = async (job) => {
        job.liked = false
        handleSwipe(job)
    }

    return (
        <Center flex={1} px={3}>
            <CardStack style={styles.content} disableTopSwipe disableBottomSwipe ref={swiper => {setSwiper(swiper)}} renderNoMoreCards={() => <Spinner size="lg" />}>
                {props.jobs.map((job) => (
                    <Card key={job.id} onSwipedRight={() => handleSwipeRight(job)} onSwipedLeft={() => handleSwipeLeft(job)}>
                        <JobCard job={job} key={job.id} />
                    </Card>
                ))}
            </CardStack>
            <HStack space={3} alignItems="center">
                    <IconButton
                        icon={<Ionicons name="md-close-circle-sharp" size={60} color="red"/>}
                        onPress={() => swiper.swipeLeft()}
                    />
                    <IconButton
                        icon={<Ionicons name="checkmark-circle" size={60} color="green"/>}
                        onPress={() => swiper.swipeRight()}
                    />
            </HStack>
        </Center>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
        top: '10%'
    },
})

export default JobSwipe
