 
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
window.onload = (event) => {
    const dashBoard = document.querySelector(".dashBoard")
    const sideBar = document.querySelector(".sideBar")
    const Cards = document.querySelectorAll('.Card')

    let shiftX = null
    let shiftY = null
    let dragItem = null;

    let cardCoordinates = JSON.parse(localStorage.getItem('cardCoordinates'))
    if(!cardCoordinates){
        cardCoordinates = {}
        localStorage.setItem('cardCoordinates',JSON.stringify(cardCoordinates))
    } else{
        Object.keys(cardCoordinates).forEach(element => {
            paintCard(Cards[element],cardCoordinates[element].X,cardCoordinates[element].Y)
        });
    }
    Cards.forEach(element=>{
        element.addEventListener('dragstart',dragStart)
        element.style.marginTop = '40px'
    })

    dashBoard.addEventListener('dragover',dragOver)
    dashBoard.addEventListener('drop',dropOnDashBoard);
    // dashBoard.addEventListener('dragenter',dragEnter)
    // dashBoard.addEventListener('dragleave',dragLeave)
    sideBar.addEventListener('drop',dropOnSideBar)
    sideBar.addEventListener('dragover',dragOver)
    console.log(2)
    sideBar.onmouseover = ()=>{
        sideBarHover()
    }
    sideBar.onmouseout = ()=>{
        sideBarHover()
    }
    // sideBar.addEventListener('dragenter',sideBarHover)
    // sideBar.addEventListener('dragleave',sideBarHover)
    function sideBarHover(){
        // event.preventDefault();
        console.log(1)
        sideBar.classList.toggle('sideBarHover')
    }
    // function dragEnter(){
    //     // change dashBoard background color
    //     console.log(12)
    //     // sideBar.classList.add('sideBarHover')
    // }
    // function dragLeave(){
    //     // remove background color
    //     console.log(12)
    //     // sideBar.classList.remove('sideBarHover')
    // }
    function dragStart(event){
        dragItem = this
        shiftX = event.clientX - this.getBoundingClientRect().left 
        shiftY = event.clientY - this.getBoundingClientRect().top + parseInt(this.style.marginTop.slice(0,-2))
        setTimeout(() => this.classList.add('hidden'), 0)
    }
    function paintCard(item,x,y){
        item.classList.add('absolute')
        item.style.left = `${x}px`     
        item.style.top = `${y}px`
        item.parentNode.removeChild(item)
        dashBoard.appendChild(item)
    }
    function dropOnSideBar(event){
        event.preventDefault()
        dragItem.classList.remove('absolute')
        dragItem.style.left = null
        dragItem.style.top = null
        const indexSearch = function (arr,target){
            let left = 0
            let right = arr.length
            let mid = null
            target = parseInt(target)
            while(left < right){
                mid = left + parseInt((right - left) / 2)
                if(arr[mid].id < target){
                    left = mid + 1
                } else if(arr[mid].id == target){
                    return true
                } else{
                    right = mid
                }
            }
            return left
        }
        
        dragItem.classList.remove('hidden')
        const sideCard = document.querySelector('.sideCard')
        const INDEX = indexSearch(sideCard.children,dragItem.id)
        if(INDEX !== true){
            dashBoard.removeChild(dragItem)
            sideCard.insertBefore(dragItem,sideCard.children[INDEX])
            delete(cardCoordinates[dragItem.id])
            localStorage.setItem('cardCoordinates',JSON.stringify(cardCoordinates))
        
        }
        dragItem = null
    }
    function dropOnDashBoard(event){
        event.preventDefault()
        // if 겹치는 항목 있다 -> cancel
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