// import { Avatar, Divider, Flex,Skeleton,SkeletonCircle,Text } from '@chakra-ui/react'
// import { timeAgo } from "../../utils/timeAgo";
// import useGetUserProfileById from '../../hooks/useGetUserProfileById'

// const Comment = ({comment}) => {
//   const { isLoading, userProfile } = useGetUserProfileById(comment.creatdeBy);
//   if(isLoading)return <CommentSkeleton/>
//   return (
//     <>
//     <Flex
//       gap={4}
//     >
//       <Avatar src={userProfile.profilePicURL} name={userProfile.username} size={"sm"}/>
//       <Flex
//         direction={"column"}
//       >
//         <Flex alignItems={'center'}>
//         <Text
//           fontWeight={"bold"}
//           fontSize={12}
//           mr={2}
//         > 
//            {userProfile.username}
//         </Text>
//         <Text
//           color={"gray.500"}
//           fontSize={12}
//         >
//           {timeAgo(comment.createdAt)}
//         </Text>
//         </Flex>
//         <Divider h={1} color={"red.500"}/>
//         <Text>
//         {comment.comment}
//         </Text>
//       </Flex>
//     </Flex>
//     <Divider h={2}/>
//     </>
//   )
// }

// export default Comment

// const CommentSkeleton = () => {
// 	return (
// 		<Flex gap={4} w={"full"} alignItems={"center"}>
// 			<SkeletonCircle h={10} w='10' />
// 			<Flex gap={1} flexDir={"column"}>
// 				<Skeleton height={2} width={100} />
// 				<Skeleton height={2} width={50} />
// 			</Flex>
// 		</Flex>
// 	);
// };









import { Avatar, Divider, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Link } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

const Comment = ({ comment }) => {
	const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);

	if (isLoading) return <CommentSkeleton />;
	return (
    <>
		<Flex gap={4}>
			<Link to={`/${userProfile.username}`}>
				<Avatar src={userProfile.profilePicURL} name={userProfile.username} size={"sm"} />
			</Link>
			<Flex direction={"column"}>
				<Flex gap={2} alignItems={"center"}>
					<Link to={`/${userProfile.username}`}>
						<Text fontWeight={"bold"} fontSize={12}>
							{userProfile.username}
						</Text>
					</Link>
					<Text fontSize={12} color={"gray"}>{timeAgo(comment.createdAt)}</Text>
				</Flex>
        <Divider bg={"green"}/>
				<Text fontSize={14} mt={1}>
        {comment.comment}
				</Text>
			</Flex>
		</Flex>
    <Divider bg={'green'}/>
  </>  
	);
};

export default Comment;

const CommentSkeleton = () => {
	return (
		<Flex gap={4} w={"full"} alignItems={"center"}>
			<SkeletonCircle h={10} w='10' />
			<Flex gap={1} flexDir={"column"}>
				<Skeleton height={2} width={100} />
				<Skeleton height={2} width={50} />
			</Flex>
		</Flex>
	);
};
