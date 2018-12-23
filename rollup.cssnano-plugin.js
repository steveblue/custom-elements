// rollup-plugin-inline-postcss.js
import { createFilter } from 'rollup-pluginutils';
const postcss = require('postcss');
const csso = require('postcss-csso');

export default function inlineCSS ( options = {} ) {
  const filter = createFilter( options.include, options.exclude );
  options.postcss = postcss;
  options.styleRegex = /css\`((?:\\.|[^"\\])*)\`/g;

  return {
    name: 'inline-postcss',
    transform ( code, id ) {
      if ( !filter( id ) ) return;
      if ( !code.match(options.styleRegex) ) return;
      try {

        const css = code.match(options.styleRegex)[0].split('`')[1];
        return postcss([csso]).process(css, { from: undefined })
                  .then(result => {
                    code = code.replace(options.styleRegex, `css\`${result.css}\``);
                     return {
                      code: code
                    }
                })

      }
      catch (error) {
          if (options.failOnError) {
              this.error(error.message);
          }
          else {
              this.warn(error.message);
          }
      }

    }
  };
}