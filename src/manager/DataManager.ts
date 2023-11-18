/*import {TreeParent} from "../views/SidePanel.vue"*/

declare const chrome: any

class DataManager {
    private static instance: DataManager;

    static getInstance() {
        if (!this.instance) {
            this.instance = new DataManager();
        }
        return this.instance;
    }

    private readonly backendType: BackendType

    //private chromeMassServer: any

    private constructor() {
        if (chrome["webview"]) {
            this.backendType = BackendType.WindowsDesktopBackend
        } else {
            this.backendType = BackendType.NoBackend
        }

        console.log(this.backendType)
    }


    // 实例方法，打印name
    async getFileTreeData() {
        if (this.backendType == BackendType.WindowsDesktopBackend) {
            return JSON.parse(await chrome["webview"]["hostObjects"]["massServer"].GetMasses())
        } else {
            throw new Error("Cannot get File Tree Data while there's no backend or the backend is unsupported.")
        }
    }

    async openFile() {
        if (this.backendType == BackendType.WindowsDesktopBackend) {
            await chrome["webview"]["hostObjects"]["massServer"].OpenFile()
        } else {
            throw new Error("Cannot open file while there's no backend or the backend is unsupported.")
        }
    }

    async newFile() {
        if (this.backendType == BackendType.WindowsDesktopBackend) {
            await chrome["webview"]["hostObjects"]["massServer"].NewFile()
        } else {
            throw new Error("Cannot create new file while there's no backend or the backend is unsupported.")
        }
    }

    async exitApp() {
        if (this.backendType == BackendType.WindowsDesktopBackend) {
            await chrome["webview"]["hostObjects"]["massServer"].ExitApp()
        } else {
            throw new Error("Cannot exit app while there's no backend or the backend is unsupported.")
        }
    }
}

enum BackendType {
    NoBackend,
    WindowsDesktopBackend,
}

export default DataManager