class screenHandler{
    constructor(){
        this.height = window.screen.height / 100
        this.width = window.screen.width / 100
        this.cardLocation = []
    }
    set setCardLocation(location){
        this.cardLocation.add(location)
    }
    get getScreenWidth(){
        return this.width
    }
    get getScreenHeight(){
        return this.height
    }
    getCardLocation(index){
        return this.cardLocation[index]
    }
}

const screen = new screenHandler()
