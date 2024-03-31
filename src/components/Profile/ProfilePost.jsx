import { Flex, GridItem, Text, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Box, Avatar, Divider, VStack, Button } from '@chakra-ui/react'
import {AiFillHeart} from "react-icons/ai"
import {FaComment} from "react-icons/fa"
import {MdDelete} from "react-icons/md"
import Comment from '../Comment/Comment'
import PostFooter from '../FeedPosts/PostFooter'
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from '../../store/authStore'
import useShowToast from "../../hooks/useShowToast"
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from 'react'
import usePostStore from '../../store/postStore'
import Caption from '../Comment/Caption'
import useLikePost from '../../hooks/useLikePost'


const ProfilePost = ({post}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userProfile = useUserProfileStore((state)=> state.userProfile)
    const authUser = useAuthStore((state)=> state.user)
    const showToast = useShowToast()
    const [isDeleting, setIsDeleting] = useState(false)
    const deletePost = usePostStore((state)=> state.deletePost)
    const decrementPostsCount = useUserProfileStore((state)=> state.deletePost)
    const { isLiked, likes, handleLikePost, isUpdating } = useLikePost(post)
    
    const handleDeletePost = async () => {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      if (isDeleting) return;
  
      try {
        const imageRef = ref(storage, `posts/${post.id}`);
        await deleteObject(imageRef);
        const userRef = doc(firestore, "users", authUser.uid);
        await deleteDoc(doc(firestore, "posts", post.id));
  
        await updateDoc(userRef, {
          posts: arrayRemove(post.id),
        });
  
        deletePost(post.id);
        decrementPostsCount(post.id);
        showToast("Success", "Post deleted successfully", "success");
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsDeleting(false);
      }
    }


  return (

    <>
    <GridItem
      cursor={'pointer'}
      overflow={'hidden'}
      borderRadius={5}
      border={'1px solid'}
      borderColor={'whiteAlpha.300'}
      position={'relative'}
      aspectRatio={1/1}
      onClick={onOpen}
    >
      <Flex
         opacity={0}
         _hover={{opacity:1}}
         position={"absolute"}
         top={0}
         left={0}
         right={0}
         bottom={0}
         bg={"blackAlpha.700"}
         transition={"all 0.3s ease-in-out"}z
         zIndex={1}
         height={'auto'}
         justifyContent={'center'}
      >  
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        gap={50}
      >
       <Flex>
          <AiFillHeart size={20}/>
          <Text fontSize={"bold"} ml={2}>{likes}</Text>
       </Flex>

       <Flex>
         <FaComment size={20}/>
          <Text fontSize={"bold"} ml={2}>{post.comments.length}</Text>
       </Flex>
      </Flex>
      </Flex>

      <Image src={post.imageURL} alt="ProfilePost" w={"100%"}  height={"auto"}/>
    </GridItem>

     <Modal isOpen={isOpen} onClose={onClose}
        isCentered={true}
        size={{base:"3xl", md:"5xl"}}
     >
       <ModalOverlay />
       <ModalContent>
         <ModalCloseButton />
         <ModalBody bg={"black"} pb={5}>

             <Flex gap={4} w={{base:"90%", sm:"70%", md:"full"}} mx={'auto'}>
                   <Box
                      borderRadius={5}
                      overflow={'hidden'}
                      border={"1px solid greeb"}
                      borderColor={"whiteAlpha.300"}
                      flex={1.5}
                   >
                       <Image src={post.imageURL} alt='Profile post'/>
                   </Box>
                   
                   <Flex
                     flex={1}
                     flexDirection={"column"}
                     px={10}
                     display={{base:"none", md:"flex"}}
                   >

                    <Flex
                     alignItems={'center'}
                     justifyContent={'space-between'}
                     gap={4}
                     mt={1}
                    >

                    
                    <Flex 
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      gap={4}
                    >
                      <Avatar 
                         src={userProfile.profilePicURL} 
                         alt= "User"
                         size={"sm"}
                         name={userProfile.username}
                      />
                      <Text
                        fontWeight={"bold"}
                        fontSize={12}
                      >
                        {userProfile.username}
                      </Text>
                    </Flex>

                    {authUser?.uid === userProfile.uid && (
                        <Button
                        size={"sm"}
                          _hover={{bg:"whiteAlpha.300", color:"red.600"}}
                          borderRadius={5}
                          p={1}
                          isLoading={isDeleting}
                          onClick={handleDeletePost}
                        >
                            <MdDelete size={20} cursor={'pointer'}/>
                        </Button>
                    )}
                    </Flex>
                    <Divider my={4}  bg={"gray.500"} mt={5}/>


                    <VStack 
                       w="full"
                       alignItems={"flex-start"}
                       maxH={"350px"}
                       overflow={'auto'}
                    >
                      {/* Caption */}
                       {post.caption && <Caption post={post}/>}
                      {/* Comments */}
                    {post.comments.map((comment) => (
                      <Comment key={comment.id} comment={comment}/>
                    ))}
                    </VStack>

                   <Divider my={4} bg={"gray.800"}/>
                  <PostFooter isProfilePage={true} post={post}/>
                </Flex>
             </Flex>
         </ModalBody>
       </ModalContent>
     </Modal>
    </>
  )
}

export default ProfilePost
