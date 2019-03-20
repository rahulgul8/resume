export function getData(placeholder: string, hideIfEmpty?: boolean, value?: string) {
    let data: any = new Object();
    data.placeholder = placeholder;
    data.hideIfEmpty = hideIfEmpty;
    data.value = value;
    return data;
}