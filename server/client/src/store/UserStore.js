import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
      this._user = {}
      this._users = []
      makeAutoObservable(this)
    }

    setUser(user) {
        this._user = user
    }
    
    setUsers(users){
        this._users = users
    }

    get user() {
        return this._user
    }

    get users() {
        return this._users
    }
}
