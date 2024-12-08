
# MetaProject Zeus GUI

This application provides GUI for MetaProject Zeus.


## Authors

- [Adam Valalský (@adamvalalsky)](https://www.github.com/adamvalalsky)


## Run Locally

1. Clone project and navigate to the project directory.
1. Copy variables from `.env.example` to `.env`
1. Change variables accordingly (see section `Environment Variables`)
1. Then start server

```bash
  docker compose up
```
## Environment Variables

If you want to test this project, you need to copy variables from `.env.example` to `.env` and fill some variables with your values. Most values are fine for local testing and don't have to be changed, but some values should be registered correctly. This is list of variables that should be changed for local development:

```
VITE_IDENTITY_CLIENT_ID=my-client
```
Need to use correct e-infra OIDC server. Values for testing MetaProject Zeus server won't be public and will be provided by other channel.


## Deployment

When deploying this project, you have to build static files locally (in future, this process can be part of production pipeline).

First navigate to `web` folder

```
cd web
```

Then install node_modules (if you ran `docker compose up`, `node_modules` folder may have errors so it is better to delete it first, if exists)

```
rm -rf node_modules && npm i
```

Then build production application

```
npm run build
```

Resulting application is in `web/dist/` folder, you can copy it to webserver.

## License

[MIT](https://choosealicense.com/licenses/mit/)

