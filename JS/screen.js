const dashBoard = document.querySelector(".dashBoard")
const div = document.querySelector(".bookMark")
 
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
// dashBoard.addEventListener('dragleave',dragLeave)
window.onload = (event) => {
    let shiftX = null
    let shiftY = null
    let dragItem = null;
    const Cards = document.querySelectorAll('.Card')
    let cardCoordinates = JSON.parse(localStorage.getItem('cardCoordinates'))
    if(!cardCoordinates){
        cardCoordinates = {}
        localStorage.setItem('cardCoordinates',JSON.stringify(cardCoordinates))
    } else{
        Object.keys(cardCoordinates).forEach(element => {
            console.log(element)
            
            paintCard(Cards[element],cardCoordinates[element].X,cardCoordinates[element].Y)
        });
    }
    Cards.forEach(element=>{
        element.addEventListener('dragstart',dragStart)
    })
    dashBoard.addEventListener('dragover',dragOver)
    dashBoard.addEventListener('drop',dragDrop);
    function dragEnter(){
        // change dashBoard background color
    }
    function dragLeave(){
        // remove background color
    }
    function dragStart(event){
        dragItem = this
        shiftX = event.offsetX
        shiftY = event.offsetY 
        setTimeout(() => this.classList.add('hidden'), 0)
    }
    function paintCard(item,x,y){
        console.log(item)
        item.classList.add('absolute')
        item.style.left = `${x}px`     
        item.style.top = `${y}px`
        item.parentNode.removeChild(item)
        dashBoard.appendChild(item)
    }
    function dragDrop(event){
        event.preventDefault();
        const X = event.clientX - shiftX
        const Y = event.clientY - shiftY
        paintCard(dragItem,X,Y)
        dragItem.classList.remove('hidden')
        cardCoordinates[dragItem.id] = {'X': X,'Y': Y}
        localStorage.setItem('cardCoordinates',JSON.stringify(cardCoordinates))
        dragItem = null
    }
    function dragOver(event){
        event.preventDefault();
    }
    
    
    
};