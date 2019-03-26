
export function getData(placeholder: string, hideIfEmpty?: boolean, value?: string) {
    let data: any = new Object();
    data.placeholder = placeholder;
    data.hideIfEmpty = hideIfEmpty;
    data.value = value;
    return data;
}

export function getDataWithTemplate(placeholder: string, element: any, templateName: string, hideIfEmpty?: boolean, value?: string) {
    let data: any = new Object();
    data.placeholder = placeholder;
    data.hideIfEmpty = hideIfEmpty;
    data.value = value;
    data.templateName = templateName;
    data.template = function () {
        console.log(element[this.templateName])
        return element[this.templateName];
    }
    return data;
}