import { TemplateRef } from '@angular/core';

export class ParentTemplate {

    templates = [];

    updateTemplates() {
        for (let field in this) {
            console.log(field, this[field]);
            if (this[field] instanceof TemplateRef) {
                this.templates.push({ name: field, template: this[field] });
            }
        }
    }

    constructor() {
        this.updateTemplates();
    }
}