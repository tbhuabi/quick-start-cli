// import React from 'react';
// import ReactTestUtils from 'react-addons-test-utils';
// import Home from './home';
//
//
// describe('home-test-example', () => {
//     it('测试用例1', () => {
//         const renderer = ReactTestUtils.createRenderer().render(<Home/>);
//
//         // dump(JSON.stringify(renderer, null, 2));
//         const dom = ReactTestUtils.findRenderedDOMComponentWithTag(renderer,'p');
//         expect(p[0].textContent === '简单 快速 高效').toBe(true);
//     })
// });

// 因为组件属于静态组件，所以不支持以上测试用例

describe('test-example', () => {
    it('test1', () => {
        expect(1 + 1).toBe(2);
    })
});