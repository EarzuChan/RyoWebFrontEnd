declare const chrome: any;

abstract class DataManager {
    abstract getFileTreeData(): any

    abstract openFile(): void

    abstract newFile(): void

    abstract saveFile(fileName: string): void

    abstract closeFile(fileName: string): void

    abstract exitApp(): void

    private static instance: DataManager

    abstract getItemData(fileName: string, itemName: string): any

    abstract setItemData(fileName: string, itemName: string, itemData: any): void

    static getInstance(): DataManager {
        if (!this.instance) {
            if (chrome && chrome["webview"]) {
                this.instance = new DesktopBackendDataManager()
            } else {
                this.instance = new NoBackendOrUnsupportedDataManager()
            }
        }
        return this.instance
    }
}

export default DataManager

class DesktopBackendDataManager implements DataManager {
    massServer = chrome["webview"]["hostObjects"]["massServer"]

    async getFileTreeData() {
        return JSON.parse(await this.massServer.GetFileTreeData())
    }

    async openFile() {
        await this.massServer.OpenFile()
    }

    async newFile() {
        await this.massServer.NewFile()
    }

    async exitApp() {
        await this.massServer.ExitApp()
    }

    async getItemData(fileName: string, itemName: string) {
        let result = JSON.parse(await this.massServer.GetItemData(fileName, itemName))
        if (result["error_getting"]) throw("Couldn't get Item Data, due to" + result["error_getting"])
        return result
    }

    async setItemData(fileName: string, itemName: string, itemData: any) {
        let json = JSON.stringify(itemData)
        await this.massServer.SetItemData(fileName, itemName, json)
    }

    async saveFile(fileName: string) {
        await this.massServer.SaveFile(fileName)
    }

    async closeFile(fileName: string) {
        await this.massServer.CloseFile(fileName)
    }
}

class NoBackendOrUnsupportedDataManager implements DataManager {
    getFileTreeData() {
        this.throwInfo("get File Tree Data")
    }

    openFile() {
        this.throwInfo("open file")
    }

    newFile() {
        this.throwInfo("create new file")
    }

    exitApp() {
        this.throwInfo("exit app")
    }

    getItemData(_: string, __: string): any {
        this.throwInfo("get Item Data")
    }

    throwInfo(doSth: string) {
        throw new Error(`Cannot ${doSth} while there's no backend or the backend is unsupported.`)
    }

    setItemData(_: string, __: string, ___: any) {
        this.throwInfo("set Item Data")
    }

    saveFile(_: string) {
        this.throwInfo("save file")
    }

    closeFile(_: string) {
        this.throwInfo("close file")
    }
}
