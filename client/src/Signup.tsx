import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, Container, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

interface ISignupParams {
    username: string;
    email: string;
    password: string;
}

const Signup: FC = () => {
    const [formData, setFormData] = useState<ISignupParams>({
        username: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const hashData = (data: string) => CryptoJS.AES.encrypt(data, "1111").toString();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const hashedFormData = {
            username: hashData(formData.username),
            email: hashData(formData.email),
            password: hashData(formData.password)
        };

        try {
            await axios.post("http://localhost:6001/auth/signup", hashedFormData);
            navigate("/login");
        } catch (error: unknown) {
            console.log("Error signing up user", error);
        }
    }
    const inputsArr = ["Username", "Email", "Password"];

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Flex flexDirection="column" gap="20px" p="20px">
                    {inputsArr.map((input) => (
                        <FormControl key={input}>
                            <FormLabel mb="10px">{input}</FormLabel>
                            <Input
                                type={input.toLowerCase()}
                                name={input.toLowerCase()}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                    ))}
                    <Button colorScheme="teal" type="submit">Signup</Button>
                </Flex>
            </form>
        </Container>
    );
}

export default Signup;