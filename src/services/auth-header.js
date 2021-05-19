export default function authHeader(jsonHeader = false) {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        if(jsonHeader){
            return {'Content-Type': 'application/json', Authorization: 'Bearer ' + user.accessToken}
        }
        return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
        //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
    } else {
        if(jsonHeader){
            return {'Content-Type': 'application/json'}
        }
        return {};
    }
}