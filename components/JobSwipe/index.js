import React, { useState, useEffect, memo } from 'react'
import JobCard from '../JobCard'
import { HStack, Stack, Center, Text, Button, Pressable, IconButton, Spinner, Input, VStack } from 'native-base'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import { StyleSheet } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { db } from '../../firebase.js'

const JobSwipe = props => {

    const [ swiper, setSwiper ] = useState(null)
    const [ query, setQuery ] = useState('')
    const [ location, setLocation ] = useState('')

    useEffect(() => {
        props.currentJobs.forEach(job => {
            props.setJobs(prevJobs => prevJobs.filter(j => (j.position != job.position) && (j.company != job.company) && (j.date != job.date)))
        })
    }, [])

    useEffect(() => {
        db.collection('Users').doc(props.userId.toString()).update({
            jobs: [...props.currentJobs]
        })
    }, [props.currentJobs])

    const handleSwipe = async (job) => {
        props.setCurrentJobs(prevJobs => [ ...prevJobs, job ])
        console.log('added job', props.currentJobs.length)
    }

    const handleSwipeRight = async (job) => {
       job.liked = true
       handleSwipe(job)
    }

    const handleSwipeLeft = async (job) => {
        job.liked = false
        handleSwipe(job)
    }

    const onSearch = () => {
        // handle search
        props.search(query, location)
    }

    return (
        <Center flex={1} px={3}>
            <VStack space={1} alignItems="center" top="35">
                <Center w="323">
                    <Input onChangeText={(e) => setQuery(e)} bg="#ffffff" height="36px" marginTop="0px" placeholder="Search by title, skill, or company" isFullWidth/>
                </Center>
                <Center w="323">
                    <Input onChangeText={(e) => setLocation(e)} bg="#ffffff" height="36px" marginTop="3px" placeholder="Location" isFullWidth/>
                </Center>
                <Button style={{ borderRadius: 100, marginTop:8 }} bg="#3E76C9" onPress={onSearch} w="323" _text={{ color: '#ffffff' }} isFullWidth>Search</Button>
            </VStack>
            <CardStack style={styles.content} disableTopSwipe disableBottomSwipe ref={swiper => {setSwiper(swiper)}} renderNoMoreCards={() => <Spinner size="lg" />}>
                {props.jobs.map((job) => (
                    <Card key={job.id} onSwipedRight={() => handleSwipeRight(job)} onSwipedLeft={() => handleSwipeLeft(job)}>
                        <Pressable onPress={() => props.openJobModal(job)}>
                            <JobCard job={job} />
                        </Pressable>
                    </Card>
                ))}
            </CardStack>
            <HStack space={30} alignItems="center" marginBottom="4" marginTop="4">
                <IconButton bg="white" borderRadius="100" padding="3.5" 
                    icon={<AntDesign name="close" size={45} color="red"/>}
                    onPress={() => swiper.swipeLeft()}
                />
                <IconButton bg="white" borderRadius="100" padding="3.5" 
                    icon={<AntDesign name="check" size={45} color="green"/>}
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
        top: '5%'
    },
})

export default JobSwipe
