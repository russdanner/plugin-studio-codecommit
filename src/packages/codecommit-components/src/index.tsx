import { PluginDescriptor } from '@craftercms/studio-ui';
import CreatePullRequest from './components/CreatePullRequest'

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.codecommit',
  widgets: {
    'org.rd.plugin.codecommit.CreatePullRequest': CreatePullRequest  
  }
};

export { CreatePullRequest };

export default plugin;