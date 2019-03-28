## HCG

This assumes you have a src folder in your root directory, and inside src, you have a components folder (if not, will generate one for you).  
Presets are coming soon with multiple snippets to gen components more easily.

> npm install hcg --save-dev

or  ( I swing both ways )

> yarn add hcg --dev

I recommend creating a script inside your package.json like so:  
~~~
package.json 
{
    "scripts": {
       "gen-comp": "node ./node_modules/hcg/index.js"  
    }  
}
~~~  
Enjoy 😉😉😉
