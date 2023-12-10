import axios from "axios";
import { apiService, baseUrl } from "../emptyApiService/apiService";
import { TOrderREQ } from "@/@types/Order.type";

export const ordersApiService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        CreateNewOrder: builder.mutation<string,TOrderREQ>({
            queryFn: async (data) => {
                try {
                    const orderForm = new FormData()

                    for(let key in data){
                        //@ts-ignore
                        orderForm.append(key,data[key])
                    }

                    await axios.post(baseUrl,orderForm);
                    return { data: "ok" };
                } catch (error) {
                    const _error = error as { message: string };
                    console.log(_error);
                    throw new Error(_error.message);
                }
            },
        }),
    }),
});

export const { useCreateNewOrderMutation } = ordersApiService;
