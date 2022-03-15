import {makeAutoObservable} from 'mobx'

export default class OverviewStore {
    constructor() {
      this._types = [
          {id: 1, name:"Смартфоны"},
          {id: 2, name:"Ноутбуки"},
          {id: 3, name:"Компьютеры"},
      ]
      
      this._overviews = []
      this._selectedType ={}
      
      makeAutoObservable(this)
    }


    setTypes(types) {
        this._types = types
    }

    setOverviews(overviews) {
        this._overviews = overviews
    }

    setSelectedType(type) {
        this._selectedType = type
    }
    

    get types() {
        return this._types
    }

    get overviews() {
        return this._overviews
    }
    
    get selectedType() {
        return this._selectedType
    }
}
