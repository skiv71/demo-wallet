//@ts-check

import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';

// configuration

var config = {
    build: {
        formats: [`esm`, `umd`],
        sourcemap: true,
        dist: process.env.dist || `./dist`,
        file: process.env.file,
        minify: true
    },
    svelte: require(`./svelte.config`)
};

// lib

var build = {
    _file(name, format, minify) {
        return this._name(`${config.build.dist}/${name}.${format}`, minify, `.js`)
    },
    _name(file, minify, suffix = ``) {
        var f = minify
            ? `${file}.min`
            : file
        return suffix
            ? `${f}.${suffix.split(`.`).pop()}`
            : f
    },
    _sourcemap(minify) {
        return minify
            ? false
            : config.build.sourcemap 
    },
    output(input, format, minify = false) {
        var name = input
            .split(`/`)
            .pop()
            .split(`.`)
            .shift();
        var o = {
            exports: `auto`,
            file: this._file(name, format, minify),
            format,
            name: this._name(name, minify),
            sourcemap: this._sourcemap(minify)
        };
        return minify
            ? { ...o, plugins: [terser()] }
            : o
    }
};

// main

export default {
    get input() {
        return config.build.file;
    },
    get output() {
        var o = config.build.formats
            .map(f => build.output(this.input, f));
        return config.build.minify
            ? [...o, ...config.build.formats.map(f => build.output(this.input, f, true))]
            : o
    },
    get plugins() {
        return [
            svelte(config.svelte),
            resolve()
        ];
    }
};
