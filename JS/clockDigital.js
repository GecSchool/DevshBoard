const clockHandler = function clockHandler(){
    const date = new Date()
    const clockDigital__time = document.querySelector('.clockDigital__time')
    const clockDigital__Btn = document.querySelector('.clockDigital__Btn')
    const clockDigital__BtnNav = document.querySelector('.clockDigital__BtnNav')
    const clockDigital__clockBtn = document.querySelector('.clockDigital__clockBtn')
    const clockDigital__stopWatchBtn = document.querySelector('.clockDigital__stopWatchBtn')
    const clockDigital__timerBtn = document.querySelector('.clockDigital__timerBtn')

    let IntervalTime
    let IntervalFuntion
    let Interval = null

    // const btnToggle = function btnToggle(){
    //     clockDigital__Btn.classList.toggle('hidden')
    //     clockDigital__BtnNav.classList.toggle('hidden')
    // }

    // const btnHandler = function btnHandler(event){
    //     event.preventDefault()
    //     const detectClickOutside = function detectClickOutside(event){
    //         console.log(event.target)
    //         if(!clockDigital__BtnNav.contains(event.target)){
    //             btnToggle()
    //             document.removeEventListener('click',detectClickOutside)
    //         }
    //     }
    //     document.addEventListener('click',detectClickOutside)
    // }

    // clockDigital__Btn.addEventListener('click',btnHandler)

    const makeDigitalStopWatch = function makeDigitalStopWatch(){
        // const topBtn
        const topBtn = document.querySelector('.topBtn')
        const bottomBtn = document.querySelector('.bottomBtn')
        let curTime = 0
        clockDigital__time.innerText = `00:00:00`
        let criterionTime
        IntervalTime = 1000
        
        topBtn.addEventListener('click',()=>{
            const DigitalStopWatchHandler = function DigitalStopWatchHandler(){
                let totalTime =  parseInt((curTime + new Date().getTime() - criterionTime) / 1000)
                const hours = String(parseInt(totalTime / 3600)).padStart(2,"0")
                totalTime %= 3600
                const minutes = String(parseInt(totalTime / 60)).padStart(2,"0")
                totalTime %= 60
                const seconds = String(parseInt(totalTime)).padStart(2,"0")
                clockDigital__time.innerText = `${hours}:${minutes}:${seconds}`
            }
            
            console.log(!!Interval)
            if(!Interval){
                // start
                criterionTime = new Date().getTime()
                Interval = setInterval(DigitalStopWatchHandler,IntervalTime)
            } else{
                // stop
                clearInterval(Interval)
                Interval = null
                curTime += new Date().getTime() - criterionTime
            }
        })
        bottomBtn.addEventListener('click',()=>{
            
        })
        // const startTime = 
    }

    const makeDigitalClock = function makeDigitalClock(){
        const paintClock = function paintClock(){
            const date = new Date()
            const hours = String(date.getHours()).padStart(2,"0");
            const minutes = String(date.getMinutes()).padStart(2,"0");
            const seconds = String(date.getSeconds()).padStart(2,"0");
            clockDigital__time.innerText = `${hours}:${minutes}:${seconds}`
        }
        paintClock()
        Interval = setInterval(paintClock,1000)
    }

    makeDigitalClock()
    clockDigital__clockBtn.addEventListener('click',()=>{
        clearInterval(Interval)
        makeDigitalClock()
    })
    clockDigital__stopWatchBtn.addEventListener('click',()=>{
        clearInterval(Interval)
        makeDigitalStopWatch()
    })
    // clockDigital__timerBtn.addEventListener('click',makeDigitalTimer)

    

    

    const makeDigitalTimer = function makeDigitalTimer(){

    }
    // setInterval(IntervalFuntion,IntervalTime)

}



// const 
