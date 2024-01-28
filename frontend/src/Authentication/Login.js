import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
/* import { ChatState } from "../../Context/ChatProvider"; */

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      setLoading(true);

      if (!email || !password) {
        toast({
          title: "Please enter both email and password",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        email: email,
        password: password,
      };

      const response = await axios.post("/api/user/login", data, config);

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Assuming your server sends a token upon successful login
      const { token } = response.data;

      // Save the token in local storage
      localStorage.setItem("userInfo", JSON.stringify({ token, email }));

      setLoading(false);
      history.push("/chats");
    } catch (error) {
      // Log specific parts of the error object for debugging
      console.error("Login error:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Status Code:", error.response.status);
        console.error("Response Data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No Response Received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request Error:", error.message);
      }

      const errorMessage =
        error.response?.data.message || "An error occurred during login.";

      toast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="login-email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("jahan@jahan.com");
          setPassword("123456789");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
