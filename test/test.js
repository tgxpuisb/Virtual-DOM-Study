const h = require('../dist/h').default

console.log(h('div#container.tow.classes', {}, [
    h('span', {style: {fontSize: '12px'}}, 'this is 12px'),
    ' and this is a test',
    h('a', {props: {href: '/link'}}, 'this is a link')
]))