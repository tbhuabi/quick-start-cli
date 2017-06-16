import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const markdownIt = require('markdown-it');
const hljs = require('highlight.js');
const md = markdownIt({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) {
                console.log(e);
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
            const template = value.html || '';
            const ts = value.ts || '';
            this.docHtml = md.render(doc);
            this.templateHtml = md.render('```html\n' + template + '\n```');
            this.tsHtml = md.render('```ts\n' + ts + '\n```');
            if (styleSheet) {
                this.styleSheetHtml = md.render('```scss\n' + styleSheet + '\n```');
            }
        }

    }

    setShowType(type) {
        this.showType = type;
    }
}