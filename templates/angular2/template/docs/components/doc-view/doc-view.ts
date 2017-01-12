import { Component, Input, OnInit } from '@angular/core';

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
    @Input()
    doc: string = '';
    @Input()
    styleSheet: string = '';
    @Input()
    template: string = '';
    @Input()
    ts: string = '';

    showType: string = 'example';

    docHtml: string = '';
    styleSheetHtml: string = '';
    templateHtml: string = '';
    tsHtml: string = '';

    ngOnInit() {
        this.docHtml = md.render(this.doc);
        this.styleSheetHtml = md.render('```scss\n' + this.styleSheet + '\n```');
        this.templateHtml = md.render('```html\n' + this.template + '\n```');
        this.tsHtml = md.render('```ts\n' + this.ts + '\n```');
    }

    setShowType(type) {
        this.showType = type;
    }
}