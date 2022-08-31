const bookMarkHandler = function bookMarkHandler(){
    const bookMarks = document.querySelector('.bookMarks')
    const addBtn = bookMarks.querySelector('.bookMark__addBtn')
    const InputWindow = bookMarks.querySelector('.bookMark__Input')
    const InputForm = InputWindow.querySelectorAll('form')
    const nameForm = InputForm[0]
    const urlForm = InputForm[1]
    const nameInput = InputWindow.querySelector('.bookMark__nameInput')
    const urlInput = InputWindow.querySelector('.bookMark__urlInput')
    const cancelBtn = InputWindow.querySelector('.bookMark__cancelBtn')
    const completeBtn = InputWindow.querySelector('.bookMark__completeBtn')

    const toggleHidden  = ()=>{
        addBtn.classList.toggle('hidden')
        InputWindow.classList.toggle('hidden')
    }
    const paintBookMark = function paintBookMark(NAMEINPUT,URLINPUT){
        const a = document.createElement('a')
        const img = document.createElement('img')
        const span = document.createElement('span')
        const size = 24
        // class List add
        a.classList.add('bookMark')
        img.classList.add('bookMarkImg')
        span.classList.add('bookMarkName')
        // if NAMEINPUT if '' => urlinput is name
        if(NAMEINPUT){
            // name value is exist
            span.innerText = NAMEINPUT.length <= 11 ? NAMEINPUT : NAMEINPUT.slice(0,11) + '...'
        } else{
            // name value is none
            span.innerText = URLINPUT.length <= 11 ? URLINPUT : URLINPUT.slice(0,11) + '...'
        }
        // a.href = URL input 
        img.src = `https://www.google.com/s2/favicons?domain=${URLINPUT}&sz=${size}`
        a.href = URLINPUT

        // favicon add
        a.appendChild(img)
        a.appendChild(span)
        bookMarks.appendChild(a)
    }
    // name input evnet handler
    nameForm.addEventListener('submit',(event)=>{
        event.preventDefault()
        if(urlInput.value){
            // on url => paint Bookmark
            toggleHidden()
            paintBookMark(nameInput.value,urlInput.value)
            nameInput.value = ''
            urlInput.value = ''
        }
    })
    // url input event handler
    urlForm.addEventListener('submit',(event)=>{
        event.preventDefault()
        if(urlInput.value){
            // on url => paint Bookmark
            toggleHidden()
            paintBookMark(nameInput.value,urlInput.value)
            nameInput.value = ''
            urlInput.value = ''
        } 
    })
    // cancel btn event handler
    cancelBtn.addEventListener('click',(event)=>{
        toggleHidden()
        nameInput.value = ''
        urlInput.value = ''
    })
    // complete btn event hadler
    completeBtn.addEventListener('click',(event)=>{
        if(urlInput.value){
            // can click
            toggleHidden()
            paintBookMark(nameInput.value,urlInput.value)
            nameInput.value = ''
            urlInput.value = ''
        }

    })
    // add Btn event handler
    addBtn.addEventListener('click',()=>{
        toggleHidden()
    })
}