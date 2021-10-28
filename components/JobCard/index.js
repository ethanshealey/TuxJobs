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
  Stack,
  Divider
} from 'native-base';
import { getTimeSince } from "../../CustomDate";

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
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="lg" ml="-1">
              {props.job.title}
            </Heading>
            <Divider />
            <Heading size="md" ml="-1">
              {props.job.company}
            </Heading>
            <Heading size="sm" ml="-1">
              {props.job.location}
            </Heading>
          </Stack>
          
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="gray.500" fontWeight="400">
                {getTimeSince(new Date(props.job.updated))}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    )
}

export default JobCard
