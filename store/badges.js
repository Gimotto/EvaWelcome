
import moment from 'moment'

export const state = () => ({
    "badges":[]
})
export const getters = {
    getBadges(state){
        return state.badges
    }
}
export const mutations={
    setBadges(state, payload){
        state.badges = payload
    },
    deleteBadge(state, payload){
        state.badges[payload].idUser = null
    }
}
export const actions={
    delBadge(e, payload){
        for(let i in e.state.badges){
            if(e.state.badges[i].idBadge == payload.badgeId){
                let idBadge = e.state.badges[i].idBadge
                let idUser = e.state.badges[i].idUser
                    this.$axios.put('users/exit/'+idUser, {
                     signout: payload.image})
                    .then(res=>{
                        this.$axios.delete('badges/delete/'+ idBadge)
                        .then(data=>{
                            large(data)
                        })
                        .catch(e=>{
                            console.error(e)
                      })
                    })
                    .catch(e=>{
                       console.error(e)
                    })
                e.commit('deleteBadge', i)
            }
        }
    }
}