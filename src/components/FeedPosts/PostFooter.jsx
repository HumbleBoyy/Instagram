import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComment from "../../hooks/usePostComment";
import useAuthStore from "../../store/authStore";
import useLikePost from "../../hooks/useLikePost";
import { timeAgo } from "../../utils/timeAgo";
import CommentsModal from "../Modals/CommentsModal";
import useShowToast from "../../hooks/useShowToast";


const PostFooter = ({isProfilePage, post, creatorProfile}) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {isCommenting, handlePostComment} = usePostComment()
  const [comment, setComment] = useState('');
  const authUser = useAuthStore((state)=> state.user)
  const commentRef = useRef(null)
  const { isLiked, likes, handleLikePost, isUpdating } = useLikePost(post)
  const showToast = useShowToast()


  const handleSubmitComment = async (e)=> {
    e.preventDefault();
    if(commentRef.current.value === ""){
			showToast("Error, Please leave comment or do not press the button!")
		}else{
			await handlePostComment(post.id, comment)
       setComment('')
		}
    
  }
  return (
    <>
        <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={'auto'}>
          <Box 
            onClick={handleLikePost} 
            cursor={'pointer'} 
            fontSize={18}
          >
            {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
          </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
			     <CommentLogo />
 				</Box>
        </Flex>
        <Text fontWeight={600} fontSize={"sm"}>{likes}  likes</Text>
          {isProfilePage && (
            <Text fontSize={'12px'} color={'gray'}>
                Posted {timeAgo(post.createdAt)}
            </Text>
          )}
        {!isProfilePage && (
          <>
          <Text fontSize={'sm'} fontWeight={700} color={'green'}>
           {creatorProfile?.username} {"  "}
        </Text>
        <Text as='span' fontWeight={400}>
           {post.caption}
        </Text>
        {post.comments.length > 0 && (
          <Text fontSize='sm' color={'gray'} cursor={'pointer'} onClick={onOpen}>
            Views all {post.comments.length} comments
          </Text>
        )}
         {isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post}/> : null}
        </>
        )}



   			{authUser && (
          	<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
            <InputGroup> 						
             <Input
               variant={"flushed"}
               placeholder={"Add a comment..."}
               fontSize={14}
               onChange={(e) => setComment(e.target.value)}
               value={comment}
               ref={commentRef}
             />
             <InputRightElement>
               <Button
                 fontSize={14}
                 color={"blue.500"}
                 fontWeight={600}
                 cursor={"pointer"}
                 _hover={{ color: "white" }}
                 bg={"transparent"}
                 onClick={handleSubmitComment}
                 isLoading={isCommenting}
               >
                 Post
               </Button>
             </InputRightElement>
           </InputGroup>
         </Flex>
        )}

    </>
  )
}

export default PostFooter





// import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
// import { useRef, useState } from "react";
// import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
// import usePostComment from "../../hooks/usePostComment";
// import useAuthStore from "../../store/authStore";
// import useLikePost from "../../hooks/useLikePost";
// import { timeAgo } from "../../utils/timeAgo";
// import CommentsModal from "../Modals/CommentsModal";

// const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
// 	const { isCommenting, handlePostComment } = usePostComment();
// 	const [comment, setComment] = useState("");
// 	const authUser = useAuthStore((state) => state.user);
// 	const commentRef = useRef(null);
// 	const { handleLikePost, isLiked, likes } = useLikePost(post);
// 	const { isOpen, onOpen, onClose } = useDisclosure();

// 	const handleSubmitComment = async () => {
// 		await handlePostComment(post.id, comment);
// 		setComment("");
// 	};

// 	return (
// 		<Box mb={10} marginTop={"auto"}>
// 			<Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
// 				<Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
// 					{!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
// 				</Box>

// 				<Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
// 					<CommentLogo />
// 				</Box>
// 			</Flex>
// 			<Text fontWeight={600} fontSize={"sm"}>
// 				{likes} likes
// 			</Text>

// 			{isProfilePage && (
// 				<Text fontSize='12' color={"gray"}>
// 					Posted {timeAgo(post.createdAt)}
// 				</Text>
// 			)}

// 			{!isProfilePage && (
// 				<>
// 					<Text fontSize='sm' fontWeight={700}>
// 						{creatorProfile?.username}{" "}
// 						<Text as='span' fontWeight={400}>
// 							{post.caption}
// 						</Text>
// 					</Text>
// 					{post.comments.length > 0 && (
// 						<Text fontSize='sm' color={"gray"} cursor={"pointer"} onClick={onOpen}>
// 							View all {post.comments.length} comments
// 						</Text>
// 					)}
// 					{/* COMMENTS MODAL ONLY IN THE HOME PAGE */}
// 					{isOpen ? <CommentsModal isOpen={isOpen} onClose={onClose} post={post} /> : null}
// 				</>
// 			)}

// 			{authUser && (
// 				<Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"}>
// 					<InputGroup>
// 						<Input
// 							variant={"flushed"}
// 							placeholder={"Add a comment..."}
// 							fontSize={14}
// 							onChange={(e) => setComment(e.target.value)}
// 							value={comment}
// 							ref={commentRef}
// 						/>
// 						<InputRightElement>
// 							<Button
// 								fontSize={14}
// 								color={"blue.500"}
// 								fontWeight={600}
// 								cursor={"pointer"}
// 								_hover={{ color: "white" }}
// 								bg={"transparent"}
// 								onClick={handleSubmitComment}
// 								isLoading={isCommenting}
// 							>
// 								Post
// 							</Button>
// 						</InputRightElement>
// 					</InputGroup>
// 				</Flex>
// 			)}
// 		</Box>
// 	);
// };

// export default PostFooter;
