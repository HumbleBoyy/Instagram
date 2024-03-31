import { Avatar, AvatarGroup, Button, Flex,Text, VStack, useDisclosure } from '@chakra-ui/react'
import useAuthStore from '../../store/authStore'
import useUserProfileStore from '../../store/userProfileStore'
import EditProfile from './EditProfile'
import useFollowUser from '../../hooks/useFollowUser';

const ProfileHeader = () => {
  const {userProfile} = useUserProfileStore()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const authUser = useAuthStore((state)=> state.user)
  const {isUpdating, isFollowing, handleFollowUser} = useFollowUser(userProfile?.uid);
  const visitingOwnProfile = authUser && authUser.username === userProfile.username;
  const visitingStrangerProfile = authUser && authUser.username !== userProfile.username;
  return (
    <>
    <Flex  
         gap={{base:4, sm:10}} 
         py={10} 
         direction={{base:"column", sm:"row"}}
    >
      <AvatarGroup 
         size={{base:"xl", md:"2xl"}}
         justifySelf={'center'}
         mx={'auto'}
      
      >
        <Avatar size={"lg"}  src={userProfile.profilePicURL}/>
      </AvatarGroup>

      <VStack
        alignItems={'start'}
        gap={2}
        mx={'auto'}
        flex={1}
      >
        <Flex  
           gap={4}
           direction={{base:"column", sm:"row"}}
           justifyContent={{base:"center", sm:"flex-start"}}
           alignItems={'center'}
           w={"full"}
        >
           <Text
              fontSize={{base:"sm", md:"lg"}} 
           >
              {userProfile.username}
           </Text>

           {visitingOwnProfile && (
           <Flex
             gap={4}
             alignItems={'center'}
             justifyContent={'center'}
           >
              <Button
                bg={"white"}
                color={"black"}
                _hover={{base:"whiteAlpha.800"}}
                size={{base:"xs", md:"sm"}}
                onClick={onOpen}
              >
                  Edit Profile
              </Button>
           </Flex>
           )}
           
           {visitingStrangerProfile && (
           <Flex
             gap={4}
             alignItems={'center'}
             justifyContent={'center'}
           >
              <Button
                bg={"crimson"}
                color={"white"}
                _hover={{base:"whiteAlpha.800"}}
                size={{base:"xs", md:"sm"}}
                isLoading={isUpdating}
                onClick={handleFollowUser}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
           </Flex>
           )}
      </Flex>



      <Flex
        alignItems={'center'}
        gap={{base:2, sm:4}}
      >
         <Text fontSize={{base:"xs", md:"sm"}}>
            <Text 
                as="span"
                fontWeight={"bold"}
                mr={1}
            >{userProfile.posts.length}</Text>
            Posts
         </Text>
         <Text fontSize={{base:"xs", md:"sm"}}>
            <Text 
                as="span"
                fontWeight={"bold"}
                mr={1}
            >{userProfile.followers.length}</Text>
            Followers
         </Text>
         <Text fontSize={{base:"xs", md:"sm"}}>
            <Text 
                as="span"
                fontWeight={"bold"}
                mr={1}
            >{userProfile.following.length}</Text>
              Following
         </Text>
      </Flex>


      <Flex
        alignItems={'center'}
        gap={4}
      >
        <Text 
          fontSize={"sm"}
          fontWeight={"bold"}
        >{userProfile.fullName}
      </Text>
    </Flex>
    
    <Flex
        alignItems={'center'}
        gap={4}
      >
        <Text 
          fontSize={"sm"}
        >
          {userProfile.bio}
      </Text>
    </Flex>
</VStack>

{isOpen && <EditProfile isOpen={isOpen} onClose={onClose}/>}
</Flex>
</>
  )
}

export default ProfileHeader
