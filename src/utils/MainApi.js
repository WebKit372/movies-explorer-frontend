export default class mainApi {
  constructor(URL){
    this._URL = URL;
  }
  __getJSON(res){
    if(res.ok){
        return res.json()
    }
    else{
        return Promise.reject(res.json())
    }
  }
  signup(user){
    return fetch(`${this._URL}/signup`,{
      method:'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "name": user.name,
        "email": user.email,
        "password": user.password
      })
    })
    .then((res) => this.__getJSON(res))
  }
  singnin(user){
    return fetch(`${this._URL}/signin`,{
      method:'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "email": user.email,
        "password": user.password
      })
    })
    .then((res) => this.__getJSON(res))   
  }
  getSavedMovies(userId){
    return fetch(`${this._URL}/movies/getMovies`)
    .then((res) => this.__getJSON(res))
  }
}