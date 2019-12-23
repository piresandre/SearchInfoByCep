import {create} from 'apisauce';
 const api = create({
     baseURL:
     'https://viacep.com.br/ws/'
    });

    api.addResponseTransform(response=>{
        if(response == null){
            throw response
        }
    });
    export default api;