import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
    reducerPath:'api',
    baseQuery:fakeBaseQuery(),
    endpoints:(builder)=> ({})
})

export const baseUrl = `https://script.google.com/macros/s/AKfycbzcS5yC2So4_AmWJ5uC0w2Qi3a0nDMqNJu34Mm4S_8T1uldzdCB656vTeCSDKttEpD84w/exec`