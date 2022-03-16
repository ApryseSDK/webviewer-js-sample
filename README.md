# WebViewer - JS Sample

[WebViewer](https://www.pdftron.com/documentation/web/) is a powerful JavaScript-based PDF Library that's part of the [PDFTron SDK](https://www.pdftron.com). It provides a slick out-of-the-box responsive UI that interacts with the core library to view, annotate and manipulate PDFs, MS Office, videos, images, and CAD that can be embedded into any web project.

![WebViewer UI](https://www.pdftron.com/downloads/pl/webviewer-ui.png)

This repo is specifically designed for any users interested in integrating WebViewer into a vanilla JS project.

## Demo

You can explore all of the functionality in our [showcase](https://www.pdftron.com/webviewer/demo/).

## Initial setup

Before you begin, make sure your development environment includes [Node.js](https://nodejs.org/en/).

## Install

```
git clone https://github.com/PDFTron/webviewer-js-sample.git
cd webviewer-js-sample
npm install
```

## Run

```
npm start
```

After the app starts, you will be able to see WebViewer running on `localhost:1234`.

## Static Resources

WebViewer requires static resources. [parcel-reporter-multiple-static-file-copier](https://www.npmjs.com/package/parcel-reporter-multiple-static-file-copier) does the job for us by copying the resources into statically served directory:

```
  "multipleStaticFileCopier": [
    {
      "origin": "node_modules/@pdftron/webviewer/public",
      "destination": "dist/public/webviewer"
    }
  ]
```

You can manually copy it, use a `postinstall` script or leverage parcel.

Remember to install `@parcel/config-default` and configure `.parcelrc`:

```
{
  "extends": "@parcel/config-default",
  "reporters": [
    "...",
    "parcel-reporter-multiple-static-file-copier"
  ]
}
```

## WebViewer APIs

See [API documentation](https://www.pdftron.com/documentation/web/guides/ui/apis).

## License

See [license](./LICENSE).
![](https://onepixel.pdftron.com/webviewer-react-sample)
