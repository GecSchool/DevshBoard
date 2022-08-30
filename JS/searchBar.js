const searchBarHandler = function searchBarHandler(){
    const searchBar = document.querySelector('.searchBar')
    const searchBarForm = searchBar.querySelector('form')
    const searchBarInput = searchBarForm.querySelector('input')

    const formEventHandler = function formEventHandler(event){
        event.preventDefault()
        // check input value is url or not
        const isValidHttpUrl = function isValidHttpUrl(string) {
            let url;
            
            try {
              url = new URL(string);
            } catch (_) {
              return false;  
            }
          
            return url.protocol === "http:" || url.protocol === "https:";
        }
        console.log(isValidHttpUrl(searchBarInput.value))
        if(isValidHttpUrl(searchBarInput.value)){
           location.href = searchBarInput.value
        } else{
           location.href = `https://www.google.com/search?q=${searchBarInput.value}`
        }
    }

    searchBarForm.addEventListener('submit',formEventHandler)
}