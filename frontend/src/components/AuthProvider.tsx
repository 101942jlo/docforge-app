import axios from 'axios'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { User } from '../types/user';
import { Folder } from '../types/folder';
import { Files } from '../types/files';

type AuthContext = {
    authToken?: string | null;
    currentUser? : User | null;
    userFolders? : Folder[] | null;
    handleDeleteFolder: (credentials: {folderId: string}) => Promise<void>;
    handleDeleteFile: (credentials: { fileId: string }) => Promise<void>;
    handleDownloadFile: (credentials: { fileId: string })=> Promise<void>;
    handleLogin: (credentials:{email:string, password:string}) => Promise<void>;
    handleRegister: (credentials:{email:string, password:string, firstName:string, lastName:string}) => Promise<void>;
    handleLogout: () => Promise<void>;
    fileInFolder: (credentials: {folderId: string}) => Promise<void>;    
    handleUploadFile: (credentials: any) => Promise<void>;
    loading: boolean
    folderFiles: Files[] | null
    handleCreateFolder: (credentials:{name:string}) => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

type AuthProviderProps = PropsWithChildren;

export default function AuthProvider({children}: AuthProviderProps) {
    const [authToken, setAuthToken] = useState<string | null>();
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userFolders, setUserFolders] = useState<Folder[] | null>(null);
    const [folderFiles, setFolderFiles] = useState<Files[] | null>(null)


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dashboard', {
                    withCredentials: true,
                });
                console.log(response.data)
                setCurrentUser(response.data);
            } catch (error) {
                console.log(error)
                setCurrentUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
        
    }, []);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/folders', {
                    withCredentials: true
                })
                console.log(response.data)
                setUserFolders(response.data)
            } catch (error) {
                
            }
        }
        fetchFolders()

    }, [currentUser])


    async function handleRegister(credentials: {email:string, password:string, firstName:string, lastName:string}) {
        try{
            // Set POST request to backend to generate token en user info
            const response = await axios.post('http://localhost:5000/api/register', credentials, {withCredentials: true});

            setCurrentUser(response.data.user);

        } catch {
            setAuthToken(null);
            setCurrentUser(null);
        }
    }

    async function fileInFolder(credentials: { folderId: string }) {
        try {
            const response = await axios.get(`http://localhost:5000/files/${credentials.folderId}`, {withCredentials: true});
            console.log(response.data)
            setFolderFiles(response.data)        
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLogin(credentials: {email:string, password:string}) {
        try {
            const response = await axios.post('http://localhost:5000/api/login', credentials, {withCredentials: true});

            setCurrentUser(response.data.user); 
            console.log(response.data.user)

        } catch {
            setAuthToken(null);
            setCurrentUser(null);            
        }
    }

    async function handleCreateFolder (credentials: {name:string}){
        
        try {
            const response = await axios.post('http://localhost:5000/folders', credentials, {withCredentials: true});
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    async function handleDeleteFolder (credentials: {folderId: string}){
        try {
            const response = await axios.delete(`http://localhost:5000/folders/${credentials.folderId}`, {withCredentials: true});
            console.log(response.data)            
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeleteFile (credentials: {fileId: string}){
        try {
            const response = await axios.delete(`http://localhost:5000/files/${credentials.fileId}`, {withCredentials: true});
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDownloadFile(credentials: { fileId: string}){
        try {
            const response = await axios.get(`http://localhost:5000/download/${credentials.fileId}`, {
                responseType: "blob", 
                withCredentials: true,
            });
    
            console.log(response)
            const contentDisposition = response.headers["content-disposition"];
            console.log(contentDisposition)
            let filename = "downloaded_file";
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+?)"/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }
    
            // Create a blob URL and trigger file download
            const url = window.URL.createObjectURL(response.data);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename; // Set the correct filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.log(error)
        }
    }

    async function handleUploadFile (credentials: {files:File, folderId:string}) {
        try {
            const formData = new FormData();
            formData.append("file", credentials.files);
            const response = await axios.post(`http://localhost:5000/upload/${credentials.folderId}`, formData, {withCredentials: true});
            console.log(credentials.files)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLogout() {
        // send a POST request to the backend to logout the user
        const response = await axios.get('http://localhost:5000/logout', {withCredentials: true});
        console.log(response.data)
        setAuthToken(null);
        setCurrentUser(null);
        
    }


    return <AuthContext.Provider value={{
        authToken,
        currentUser,
        handleLogin,
        handleRegister,
        handleLogout,
        loading,
        handleCreateFolder,
        handleDeleteFolder,
        handleDeleteFile,
        handleUploadFile,
        handleDownloadFile,
        fileInFolder,
        folderFiles,
        userFolders,
    }}>
        {children}
    </AuthContext.Provider>
};


export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be inside of a AuthProvider")
    }

    return context;
}