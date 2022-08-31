const updateCircleGraph = (todayTDL)=>{
    const circleGraph = document.querySelector('.circle')
    const percentageText = document.querySelector('.percentage')
    let countComplete = 0
    todayTDL.ToDoList.forEach(element => {
        if(element.state){
            countComplete++
        }
    })
    try {
        if(!todayTDL.ToDoList.length){
            throw error
        }
        const percentage = Math.round(countComplete / todayTDL.ToDoList.length * 100)
        percentageText.innerHTML = `${percentage}%`
        circleGraph.setAttribute('stroke-dasharray',`${percentage}, 100`)
    } catch (error) {
        percentageText.innerHTML = '0%'
        circleGraph.setAttribute('stroke-dasharray',`0, 100`)
    }
}