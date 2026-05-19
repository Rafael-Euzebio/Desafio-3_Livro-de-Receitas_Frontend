/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";

const api = axios.create({
    baseURL: "https://www.themealdb.com/api/json/v1/1"
})

export const get = async (url:string, setData:Function) => {
    const response = await api.get(url)
    setData(response.data)
}