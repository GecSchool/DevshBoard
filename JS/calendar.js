const calendarHandler = function calendarHandler(TDLHandler){
    const dateHead = document.querySelector('.calendarSmall__Head')
    const dateBoard = document.querySelector('.calendarSmall__dateBoard')

    const makeCalendar = function makeCalendar(date){
        const curYear = new Date(date).getFullYear()
        const curMonth = new Date(date).getMonth()
        const preLastDay = new Date(curYear, curMonth, 1).getDay()
        const curLastDay = new Date(curYear,curMonth + 1,0).getDate()
        const dates = {...TDLHandler.TDLs,...TDLHandler.todayTDL}
        dateHead.innerHTML = ''
        dateBoard.innerHTML = ''

        dateHead.innerHTML = `${curYear} ${curMonth}`
        
        const paintDay = function paintDay(theDay, date){
            const div = document.createElement('div')
            const dateSpan = document.createElement('span')
            dateSpan.innerHTML = date
            div.appendChild(dateSpan)
            div.addEventListener('click',()=>{
                console.log(1)
            })
            dateBoard.appendChild(div)
            // if(typeof theDay !== 'undefined'){
            // }
        }            
        for(let i = 0;i < preLastDay;i++){
            // append previous month day(must be empty) 
            const tmpHtml = document.createElement('div')
            tmpHtml.classList.add('noColor')
            dateBoard.appendChild(tmpHtml)
        }
        for(let i = 1; i <= curLastDay;i++){
            const key = `${curYear}${curMonth}${i}`
            paintDay(dates[key],i)
        }

        let nextDay = (preLastDay + curLastDay) % 7
        nextDay = nextDay ? nextDay : 7

        for(let i = nextDay;i < 7;i++){
            const tmpHtml = document.createElement('div')
            tmpHtml.classList.add('noColor')
            dateBoard.appendChild(tmpHtml)
        }
    }
    const date = new Date()
   
    makeCalendar(date)

}