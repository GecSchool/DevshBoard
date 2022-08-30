const clockHandler = function clockHandler(){
    const clockDigital__time = document.querySelector('.clockDigital__time')
    const clockDigital__Btn = document.querySelector('.clockDigital__Btn')
    const clockDigital__BtnNav = document.querySelector('.clockDigital__BtnNav')
    const clockDigital__clockBtn = document.querySelector('.clockDigital__clockBtn')
    const clockDigital__stopWatchBtn = document.querySelector('.clockDigital__stopWatchBtn')
    const stopWatchBtn = document.querySelector('.stopWatchBtn')
    const buttonDiv = document.querySelector('.buttonDiv')
    // const clockDigital__timerBtn = document.querySelector('.clockDigital__timerBtn')

    let stopWatchInterval = null
    let clockInterval = null
    class Interval {
        constructor(fn, time) {
            let interval = false
            this.start = function () {
                if (!this.isRunning())
                    interval = setInterval(fn, time)
            }
            this.stop = function () {
                clearInterval(interval)
                interval = false
            }
            this.isRunning = function () {
                return interval !== false
            }
        }
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
        if(stopWatchInterval&&stopWatchInterval.isRunning()){
            stopWatchInterval.stop()
        }
        clockInterval = new Interval(paintClock,1000)
        clockInterval.start()
    }

    // stopWatch
    const makeDigitalStopWatch = function makeDigitalStopWatch(){
        // const topBtn
        const startBtn = document.querySelector('.startBtn')
        const stopBtn = document.querySelector('.stopBtn')
        const resetBtn = document.querySelector('.resetBtn')
        startBtn.classList.remove('hidden')
        stopBtn.classList.add('hidden')
        resetBtn.classList.remove('hidden')
        let curTotalTime = 0
        let criterionTime = 0 


        const toggleHidden = ()=>{
            console.log('toggle')
            startBtn.classList.toggle('hidden')
            stopBtn.classList.toggle('hidden')
            resetBtn.classList.toggle('hidden')
        }
        const paintDigitalStopWatch = function paintDigitalStopWatch(curTotalTime,curTime,criterionTime){
            // console.log(curTime,criterionTime,curTotalTime)
            let totalTime =  parseInt((curTotalTime + curTime - criterionTime) / 10)
            const minutes = String(parseInt(totalTime / 6000)).padStart(2,"0")
            totalTime %= 6000
            const seconds = String(parseInt(totalTime / 100)).padStart(2,"0")
            totalTime %= 100
            const milseconds = String(parseInt(totalTime)).padStart(2,"0")
            clockDigital__time.innerText = `${minutes}:${seconds}:${milseconds}`
        }
        const startBtnHandler = function startBtnHandler(event){
            toggleHidden()
            criterionTime = new Date().getTime()
            stopWatchInterval.start()
        }
        const stopBtnHandler = function stopBtnHandler(event){
            toggleHidden()
            curTotalTime += new Date().getTime() - criterionTime  
            console.log(123)
            stopWatchInterval.stop()
        }
        const resetBtnHandler = function resetBtnHandler(event){
            curTotalTime = 0
            criterionTime = new Date().getTime()
            paintDigitalStopWatch(curTotalTime,criterionTime,criterionTime)
        }
        if(clockInterval&&clockInterval.isRunning()){
            clockInterval.stop()
        }
        stopWatchInterval = new Interval(()=>{paintDigitalStopWatch(curTotalTime,new Date().getTime(),criterionTime)},10) 
        paintDigitalStopWatch(curTotalTime,0,0)
    
        startBtn.onclick = startBtnHandler
        stopBtn.onclick = stopBtnHandler
        resetBtn.onclick = resetBtnHandler
    }

    const toggleHidden = ()=>{
        clockDigital__clockBtn.classList.toggle('hidden')
        clockDigital__stopWatchBtn.classList.toggle('hidden')
        stopWatchBtn.classList.toggle('hidden')
        buttonDiv.classList.toggle('hidden')
    }    

    makeDigitalClock()
    clockDigital__clockBtn.addEventListener('click',()=>{
        toggleHidden()
        makeDigitalClock()
    })
    clockDigital__stopWatchBtn.addEventListener('click',()=>{
        toggleHidden()
        makeDigitalStopWatch()
    })
    // clockDigital__timerBtn.addEventListener('click',makeDigitalTimer)

    

    

    const makeDigitalTimer = function makeDigitalTimer(){

    }

}



