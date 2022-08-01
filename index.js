import WebViewer from '@pdftron/webviewer';
import * as WVServerWrapper from './WVSApiWrapper';

let {NODE_ENV, YOSHIE_PDFTRON_WEBVIEWER_LICENCE_KEY} = process.env;
const formExampleDocUrl = 'https://d2w8cy4i4z79x8.cloudfront.net/OoPdfFormExample.pdf';

const element = document.getElementById('viewer');
annotationsLoaded = false;

const newActionButton = {
  type: 'actionButton',
  img: 'share-svgrepo-com',
  onClick: () => {
    alert('Hello world!');
  },
  dataElement: 'alertButton',
  hidden: [ 'mobile' ]
};

const onLoad = async (instance) => {
  const { documentViewer, annotationManager, Annotations } = instance.Core;

  instance.UI.setHeaderItems(header => {
    header.push({
      type: 'actionButton',
      img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
      onClick: () => {
        // save the annotations
        annotationManager.exportAnnotations({ links: false, widgets: false }).then((xfdf) => {
          console.log(xfdf);
          console.log('calling wvserver getpdf...');
          const server = WVServerWrapper.WebViewerServer( {
            serverUrl: 'http://localhost:8090'
          });
          server.getPDF({
            uri: formExampleDocUrl,
            extension: 'pdf',
            xfdf: xfdf,
          }).then(uri => {
            console.log('getPDF Result Uri:');
            console.log(uri[0]);
          }).catch(e => {
            console.log(e);
          });
          
        });
      }
    });
  });

  documentViewer.addEventListener('annotationsLoaded', async () => {
    console.log('annotationsLoaded');
    annotationsLoaded = true;
  });

};

WebViewer(
  {
    path: '/public/webviewer',
    initialDoc:
      'https://d2w8cy4i4z79x8.cloudfront.net/OoPdfFormExample.pdf',
    licenseKey: YOSHIE_PDFTRON_WEBVIEWER_LICENCE_KEY
  },
  element
).then((instance) => {
  onLoad(instance);
});
