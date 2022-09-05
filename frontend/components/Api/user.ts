import { AxiosInstance } from "axios";
import { CreateSubscribe, LoginDto, RegistryDto } from "./dto";
import { ResponseUser } from "./response";

export const UserApi = (instance: AxiosInstance) => ({

    async registry(dto: RegistryDto): Promise<ResponseUser> {

        const { data } = await instance.post("auth/create", dto);
        return data;
    },

    async login(dto: LoginDto): Promise<ResponseUser> {

        const { data } = await instance.post("auth/login", dto);
        return data;
    },

    async profile(id: number): Promise<ResponseUser> {

        const { data } = await instance.get("users/profile/" + id);
        return data;
    },

    async me(): Promise<ResponseUser> {

        const { data } = await instance.get("users/me/");
        return data;
    },

    async subscribe(dto: CreateSubscribe): Promise<ResponseUser> {

        const { data } = await instance.post("users/subscribe", dto);
        return data;
    },

    async top(): Promise<ResponseUser> {

        const { data } = await instance.get("users/top");
        return data;
    }

})