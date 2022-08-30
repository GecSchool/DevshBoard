class MainHander{
    constructor(){
        const date = new Date()
        const LOCAL_COLLECTION_KEY = 'TDLS'
        const LOCAL_RECENT_KEY = 'todayTDL'
        const TODAY_KEY = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
        const tmp = JSON.parse(localStorage.getItem(LOCAL_COLLECTION_KEY)) 
        this.TDLs = tmp === null ? {} : tmp
        this.todayTDL = JSON.parse(localStorage.getItem(LOCAL_RECENT_KEY))
        if(!this.todayTDL){
            // this.TDLs = {}
            this.todayTDL = new ToDoList()
            // localStorage.setItem(LOCAL_COLLECTION_KEY,'{}')
            // localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(this.todayTDL))
        }
        else if(this.todayTDL.id !== TODAY_KEY){
            this.TDLs[this.todayTDL.id] = this.todayTDL
            this.todayTDL = new ToDoList()
            localStorage.setItem(LOCAL_COLLECTION_KEY,JSON.stringify(this.TDLs))
            localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(this.todayTDL))
        }
    }
}
class ToDoList{
    constructor(){
        const date = new Date()
        this.ToDoList = []
        // this.totalTime = 0 //sec
        // this.minutesEachHour = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.id = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`
        this.onId = ''
    }
}
class ThingToDo{
    constructor(toDoName,time = 0,state = false){
        this.toDoName = toDoName
        this.time = time
        this.state = state
        this.id = String(Date.now())
    }
}

// contenteditable
const ToDoListHandler = (TDLHandler)=>{
    const todayTDL = TDLHandler.todayTDL
    const toDoList = document.querySelector(".toDoList")
    const plusBtn = document.querySelector(".plusBtn")
    const TDLInput = document.querySelector(".TDLInput")
    const TDNameInput = TDLInput.querySelector(".ToDoNameInput");
    const LOCAL_RECENT_KEY = 'todayTDL'
    // paint TDL complete
    // add TD  complete
    // delete TD
    // complete TD complete
    // start TD complete
    // timeHandler

    // paintTD 
    // input: just one TD you want paint
    // output: div you want paint TD
    const paintTD = function paintTDL(ToDo){
        // DOM
        const TD = document.createElement('li')
        const nameOfTD = document.createElement('span')
        const timeOfTD = document.createElement('span')
        const editBtn = document.createElement('div')
        // TD
        TD.id = ToDo.id 
        TD.addEventListener('click',startTD)
        TD.addEventListener('dblclick',completeTD)
        if(ToDo.state){
            TD.classList.add('completeTD')
        } else if(ToDo.id === todayTDL.onId){
            TD.classList.add('onTD')
        }
        
        // TD inner HTML
        nameOfTD.innerText = ToDo.toDoName
        timeOfTD.innerText = ToDo.time
        editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M6 14q-.825 0-1.412-.588Q4 12.825 4 12t.588-1.413Q5.175 10 6 10t1.412.587Q8 11.175 8 12q0 .825-.588 1.412Q6.825 14 6 14Zm6 0q-.825 0-1.412-.588Q10 12.825 10 12t.588-1.413Q11.175 10 12 10t1.413.587Q14 11.175 14 12q0 .825-.587 1.412Q12.825 14 12 14Zm6 0q-.825 0-1.413-.588Q16 12.825 16 12t.587-1.413Q17.175 10 18 10q.825 0 1.413.587Q20 11.175 20 12q0 .825-.587 1.412Q18.825 14 18 14Z"/></svg>'
        editBtn.addEventListener('click',deleteBtnHandler)
        // TD appendChild 
        TD.appendChild(nameOfTD)
        TD.appendChild(timeOfTD)
        TD.appendChild(editBtn)
        return TD
    }
    const paintTDL = function paintTDL(){
        const ToDoList = toDoList.querySelector("ul")
        todayTDL.ToDoList.forEach((TD)=>{
            ToDoList.appendChild(paintTD(TD))
        })
    }
    
    const addBtnHandler = function addBtnHandler(evnet){
        const detectClickOutside = function detectClickOutside(event){
            if(!TDLInput.contains(event.target)&&!plusBtn.contains(event.target)){
                toggleHidden()
                addTD(TDNameInput.value)
                TDNameInput.value = ''
                document.removeEventListener('click',detectClickOutside)
                TDLInput.removeEventListener('keypress',enterPress)
            }
        }

        const enterPress = function enterPress(event){
            if(event.key === 'Enter'){
                event.preventDefault()
                toggleHidden()
                addTD(TDNameInput.value)
                TDNameInput.value = ''
                document.removeEventListener('click',detectClickOutside)
                TDLInput.removeEventListener('keypress',enterPress)
            }
        }

        const toggleHidden = function toggleHidden(){
            plusBtn.classList.toggle('hidden');
            TDLInput.classList.toggle('hidden');
        }

        const addTD = function addTD(toDoName){
            const ToDoList = toDoList.querySelector("ul")
            const newTD = new ThingToDo(toDoName)
            todayTDL.ToDoList.push(newTD)
            localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(todayTDL))
            ToDoList.appendChild(paintTD(newTD))
        }
        toggleHidden()
        TDNameInput.focus()
        document.addEventListener('click',detectClickOutside)
        TDLInput.addEventListener('keypress',enterPress)
    }
    const deleteBtnHandler = function deleteBtnHandler(event){
        const deleteTD = function deleteTD(targetTD){
            targetTD.parentNode.removeChild(targetTD)
            todayTDL.ToDoList = todayTDL.ToDoList.filter((element)=>{
                return targetTD.id !== element.id
            })
        }

        const targetTD = this.parentNode
        deleteTD(targetTD)
        localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(todayTDL))
        
    }
    
    
    const completeTD = function completeTD(event){
        // case1. already complete -> toggle complete 
        // case2. onId === this.id -> toggle complete 
        if(!this.classList.contains('completeTD')){
            // case2
            this.classList.remove('onTD')
            todayTDL.onId = ''
            localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(todayTDL))
        }
        const Index = todayTDL.ToDoList.findIndex((element)=>{
            return element.id === this.id
        })
        if(todayTDL.ToDoList[Index].state){
            todayTDL.ToDoList[Index].state = false
        } else{
            todayTDL.ToDoList[Index].state = true
        }
        this.classList.toggle('completeTD')
        localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(todayTDL))
    }
    const startTD = function startTD(event){
        // case1. current On Item === null -> toggle on 
        // case2. this === current On Item -> toggle on 
        // case3. this !== current On Item -> remove current_on element's  "onTD" class & add on class to this
        // case4. this is already completed -> pass
        if(!this.classList.contains('completeTD')){
            if(this.id !== todayTDL.onId && todayTDL.onId){
                // case3
                // find index of element current on
                console.log(todayTDL.onId)
                const Index = todayTDL.ToDoList.findIndex((element)=>{
                    return element.id === todayTDL.onId
                })
                // remove on class
                const tmpList = toDoList.querySelectorAll('li')
                tmpList[Index].classList.remove('onTD')
            } 
            // case1, case2
            todayTDL.onId = this.id === todayTDL.onId ? '' : this.id
            this.classList.toggle('onTD')
            localStorage.setItem(LOCAL_RECENT_KEY,JSON.stringify(todayTDL))
        }
    }
    paintTDL()
    plusBtn.addEventListener('click',addBtnHandler)
}