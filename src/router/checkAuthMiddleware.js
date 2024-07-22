import { getToken } from "@/axios"


const checkAuthMiddleware = (to, from, failure, router) => {
    const authed = getToken()
    console.log(to)
    if (to.name !== 'login' && !authed) {
        router.back()
    } else if (to.name === 'login' && authed) {
        router.replace('/')
    }
}

export default checkAuthMiddleware