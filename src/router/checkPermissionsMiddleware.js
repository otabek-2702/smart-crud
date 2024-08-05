import { useAbility } from "@casl/vue"
import { useRouter } from "vue-router"

const checkPermissionsMiddleware = (to) => {
    const router = useRouter()
    if (to.meta.permissions.length) {
        const {can}= useAbility()    
        let p = to.meta.permissions[0]
        const checkCan =  can(p.can, p.a)
        if (!checkCan) {
            router.back()
        } 
    }else {
        console.log('meta length not found',to.meta.permissions.length)
    }
}

export default checkPermissionsMiddleware