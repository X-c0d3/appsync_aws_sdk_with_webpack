// require('./test-client');
import 'isomorphic-unfetch';
import * as es6Promise from 'es6-promise';
import gql from 'graphql-tag';

const AWSAppSyncClient = require('../bundle/appsync_lib').AWSAppSyncClient;
const AUTH_TYPE = require('../bundle/appsync_lib').AUTH_TYPE;

// (global as any).WebSocket = require('ws');
// (global as any).fetch = require('node-fetch');

// (window as any).LOG_LEVEL = 'DEBUG';
// (global as any).window = (global as any).window || {
//     setTimeout,
//     clearTimeout,
//     WebSocket: (global as any).WebSocket,
//     ArrayBuffer: global.ArrayBuffer,
//     addEventListener: () => { },
//     navigator: { onLine: true },
// };

es6Promise.polyfill();

const client = new AWSAppSyncClient({
    url: 'https://gtmreadhpneddmkwhw6pp2aayu.appsync-api.us-east-1.amazonaws.com/graphql',
    region: 'us-east-1', // or whatever your region is
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: () => 'da2-psjriuztibcbdl4wjnzqkvs2wa'
    },
    disableOffline: true
});

client.hydrated().then(function (client: any) {
    let req = {
        filter: {
            name: 'Eikon5AutoSave_Workspace 1.elw'
        }
    };
    client.query({
        variables: req,
        query: gql`
            query x($filter: EikonWorkspaceFilter!){
                eikonWorkspace(filter: $filter) {
                        items {
                            id
                            name
                            apps {
                                id
                                name
                                title
                                url
                            }
                        }
                }
        }`
    }).then((data: any) => console.log(JSON.stringify(data, undefined, 2)))
        .catch((error: any) => console.error(error));
});
