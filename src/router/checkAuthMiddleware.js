import { getToken } from "@/axios"

const checkAuthMiddleware = (to, router) => {
    const authed = getToken()
    if (to.name !== 'login' && !authed) {
        router.back()
    } else if (to.name === 'login' && authed) {
        router.push('/')
    }
}

export default checkAuthMiddleware