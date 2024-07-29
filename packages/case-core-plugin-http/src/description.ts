import {
  CORE_PLUGIN_PREFIX,
  PluginDescription,
} from '@contract-case/case-plugin-base';
import { pluginVersion } from './version';

export const description: PluginDescription = {
  humanReadableName: 'HTTP (REST) plugin',
  shortName: 'http',
  // Note: If using this code as an example for your own plugin,
  // DO NOT start your plugin name with the core plugin prefix
  // or ContractCase will not log debug information / load failures appropriately
  uniqueMachineName: `${CORE_PLUGIN_PREFIX} http / Rest Plugin`,
  version: pluginVersion,
};
