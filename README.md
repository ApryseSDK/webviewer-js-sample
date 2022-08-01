# WebViewer Server API Wrapper / Bugreport

 getPDF does not include filled in Form Fields

 This demo app is based on WebViewer - JS Sample (https://github.com/PDFTron/webviewer-js-sample)

## Summary

 The [getPDF](https://www.pdftron.com/documentation/web/guides/wv-server-wrapper/#getpdf) function of WebViewer Server API Wrapper 
 does not seem to include the Text entered into Form fields, even when this data is correctly passed in the xfdf String of the options object.

## Demo App

This Demo includes a docker-compose file which starts a local instance of the latest Webviewer Server.

The javascript/parcel app creates an instance of Webviewer, and loads an example
pdf-form document which is hosted on a cloudfront URL. 
A custom action button is added to the UI, which kicks of the following:
  * calls the annotationManager.exportAnnotations function to get the xfdf string,
  which does include the data of the filled in form fields
  * doc-URL and xfdf string are then passed in to the WebViewerServer.getPDF API,
    and the conversion result Uri is logged to the Javascript console.

## Initial setup

Before you begin, make sure your development environment includes 
  * [Node.js](https://nodejs.org/en/).
  * [docker compose](https://docs.docker.com/compose/install/)

### Install

```
git clone https://github.com/PDFTron/webviewer-js-sample.git
cd webviewer-js-sample
npm install
```

Create a `.env` file containing the following key:
```properties
YOSHIE_PDFTRON_WEBVIEWER_LICENCE_KEY="..."
```

fill in your Pdftron licence data


## Reproduce Problem (Form Field data not exported)

```
docker compose up -d
npm start
```

After the app starts, you will be able to see WebViewer running on `localhost:1234`,
with the example "PDF Form Example" document loaded.



  * Open Browser Devtools / Console
  * Fill in "Given Name" form field in the document
  * Click the Custom Action Button in the top right
  * Notice how the xfdf string logged to the console does include 
   the data for the filled in form field.
  * Click on the getPDF Result Uri which is logged to the console.
    The generated Document from does not include the filled in form data.

