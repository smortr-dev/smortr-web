const initialState = {
    isLoading : false,
    currentFolder: "",
    folders: [],
    files: [],
}

const fileFoldersReducer = (state : any = initialState , action :any) => {
    switch(action.type){
        default : return state;
    }
}

export default fileFoldersReducer;