//@ts-check

// plugins

import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

// package.json

var pkg = require('./package.json')

// config

var config = {
    input: process.env.INPUT_FILE,
    dist: process.env.OUTPUT_DIR || `./dist`,
    build: process.env.BUILD_ENV || `dev`,
    formats: [`umd`, `esm`],
    sourcemap: true,
    minify: true
};

// lib

var build = {
    _file(name, format, min) {
        var f = [name, format, min ? `min` : ``, `js`]
            .filter(s => s)
            .join(`.`)
        return `${config.dist}/${f}`
    },
    _name() {
        return config.input
            .split(`/`)
            .pop()
            .split(`.`)
            .shift()
    },
    _output(format, min) {
        var name = this._name()
        var file = this._file(name, format, min)
        return {
            exports: `auto`,
            format,
            file,
            name,
            plugins: this._plugins(min),
            sourcemap: min && config.sourcemap && !build.production ? `inline` : false
        }
    },
    _plugins(min = false) {
        return min
            ? [terser()]
            : []
    },
    element() {
        var el = pkg.name
            .split(`/`)
            .pop()
        if (!el.includes(`-`))
            throw new Error(`Please use a package name with a hypen!`)
        return el
    },
    output(min = false) {
        return config.formats
            .map(f => this._output(f, min))
    },
    get production() {
        return config.build.toLowerCase().includes(`production`)
    }
}

// main

export default {
    get input() {
        return config.input
    },
    get output() {
        var o = build.output()
        return config.minify
            ? [...o, ...build.output(true)]
            : o
    },
    get plugins() {
        return [
            svelte({ include: config.input, compilerOptions: { customElement: true, tag: build.element() }}),
            svelte({ include: `./src/*/**/*`, emitCss: false }),
            resolve()
        ];
    }
};
