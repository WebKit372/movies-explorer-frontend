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
      credentials: "include",
      body: JSON.stringify({
        "email": user.email,
        "password": user.password
      })
    })
    .then((res) => this.__getJSON(res))   
  }
  getSavedMovies(userId){
    return fetch(`${this._URL}/movies`,{
      credentials: "include",  
    })
    .then((res) => this.__getJSON(res))
  }
  getUserInfo(){
    return fetch(`${this._URL}/users/me`,{
      credentials: "include",
    })
    .then((res) => this.__getJSON(res))
  }

  updateUserInfo(user){
    return fetch(`${this._URL}/users/me`,{
      method:'PATCH',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "email": user.email,
        "name": user.name
      }),
      credentials: "include",
    })
    .then((res) => this.__getJSON(res))
  }
  logout(){
    return fetch(`${this._URL}/users/logout`,{
      credentials: "include",
    })
    .then((res) => this.__getJSON(res))
  }
  addMovie(movie){
    return fetch(`${this._URL}/movies`,{
      method:'POST',
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        ...movie
      }),
      credentials: "include",
    })
    .then((res) => this.__getJSON(res))
  }
  deleteMovie(id){
    return fetch(`${this._URL}/movies/${id}`,{
      method:'DELETE',
      credentials: "include",
    })
    .then((res) => this.__getJSON(res))
  }
}