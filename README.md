<p align="center">
    <img width="200" src="./public/assets/branding/logo_big.png" alt="CodeQuest logo">
    <h1 align="center">CodeQuest</h1>
    <h4 align="center">A digital learning platform to teach the basics of programming.</h4>
</p>

<hr/>
<br/>

This repository contains the source code for **CodeQuest**, a digital learning platform I've developed in my _bachelor's thesis_ at the [Hochschule Bremen](https://hs-bremen.de). The original (german) title of the thesis is `Entwicklung eines spielerischen Lernsystems zur Heranführung an die Grundlagen des Programierens`.

## Hosted version
There is a hosted version of **CodeQuest** available [here]().

## Development
The following steps are necessary to spin up a development environment for CodeQuest.

0. Make sure that you have [node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) installed.
1. Clone this repository
    ```bash
    $ git clone https://github.com/iUltimateLP/codequest
    ```
2. Install the npm dependencies (this might take a while!)
    ```bash
    $ cd codequest/
    $ npm install
    ```
3. Run the development server:
    ```bash
    $ npm run dev
    ```

After executing the above steps, you can access the CodeQuest frontend under [https://localhost:3000](https://localhost:3000).

## Dependencies
**CodeQuest** wouldn't have been possible without these amazing 3rd-party libraries and farmeworks:

 - [reactjs](https://react.dev/)
 - [nextjs](https://nextjs.org/)
 - [react-material-ui](https://mui.com/)
 - [blockly](https://developers.google.com/blockly) + [react-blockly](https://github.com/nbudin/react-blockly)
 - [monaco](https://microsoft.github.io/monaco-editor/)
 - [allotment](https://allotment.mulberryhousesoftware.com/)
 - [JS-interpreter](https://github.com/NeilFraser/JS-Interpreter)
 - [Comic Mono](https://dtinth.github.io/comic-mono-font/)
 - [notistack](https://notistack.com/)
 - [howler](https://howlerjs.com/)
 - [mui-markdown](https://github.com/HPouyanmehr/mui-markdown)
 - [sub-events](https://github.com/vitaly-t/sub-events)

## Special thanks
I'd like to extend my thanks to my professors _Prof. Dr. Thorsten Teschke_ and _Prof. Dr.-Ing. Lars Prädel_ for their support.