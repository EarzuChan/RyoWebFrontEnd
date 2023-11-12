import {TreeParent} from "../views/SidePanel.vue"

declare namespace chrome {
}

class DataManager {
    private static instance: DataManager;

    static getInstance() {
        if (!this.instance) {
            this.instance = new DataManager();
        } else {
            console.log("呃呃")
            console.log(this.instance)
        }
        return this.instance;
    }

    private backendType: BackendType = BackendType.NoBackend
    //private chromeMassServer: any

    private constructor() {
        if (chrome["webview"]["hostObjects"] != null) {
            this.backendType = BackendType.WindowsDesktopBackend
            // this.chromeMassServer = chrome["webview"]["hostObjects"]["chromeMassServer"]
        }

        console.log(this.backendType)
    }


    // 实例方法，打印name
    async getFileTreeData() {
        if (this.backendType == BackendType.WindowsDesktopBackend) {
            return await chrome["webview"]["hostObjects"]["chromeMassServer"].GetMasses()
        } else {
            throw new Error("Cannot get File Tree Data while there's no backend or the backend is unsupported.")
        }
    }

    async openFile() {
        if (this.backendType == BackendType.WindowsDesktopBackend) {
            await chrome["webview"]["hostObjects"]["chromeMassServer"].OpenFile()
        } else {
            throw new Error("Cannot open file while there's no backend or the backend is unsupported.")
        }
    }
}

enum BackendType {
    NoBackend,
    WindowsDesktopBackend,
}

export default DataManager