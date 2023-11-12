import {createVNode, render} from "vue";
import Alert from "../components/Alert.vue";

class AlertBuilder {
    private title: string
    private message: string
    private activeButton: AlertButton
    private negativeButton: AlertButton
    private neutralButton: AlertButton
    private dismissible: boolean = true

    setTitle(title: string): AlertBuilder {
        this.title = title
        return this
    }

    setDismissible(value: boolean): AlertBuilder {
        this.dismissible = value
        return this
    }

    setMessage(content: string): AlertBuilder {
        this.message = content
        return this
    }

    setActiveButton(label: string): AlertBuilder {
        this.activeButton = new AlertButton(AlertEventType.Positive, label)
        return this
    }

    setNeutralButton(label: string): AlertBuilder {
        this.neutralButton = new AlertButton(AlertEventType.Neutral, label)
        return this
    }

    setNegativeButton(label: string): AlertBuilder {
        this.negativeButton = new AlertButton(AlertEventType.Negative, label)
        return this
    }

    build(): AlertObject {
        const alert = new AlertObject()
        if (this.title != undefined) alert.title = this.title
        if (this.message != undefined) alert.message = this.message
        if (this.negativeButton != undefined) alert.buttons.push(this.negativeButton)
        if (this.neutralButton != undefined) alert.buttons.push(this.neutralButton)
        if (this.activeButton != undefined) alert.buttons.push(this.activeButton)
        alert.dismissible = this.dismissible
        return alert
    }

    show(): Promise<AlertEventType> {
        return this.build().show();
    }
}

export class AlertButton {
    type: AlertEventType
    label: string

    constructor(type: AlertEventType, label: string) {
        this.type = type
        this.label = label
    }
}

export class AlertObject {
    title: string
    message: string
    buttons: AlertButton[] = []
    dismissible: boolean

    show(): Promise<AlertEventType> {
        return new Promise((resolve) => {
            const onCloseAlert = (event: AlertEventType) => {
                console.log("弹窗：" + event.toString())
                resolve(event)
            }

            // const removeAlert = () => document.body.removeChild(element)

            const element = document.createElement("div")
            document.body.appendChild(element)
            render(createVNode(Alert, {
                title: this.title,
                message: this.message,
                buttons: this.buttons,
                dismissible: this.dismissible,
                onCloseAlert: onCloseAlert,
                onCloseAlertAnimationFinished: () => document.body.removeChild(element),
            }), element)
        })
    }


}

export enum AlertEventType {
    Positive,
    Neutral,
    Negative,
    Dismiss,
}

export default AlertBuilder
