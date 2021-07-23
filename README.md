# Behodler UI Container
The Behodler UI has a base shell or container project which imports micro front ends via npm. 

# Development
Installing dependencies from `@behodler` scope requires authenticating with Github private npm registry. It can be done either by using `npm login`:
```
npm login --registry=https://npm.pkg.github.com --scope=@behodler
```
After running the above command, npm client asks for Github username, password (this value has to be equal to a Github `Personal access token` configured with proper privileges), and an email address connected to your Github account.

`npm login` updates the global `.npmrc` file (its location defaults to `$HOME/.npmrc`). It can be also updated manually instead of using `npm login`. The modified `.npmrc` should look like this:
```
@behodler:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=GITHUB_PERSONAL_ACCESS_TOKEN_VALUE
```
`GITHUB_PERSONAL_ACCESS_TOKEN_VALUE` has to be replaced with the actual value of your Personal access token, obviously :)

After this is configured, running `yarn install` should install dependencies. `yarn start` will then start dev server on `http//:localhost:3000`.

## Docker
Ideally, do not run npm against package.json directly. Instead make use of docker-compose for a reliable experience.
Docker-compose interactions are all summarized by scripts in package.json. Add to scripts as necessary.

## Contributions

**Please open all pull requests against the `main` branch.**
CI checks will run against all PRs.
