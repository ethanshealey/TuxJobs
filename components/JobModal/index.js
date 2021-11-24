import React, { useCallback } from 'react'
import {Alert, Linking} from 'react-native'
import { Modal, ScrollView, Image, Text, Button, Divider, HStack, AspectRatio, VStack, Spacer } from 'native-base'

/**
 * 
 * JobModal
 * 
 * This component creates a modal that displays a job's information.
 * 
 */

const JobModal = props => {

    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(props.job?.url);

        if (supported) {
            await Linking.openURL(props.job?.url);
        } else {
            Alert.alert(`Dont know how to open this URL: ${props.job?.url}`);
        }
    }, [props.job?.url])

    return (
        <Modal
            size={'xl'}
            isOpen={props.isOpen}
            onClose={() => props.setIsOpen(false)}
        >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header><Text fontWeight="600" fontSize="xl" isTruncated maxW="300">{props.job?.position} - {props.job?.company}</Text></Modal.Header>
                <Modal.Body>
                    <ScrollView isFullWidth>
                        <HStack>
                            <VStack>
                                <Text isTruncated maxW="250">Position: {props.job?.position}</Text>
                                <Text isTruncated maxW="250">Company: {props.job?.company}</Text>
                                <Text isTruncated maxW="250">Location: {props.job?.location}</Text>
                            </VStack>
                            <Spacer />
                            <AspectRatio ratio={1}>
                                <Image 
                                    source={{ uri: props.job?.logo }} 
                                    fallbackSource={{ uri: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png' }}
                                    alt="Logo"     
                                    borderRadius={10}                               
                                />
                            </AspectRatio>
                        </HStack>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                        <HStack>
                            <Text>{props.job?.description}</Text>
                        </HStack>
                    </ScrollView>
                </Modal.Body>
                <Modal.Footer>
                <Button.Group space={2}>
                    <Button
                        variant='ghost'
                        onPress={() => props.setIsOpen(false)}
                    >Cancel</Button>
                    <Button onPress = {handlePress} >Apply</Button>
                </Button.Group> 
            </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

export default JobModal
