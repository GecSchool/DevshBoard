const dashBoard = document.querySelector(".dashBoard")
const div = document.querySelector(".bookMark")
let dragItem = null;
class screenHandler{
    constructor(){
        this.HEIGHT_BLOCKS = window.screen.height / 100
        this.WIDTH_BLOCKS = window.screen.width / 100
        this.MARGIN_LEFT = (window.screen.width % 100) / 2
        this.MARGIN_TOP = (window.screen.height % 100) / 2
        this.cardLocation = []
    }
    set setCardLocation(location){
        this.cardLocation.add(location)
    }
    get getScreenWidth(){
        return this.WIDTH_BLOCKS
    }
    get getScreenHeight(){
        return this.HEIGHT_BLOCKS
    }
    get getMarginLeft(){
        return this.MARGIN_LEFT
    }
    get getMarginTop(){
        return this.MARGIN_TOP
    }
    getCardLocation(index){
        return this.cardLocation[index]
    }
}

const screen = new screenHandler()

const dragDrop = (event)=>{
    event.preventDefault();
    console.log(1)
    dragItem.parentNode.removeChild(dragItem)
    event.target.appendChild(dragItem)
    dragItem.className = 'bookMark'
    console.log('drop')
}
function dragStart(){
    console.log(this)
    dragItem = this
    setTimeout(() => this.className = 'hidden', 0)
}
const dragOver = (event)=>{
    event.preventDefault();
}
const dragLeave = ()=>{
    console.log('drag leave')
}
dashBoard.addEventListener('drop',dragDrop);
div.addEventListener('dragstart',dragStart)
dashBoard.addEventListener('dragover',dragOver)
// dashBoard.addEventListener('dragleave',dragLeave)

