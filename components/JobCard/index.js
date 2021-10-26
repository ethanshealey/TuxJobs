import React from "react";
import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider
} from 'native-base';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const JobCard = props => {
    return (
        <Box
        rounded="lg"
        overflow="hidden"
        width="72"
        shadow={1}
        _light={{ backgroundColor: 'gray.50' }}
        _dark={{ backgroundColor: 'gray.700' }}
      >
        <Box>
          <AspectRatio ratio={16 / 9}>
            <Image
              source={{
                uri:
                  'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="violet.500"
            _text={{ color: 'white', fontWeight: '700', fontSize: 'xs' }}
            position="absolute"
            bottom={0}
            px="3"
            py="1.5"
          >
            {props.job.company}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {props.job.role}
            </Heading>
          </Stack>
          <Text fontWeight="400">
            This job needs 16 years+ of experience. In order to job at this job, you must have experience in the field of job.
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="gray.500" fontWeight="400">
                6 mins ago
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    )
}

export default JobCard
