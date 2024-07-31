import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { db } from '@/lib/firebase'; // Ensure this path is correct
import { toast } from 'react-toastify';
import { CollectionReference, DocumentData, DocumentReference, QuerySnapshot, collection, query, where, getDocs, addDoc, getDoc } from 'firebase/firestore';

// Define action types
const SET_LOADING = "SET_LOADING";
const SET_PROJECTS = "SET_PROJECTS";
const SET_FILES = "SET_FILES";
const SET_CURRENT_FOLDER = "SET_CURRENT_FOLDER";
const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
const SET_FOLDERS = "SET_FOLDERS";
const ADD_FOLDER = "ADD_FOLDER";

// Define the shape of the state
interface FileFoldersState {
    isLoading: boolean;
    currentFolder: string;
    folders: any[];
    files: any[];
    projects: any[];
    currentProjectID: string | null;
    currentProjectName: string | null;
}

// Define the initial state
const initialState: FileFoldersState = {
    isLoading: false,
    currentFolder: "/",
    folders: [],
    files: [],
    projects: [],
    currentProjectID: null,
    currentProjectName: null,
};

// Define action interfaces
interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SetProjectsAction {
    type: typeof SET_PROJECTS;
    payload: any[];
}

interface SetFilesAction {
    type: typeof SET_FILES;
    payload: any[];
}

interface SetCurrentFolderAction {
    type: typeof SET_CURRENT_FOLDER;
    payload: string;
}

interface SetCurrentProjectAction {
    type: typeof SET_CURRENT_PROJECT;
    payload: {
        projectID: string | null;
        projectName: string | null;
    };
}

interface SetFoldersAction {
    type: typeof SET_FOLDERS;
    payload: any[];
}

interface AddFolderAction {
    type: typeof ADD_FOLDER;
    payload: any;
}

type FileFoldersActionTypes =
    | SetLoadingAction
    | SetProjectsAction
    | SetFilesAction
    | SetCurrentFolderAction
    | SetCurrentProjectAction
    | SetFoldersAction
    | AddFolderAction;

// Define the reducer
const fileFoldersReducer = (
    state: FileFoldersState = initialState,
    action: FileFoldersActionTypes
): FileFoldersState => {
    switch (action.type) {
        case SET_LOADING:
            return { ...state, isLoading: action.payload };
        case SET_PROJECTS:
            return { ...state, projects: action.payload };
        case SET_FILES:
            return { ...state, files: action.payload };
        case SET_CURRENT_FOLDER:
            return { ...state, currentFolder: action.payload };
        case SET_CURRENT_PROJECT:
            return {
                ...state,
                currentProjectID: action.payload.projectID,
                currentProjectName: action.payload.projectName,
            };
        case SET_FOLDERS:
            return { ...state, folders: action.payload };
        case ADD_FOLDER:
            return { ...state, folders: [...state.folders, action.payload] };
        default:
            return state;
    }
};

// Define the context
interface FileFoldersContextProps {
    state: FileFoldersState;
    dispatch: Dispatch<FileFoldersActionTypes>;
    setLoading: (isLoading: boolean) => void;
    setProjects: (projects: any[]) => void;
    setFiles: (files: any[]) => void;
    setFolders: (folders: any[]) => void;
    addFolder: (folder: any) => void;
    setCurrentFolder: (folder: string) => void;
    setCurrentProject: (projectID: string | null, projectName: string | null) => void;
    fetchFolders: (userId: string) => void;
    fetchFiles: (userId: string) => void;
    createFolder: (name: string, userId: string, parent: string, path: any[]) => void;
}

const FileFoldersContext = createContext<FileFoldersContextProps>({
    state: initialState,
    dispatch: () => null,
    setLoading: () => {},
    setProjects: () => {},
    setFiles: () => {},
    setFolders: () => {},
    addFolder: () => {},
    setCurrentFolder: () => {},
    setCurrentProject: () => {},
    fetchFolders: () => {},
    fetchFiles: () => {},
    createFolder: () => {},
});

// Export the provider
const FileFoldersProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(fileFoldersReducer, initialState);

    const setLoading = (isLoading: boolean) => {
        dispatch({ type: SET_LOADING, payload: isLoading });
    };

    const setProjects = (projects: any[]) => {
        dispatch({ type: SET_PROJECTS, payload: projects });
    };

    const setFiles = (files: any[]) => {
        dispatch({ type: SET_FILES, payload: files });
    };

    const setFolders = (folders: any[]) => {
        dispatch({ type: SET_FOLDERS, payload: folders });
    };

    const addFolder = (folder: any) => {
        dispatch({ type: ADD_FOLDER, payload: folder });
    };

    const setCurrentFolder = (folder: string) => {
        dispatch({ type: SET_CURRENT_FOLDER, payload: folder });
    };

    const setCurrentProject = (projectID: string | null, projectName: string | null) => {
        dispatch({ type: SET_CURRENT_PROJECT, payload: { projectID, projectName } });
    };

    const fetchFolders = async (userId: string) => {
        setLoading(true);
        try {
            const foldersRef = collection(db, 'docs');
            const q = query(foldersRef, where("createdBy", "==", userId));
            const foldersSnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
            const allFolders: any[] = [];
            foldersSnapshot.docs.forEach((doc) => {
                allFolders.push({ data: doc.data(), docId: doc.id });
            });
            setFolders(allFolders);
        } catch (err) {
            toast.error("Failed to fetch folders!");
        } finally {
            setLoading(false);
        }
    };

    const fetchFiles = async (userId: string) => {
        setLoading(true);
        try {
            const filesRef = collection(db, 'files');
            const q = query(filesRef, where("createdBy", "==", userId));
            const filesSnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
            const allFiles: any[] = [];
            filesSnapshot.docs.forEach((doc) => {
                allFiles.push({ data: doc.data(), docId: doc.id });
            });
            setFiles(allFiles);
        } catch (err) {
            toast.error("Failed to fetch files!");
        } finally {
            setLoading(false);
        }
    };

    const createFolder = async (name: string, userId: string, parent: string, path: any[]) => {
        try {
            const docRef: DocumentReference<DocumentData> = await addDoc(collection(db, 'docs'), {
                createdBy: userId,
                name,
                path,
                parent,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const doc = await getDoc(docRef);
            addFolder({ data: doc.data(), docId: doc.id });
            toast.success("Folder created successfully!");
        } catch (err) {
            toast.error("Failed to create folder!");
        }
    };

    return (
        <FileFoldersContext.Provider
            value={{
                state,
                dispatch,
                setLoading,
                setProjects,
                setFiles,
                setFolders,
                addFolder,
                setCurrentFolder,
                setCurrentProject,
                fetchFolders,
                fetchFiles,
                createFolder,
            }}
        >
            {children}
        </FileFoldersContext.Provider>
    );
};

export default FileFoldersContext;
export { FileFoldersProvider };
