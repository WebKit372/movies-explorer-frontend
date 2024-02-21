class Api{
    __getJSON(res){
        if(res.ok){
            return res.json()
        }
        else{
            return Promise.reject(res.status)
        }
    }
    getFilms(){
        return fetch('https://api.nomoreparties.co/beatfilm-movies')
        .then((res) => this.__getJSON(res))
    }
}
const apiTool = new Api();
export default apiTool;