import { Box, Flex, Spinner } from '@chakra-ui/react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firebase'
import Navbar from '../../components/Navbar/Navbar'

const PageLayout = ({children}) => {
  const {pathname} = useLocation()
  const [user, loading] = useAuthState(auth)
  const canRenderSidebar = pathname !=='/auth' && user;
  const canRenderNavbar = !user && !loading && pathname !== "/auth";

  const chekingUserISAuth = !user && loading
  if(chekingUserISAuth)return <PageLayoutSpinner/>
 
  return (
   <Flex flexDirection={canRenderNavbar ? "column" : "row"}>   
      <Box w={{base:"70px", md:"240px"}}>
        {canRenderSidebar ? (
          <Sidebar/>
        ):null}
      </Box>
      {canRenderNavbar ? <Navbar/> : null}
      
      <Box flex={1} w={{base:"calc(100% - 70px)",md:"calc(100% - 240px)"}} mx={'auto'}>
        {children}
      </Box>
   </Flex>
  )
}

export default PageLayout


// // instead of adding the Sidebar component to every page, we can add it only once to the PageLayout component and wrap the children with it. This way, we can have a sidebar on every page except the AuthPage.
const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};
