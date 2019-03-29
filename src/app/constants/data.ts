import { TemplateRef } from '@angular/core';

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


export function clone(obj: any) {
    var copy;

    if (obj.skipClone) {
        return obj;
    }
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        copyObject(obj, copy);
        return copy;
    }

    if (obj instanceof TemplateRef) {
        return obj;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        copyObject(obj, copy);
        return copy;
    }

    return obj;
}

export function cloneForTemplating(data) {
    let cloned = clone(data);
    cloned.hide = false;
    cloned.cloned = true;
    return cloned;
}

export function cloneArrayForTemplating(...datas) {
    return datas.map(d => cloneForTemplating(d))
}

function copyObject(obj, copy) {
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            if (!obj.copyValue && attr == 'value') {
                copy[attr] = '';
            } else {
                copy[attr] = clone(obj[attr]);
            }
        }
    }
}
