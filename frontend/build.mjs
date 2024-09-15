import * as esbuild from 'esbuild'
import path from 'node:path'

await esbuild.build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
    outfile: '../backend/web/static/js/bundle.js',
});