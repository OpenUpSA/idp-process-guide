# Participation Guide frontend

WebFlow Export + ES6 built with parcel.

## Development environment

```bash
yarn install
yarn start
```

## Import Webflow Export

Install:
`npm install --global import-webflow-export`

Run:
`import-webflow webflow-export.zip`

More info here:
https://github.com/OpenUpSA/import-webflow-export

### Custom frontend hostnme

The frontend passes its hostname to the backend to supply relevant by default.
In development, you probably want to provide an alternative hostname.

Provide the hostname with the querystring variable `hostname`
e.g. visit http://localhost:1234/?hostname=somemunicipality.gov.za

### Custom backend hostname

The frontend connects to the production backend by default.
In development you might want to connect to an alternative backend.

Provide a custom backend URL using `promptapi` in the querystring
e.g. visit http://localhost:1234/?promptapi


## Production deployment

Ensure the backend has configuration for the frontend hostnames.

```bash
yarn
yarn build # compile the relevant bundles for production
```
