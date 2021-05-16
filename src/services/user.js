import authHeader from './auth-header';
import authRole from './auth-role';

class UserService {

    getProductAPI(optionalURL = ""){
        return fetch("http://localhost:8080/api/product/"+optionalURL, {
            method: 'GET',
            headers: authHeader()
        }).then(
            response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`Error: ${response.statusText}`)
            }
        );
    }

    putProductAPI(body,optionalURL = ""){
        return fetch("http://localhost:8080/api/product/"+optionalURL, {
            method: 'PUT',
            headers: authHeader(true),
            body: JSON.stringify(body)
        }).then(
            response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error(`Error: ${response.statusText}`)
            }
        );
    }

    getUserRole(){
        return authRole();
    }

}
export default new UserService();