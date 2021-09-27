import {Container,Flex,VStack,Heading,Text,SimpleGrid,GridItem,FormControl,FormLabel,Input,Select,Checkbox,Button} from "@chakra-ui/react";
import { useMoralis } from "react-moralis";

function App()   {
  const { authenticate, isAuthenticated, user } = useMoralis();

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Authenticate</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome {user.get("username")}</h1>
    </div>
  );
}

export default App;
