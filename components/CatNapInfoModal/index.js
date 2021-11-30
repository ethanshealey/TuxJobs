import React from 'react'
import { Modal, ScrollView, Image, Text, Button, Divider, HStack, AspectRatio, VStack, Spacer } from 'native-base'

const CatNapInfoModal = props => {
    return (
        <Modal
            size={'xl'}
            isOpen={props.isOpen}
            onClose={() => props.setIsOpen(false)}
        >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header><Text fontWeight="600" fontSize="xl" isTruncated maxW="300">Cat Nap Information</Text></Modal.Header>
                <Modal.Body>
                    <Text>We will send a popup reminder every 60 minutes of swiping to take a mental health break!</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button.Group space={2}>
                    <Button onPress={() => props.setIsOpen(false)} style={{backgroundColor: "#3E76C9"}}>Close</Button>
                </Button.Group> 
            </Modal.Footer>
            </Modal.Content>
        </Modal>
    )
}

export default CatNapInfoModal
