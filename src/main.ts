const message: string = 'Hello, World!!!!';

const body = document.getElementById("body");

let heading = document.createElement('h1');
heading.textContent = message;

body?.appendChild(heading);