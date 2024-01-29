import {types} from "sass";
import Error = types.Error;

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

    abstract dragResizeWindow(): void

    abstract dragWindow(): void

    abstract dragWindowOver(): void

    abstract restoreWindow(): void

    abstract minimizeWindow(): void

    abstract maximizeWindow(): void

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
    handler = chrome["webview"]["hostObjects"]["handler"]

    async getFileTreeData() {
        return JSON.parse(await this.handler["GetFileTreeData"]())
    }

    async openFile() {
        await this.handler["OpenFile"]()
    }

    async newFile() {
        await this.handler["NewFile"]()
    }

    async exitApp() {
        await this.handler["ExitApp"]()
    }

    async getItemData(fileName: string, itemName: string) {
        let result = JSON.parse(await this.handler["GetItemData"](fileName, itemName))
        if (result["error_getting"]) throw ("Couldn't get Item Data, due to" + result["error_getting"])
        return result
    }

    async setItemData(fileName: string, itemName: string, itemData: any) {
        let json = JSON.stringify(itemData)
        await this.handler["SetItemData"](fileName, itemName, json)
    }

    async saveFile(fileName: string) {
        await this.handler["SaveFile"](fileName)
    }

    async closeFile(fileName: string) {
        await this.handler["CloseFile"](fileName)
    }

    async dragResizeWindow() {
        await this.handler["DragResizeWindow"]()
    }

    async dragWindow() {
        await this.handler["DragWindow"]()
    }

    async dragWindowOver() {
        await this.handler["DragWindowOver"]()
    }

    async maximizeWindow() {
        await this.handler["MaximizeWindow"]()
    }

    async minimizeWindow() {
        await this.handler["MinimizeWindow"]()
    }

    async restoreWindow() {
        await this.handler["RestoreWindow"]()
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

    dragResizeWindow() {
        this.throwInfo("drag to resize the Window")
    }

    dragWindow() {
        this.throwInfo("drag the Window")
    }

    dragWindowOver() {
        this.throwInfo("shop dragging the Window")
    }

    maximizeWindow() {
        this.throwInfo("maximize the Window")
    }

    minimizeWindow() {
        this.throwInfo("minimize the Window")
    }

    restoreWindow() {
        this.throwInfo("restore the Window")
    }
}
