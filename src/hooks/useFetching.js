import { useState } from "react"

export const useFetching = (callback) => {
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState("")

    const fetching = async (...args) => {
        try {
            setisLoading(true)
            await callback(...args)
        } catch (e) {
            setError(e.message)
        } finally {
            setisLoading(false)
        }
    }

    return [fetching, isLoading, error]
}
