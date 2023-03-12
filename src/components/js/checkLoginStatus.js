export const isUserLoggedIn = ()=>{
    const userData = localStorage.getItem('sis_user_data')
    const authToken = localStorage.getItem('sis_auth_token')

    return (userData && authToken);
}