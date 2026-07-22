import { useQuery } from "@tanstack/react-query"
import { getUser } from "../lib/api"

export const AUTH = "auth"

export interface UserProfile {
  _id: string;
  email: string;
  verified: boolean;
  createdAt?: string;
}

const useAuth = (opts = {}) => {
    const {
        data,
        ...rest
    } = useQuery({
        queryKey: [AUTH],
        queryFn: getUser,
        staleTime: Infinity,
        ...opts
    })

    const rawData = data as any;
    const user: UserProfile | undefined =
      rawData?.user ||
      rawData?.data?.user ||
      rawData?.data ||
      (rawData?._id ? rawData : undefined);

    return {
        user,
        ...rest
    }
}

export default useAuth