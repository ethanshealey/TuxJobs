import React, { useState, useEffect, memo } from 'react'
import JobCard from '../JobCard'
import { HStack, Stack, Center, Text, Button, Pressable, IconButton, Spinner, Input, VStack } from 'native-base'
import CardStack, { Card } from 'react-native-card-stack-swiper'
import { StyleSheet } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { db } from '../../firebase.js'

const JobSwipe = props => {

    // set up states
    const [ swiper, setSwiper ] = useState(null)
    const [ query, setQuery ] = useState('')
    const [ location, setLocation ] = useState('')

    // filter out previously viewed jobs
    useEffect(() => {
        props.currentJobs.forEach(job => {
            props.setJobs(prevJobs => prevJobs.filter(j => (j.position != job.position) && (j.company != job.company) && (j.date != job.date)))
        })
    }, [])

    // reassign jobs object in db every time currentJobs changes
    useEffect(() => {
        db.collection('Users').doc(props.userId).update({
            jobs: [...props.currentJobs]
        })
    }, [props.currentJobs])

    // handle swiping in any direction
    const handleSwipe = async (job) => {
        props.setCurrentJobs(prevJobs => [ ...prevJobs, job ])
    }

    // 
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
            <VStack space={1} alignItems="center" style={styles.container}>
                <VStack space={1} alignItems="center">
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
                        <Card key={job.id} height="100%" onSwipedRight={() => handleSwipeRight(job)} onSwipedLeft={() => handleSwipeLeft(job)}>
                            <Pressable onPress={() => props.openJobModal(job)}>
                                <JobCard job={job} />
                            </Pressable>
                        </Card>
                    ))}
                </CardStack>
                <HStack space={30} alignItems="center">
                    <IconButton bg="white" borderRadius="100" padding="3.5" 
                        icon={<AntDesign name="close" size={45} color="red"/>}
                        onPress={() => swiper.swipeLeft()}
                    />
                    <IconButton bg="white" borderRadius="100" padding="3.5" 
                        icon={<AntDesign name="check" size={45} color="green"/>}
                        onPress={() => swiper.swipeRight()}
                    />
                </HStack>
            </VStack>
        </Center>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingTop: 20,
        paddingBottom: 20
    },
    content: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default JobSwipe
