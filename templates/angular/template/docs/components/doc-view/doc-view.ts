import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as marked from 'marked';
import * as hljs from 'highlight.js';

let cssLanguage = require('../../../config/css-config.json').language;

const md = marked.setOptions({
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) {
                console.error(e);
            }
        }

        return '';
    }
});

@Component({
    selector: 'doc-view',
    templateUrl: 'doc-view.html',
    styleUrls: ['doc-view.css']
})
export class DocViewComponent implements OnInit {
    showType: string = 'example';

    docHtml: string = '';
    styleSheetHtml: string = '';
    templateHtml: string = '';
    tsHtml: string = '';

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        const value = this.activatedRoute.data['value'];
        if (value) {
            const doc = value.doc || '';
            const styleSheet = value.styleSheet || '';
            const ts = value.ts || '';
            let template = value.html || '';
            template = template.replace(/^[\s\n]*<doc-view>[\s\n]*|[\s\n]*<\/doc-view>[\s\n]*$/g, '');
            template = template.replace(/^\s\s/mg, '');

            this.docHtml = md(doc);
            this.templateHtml = md('```html\n' + template + '\n```');
            this.tsHtml = md('```ts\n' + ts + '\n```');
            if (styleSheet) {
                this.styleSheetHtml = md('```' + cssLanguage + '\n' + styleSheet + '\n```');
            }
        }

    }

    setShowType(type: string) {
        this.showType = type;
    }
}