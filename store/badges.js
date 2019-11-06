import axios from 'axios'
import moment from 'moment'

export const state = () => ({
    "badges":[]
})
export const getters = {
    getBadges(state){
        console.log(state.badges)
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
                    axios.put('http://192.168.2.28:3000/users/exit/'+idUser, {
                     signout: payload.image})
                    .then(res=>{
                        axios.delete('http://192.168.2.28:3000/badges/delete/'+ idBadge)
                        .then(data=>{
                            console.log(data)
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