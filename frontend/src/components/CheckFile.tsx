import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const CheckFile = () => {
    const {param, } = useParams()

    useEffect(()=> {
        console.log(param)
    }, [])

    return (
        <div className=" w-screen h-screen flex justify-center items-center bg-red-100">
            <h1>Helloo {param}</h1>
        </div>
    )
}