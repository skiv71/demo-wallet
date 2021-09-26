Demo Wallet
===========

Introduction
------------

A repo designed to develop and publish web components.

Installation
------------

```
yarn
```
(recommended over npm, as the package.json contains resolutions to dependancy vulnerabilties)

Structure
---------

(The default folders)

```
./src -
    ./demo-wallet.svelte (build entry point)

./dist - 
    ./ (...build artifacts are placed here)

./html - 
    ./local.html (for local component testing / loading)
    ./public.html (file for public component loading / unpkg, jsdelivr)

./scripts - 
    ./ (package.json scripts)
```

Unpkg
-----

This service allows you to consume the published npm module directly in the browser.

You will need to publish your package via ```npm publish```

It allows: -

a). @org/demo-wallet - latest release (via package.json, main or module) 

b). @org/demo-wallet@1.0.3 - specifc version 1.0.3 

c). @org/demo-wallet@^1.0.3 - 1.0.3 or later

Jsdelivr
--------

This service allows you to consume directly from github, but has some caveats: -

a). The need to specify the actual file you wish to use (as opposed to the package.json definition)

b). Github releases have to be defined manually (either via github.com or their cli).

c). Package.json becomes largely redundant (version and file).

Usage
-----

Use the root component file to define the entry point and code in accordance with the library api (svelte in this case).

```yarn run serve:local``` - web server, using the ./html/local.html file 

```yarn run serve:public``` - as above, but uses .html/public.html

```yarn run build``` - builds artifacts, saved in ./dist, as per rollup config (esm, umd), with minified versions.

Note
----

The above web servers watch ./dist (and the respective *.html file), so changes (i.e. build) will trigger a hot reload.

By default, local.html serves on 1234 and public.html on 1235, so you there's no confusion as to which environment is being tested.

