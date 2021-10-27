import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Icon,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack
} from 'native-base';

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
              source={{ uri: props.job.company.logoUrl ? props.job.company.logoUrl : 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png'}}
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
            {props.job.company.name}
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {props.job.title}
            </Heading>
          </Stack>
          <Text isTruncated noOfLines={7} fontWeight="400">
            {props.job.description}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="gray.500" fontWeight="400">
                {props.job.postedAt}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    )
}

export default JobCard
