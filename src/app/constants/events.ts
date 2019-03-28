export class TemplateEvent {
    popevent: PopoverEvent;
    data: any;
    index: number;

    constructor(popevent: PopoverEvent, index: number, data: any) {
        this.popevent = popevent;
        this.data = data;
        this.index = index;
    }
}

export class PopoverEvent {
    name: UserEvents;
    param: any
    constructor(name: UserEvents, param: any) {
        this.name = name;
        this.param = param;
    }
}

export class LineWrapEvent {
    name: UserEvents;
    source: HTMLElement;

    constructor(name: UserEvents, source: HTMLElement) {
        this.name = name;
        this.source = source;
    }
}

export enum UserEvents {
    add = 'add', delete = 'delete'
}