import Vue from 'vue';

<% var framework = options.framework || {} %>

<% if (!framework || framework === 'all') { %>
import Quasar from 'quasar';
Vue.use(Quasar, {});
<% } else { %>
  <% var components = framework.components || [] %>
  <% var directives = framework.directives || [] %>
  <% var plugins = framework.plugins || [] %>
  <% var config = framework.config %>

import Quasar, {
<%= components
      .concat(directives)
      .concat(plugins)
      .map(s => '\t' + s)
      .join(',\n') + ',\n' %>
} from 'quasar/src/index.esm';

Vue.use(Quasar, {
  <% if (config) { %>
  config: <%= JSON.stringify(config, null, '\t') %>,
  <% } %>
  <% if (components && components.length) { %>
  components: {
<%= components.map(s => '\t\t' + s).join(',\n') + ',\n' %>
  },
  <% } %>
  <% if (directives && directives.length) { %>
  directives: {
<%= directives.map(s => '\t\t' + s).join(',\n') + ',\n' %>
  },
  <% } %>
  <% if (plugins && plugins.length) { %>
  plugins: {
<%= plugins.map(s => '\t\t' + s).join(',\n') + ',\n' %>
  },
  <% } %>
});
<% } %>

<% if (options.supportIE) { %>
import 'quasar/src/ie-compat/ie.js';
<% } %>
