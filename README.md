# ShareShot

ShareShot is a Chrome extension that helps you easily share your full page screenshots or any part of it. It creates anonymous uploads of your screenshot to Imgur and generates an image URL (hosted on Imgur) for you to share with anyone.

To capture a screenshot, click on the extension icon or use the shortcut `Alt+Shift+Z` and it will open a tab (see below) with options to crop the screenshot and get an image link.

Note: This isn't yet published on the Chrome webstore.

## Screenshots

![](/screenshots/screenshot1.png)
<br/>
<br/>
![](/screenshots/screenshot2.png)

## Development

You will need this locally installed to work on the extension:
- NPM/Yarn
- Node v14+

### Steps:

- Fork this repo and clone it on your machine.
- Install the dependencies by:
```sh
npm install
```
- And then generate the build by:
```sh
npm run build
```

Now to test this unpacked on Chrome:
- Go to `chrome://extensions` page and turn on the developer mode.
- Click on the load unpacked button on the page and select the 'build' folder of this repo which was previously generated.

Now you can use the extension. If you changed the source and you would like to update, then regenerate the build by `npm run build` and click on the Update button on the Chrome extensions page.


## Other Stuff

- Thanks to Imgur for providing an anonymous upload API, so this extension does not require any credentials from client side.
- This is in active development so if you find any bug, want any addition or just make the code/docs a bit better, please create an issue/PR for it. 