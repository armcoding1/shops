import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { SignupParams } from "./typings/signup.type";
import * as bcrypt from "bcrypt";
import * as CryptoJS from "crypto-js";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async signup(signupDetails: SignupParams) {
        const decrypt = (value: string) => CryptoJS.AES.decrypt(value, "1111").toString(CryptoJS.enc.Utf8);

        const signupUserDetails = {
            username: decrypt(signupDetails.username),
            email: decrypt(signupDetails.email),
            password: signupDetails.password,
        }

        const existingUser = await this.userRepository.findOneBy({ email: signupUserDetails.email });

        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const newUser = await this.userRepository.save({ ...signupUserDetails });
        return newUser;
    }
};