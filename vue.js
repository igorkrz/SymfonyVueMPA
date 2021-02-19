import Vue from "vue/dist/vue.esm.js";
import App from './dist/app.vue';
import '@babel/polyfill';

// Fetch data from data attributes

const dataAttribute = document.querySelector('#route');
const componentRoute = dataAttribute.dataset.route;
const componentName = dataAttribute.dataset.name;
const identifier = '#' + componentName;
const dataID = dataAttribute.dataset.id;

const requireComponent = require.context(
    // Look for files in the current directory
    './dist/vue/',
    // Do not look in subdirectories
    false,
    // Include all .vue files
    /[\w-]+\.vue$/
)

// For each matching file name...
requireComponent.keys().forEach((fileName) => {
     // Get the component config
     const componentConfig = requireComponent(fileName)
     // Get the PascalCase version of the component name
     const componentName = fileName
         // Remove the "./_" from the beginning
         .replace(/^\.\//, '')
         // Remove the file extension from the end
         .replace(/\.\w+$/, '')
         // Split up kebabs
         .split('-')
         // Upper case
         .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
         // Concatenated
         .join('')
     // Globally register the component
     Vue.component(componentName, componentConfig.default || componentConfig)
})

// Create root element

new Vue({
     components: { App },
     data: function () {
          return {
               componentName: componentName,
               componentRoute: componentRoute,
               dataID: dataID
          }
     },
     template: '<app></app>',
     render: h => h(App)
}).$mount(identifier)
