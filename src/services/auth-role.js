export default function authRole() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return user.roles[0];
    } else {
        return "";
    }
}