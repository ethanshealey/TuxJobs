import React, { useState, useEffect } from "react";
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
import { getTimeSince, getTimeColorValue } from "../../CustomDate";

/**
 * 
 * JobCard
 * 
 * This component creates the job card to be swiped by the user.
 * 
 */

const JobCard = props => {

  return (
      <Box
      rounded="lg"
      overflow="hidden"
      width="80"
      height={props.height}
      shadow={1}
      _light={{ backgroundColor: 'white' }}
      _dark={{ backgroundColor: 'gray.700' }}
    >
      <Box>
        <AspectRatio ratio={16 / 9}>
          <Image
            source={{ uri: props.job.logo  }}
            fallbackSource={{ uri: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png' }}
            alt="image"
          />
        </AspectRatio>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="lg" ml="-1" isTruncated>
            {props.job.position}
          </Heading>
          <Divider />
          <Heading size="md" ml="-1">
            {props.job.company}
          </Heading>
          <Text fontSize="md" ml="-1">
            {props.job.location}
          </Text>
        </Stack>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text color="gray.500" fontWeight="400" style={{ color: getTimeColorValue(new Date(props.job.date)) }}>
              {getTimeSince(new Date(props.job.date))}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  )
}

export default JobCard
