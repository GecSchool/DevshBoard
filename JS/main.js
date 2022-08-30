window.onload = ()=>{
    const TDLHandler = new MainHander()
    screenHandler()
    ToDoListHandler(TDLHandler)
    calendarHandler(TDLHandler)
    searchBarHandler()
    clockHandler()
}