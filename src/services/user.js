import authHeader from './auth-header';

class UserService {

    getDataAPI(controller,optionalURL = ""){
        return fetch("http://localhost:8080/api/"+controller+"/"+optionalURL, {
            method: 'GET',
            headers: authHeader()
        }).then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`Error: ${response.statusText}`)
            }
        );
    }

     postDataAPI(controller,body = undefined, optionalURL = "", jsonResponse = true){
        return fetch("http://localhost:8080/api/"+controller+"/"+optionalURL, {
            method: 'POST',
            headers: authHeader(true),
            body: JSON.stringify(body)
        }).then(async response => {
                if (response.ok) {
                    return jsonResponse ? response.json() : response.text();
                }
                throw new Error(jsonResponse ? JSON.stringify(await response.json()) : (await response.text()));
            }
        );
    }

    putDataAPI(controller,body, optionalURL = ""){
        return fetch("http://localhost:8080/api/"+controller+"/"+optionalURL, {
            method: 'PUT',
            headers: authHeader(true),
            body: JSON.stringify(body)
        }).then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error(`Error: ${response.statusText}`)
            }
        );
    }

    deleteDataAPI(controller,body = undefined, optionalURL = ""){
        return fetch("http://localhost:8080/api/"+controller+"/"+optionalURL, {
            method: 'DELETE',
            headers: authHeader(true),
            body: JSON.stringify(body)
        }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(`Error: ${response.statusText}`)
            }
        );
    }

    getUser() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.accessToken) {
            return user;
        } else {
            return "";
        }
    }

}
export default new UserService();