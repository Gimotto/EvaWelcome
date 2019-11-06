export default async function(context){
    let {app} = context;

    await app.$axios.get('badges')
    .then(({data})=>{
        app.store.commit('badges/setBadges', data)
    })
    .catch(e=>{
        alert(e)
    })
}
