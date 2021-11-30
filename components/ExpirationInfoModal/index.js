import React from 'react'
import { Modal, ScrollView, Image, Text, Button, Divider, HStack, AspectRatio, VStack, Spacer } from 'native-base'

const ExpirationInfoModal = props => {
    return (
        <Modal
            size={'xl'}
            isOpen={props.isOpen}
            onClose={() => props.setIsOpen(false)}
        >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header><Text fontWeight="600" fontSize="xl" isTruncated maxW="300">Job Entry Expiration Information</Text></Modal.Header>
                <Modal.Body>
                    <Text>The jobs you have swiped on will automatically be removed after the chosen time.</Text>
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

export default ExpirationInfoModal
