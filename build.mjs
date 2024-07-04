import esbuild from 'esbuild';

await esbuild.build({
    entryPoints: [ 'src/index.ts' ],
    outfile: 'dist/index.js',
    target: 'esnext',
    sourcemap: true,
    minify: false,
    bundle: true
});
