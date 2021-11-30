import React from 'react'
import { Modal, ScrollView, Image, Text, Button, Divider, HStack, AspectRatio, VStack, Spacer } from 'native-base'

const RatioWarningInfoModal = props => {
    return (
        <Modal
            size={'xl'}
            isOpen={props.isOpen}
            onClose={() => props.setIsOpen(false)}
        >
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header><Text fontWeight="600" fontSize="xl" isTruncated maxW="300">Swipe Ratio Warning Information</Text></Modal.Header>
                <Modal.Body>
                    <Text>The Swipe Ratio Warning option provides the user with a popup warning indicating the user has a recent swipe ratio of 80/20 disliked to liked ratio.</Text>
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

export default RatioWarningInfoModal
