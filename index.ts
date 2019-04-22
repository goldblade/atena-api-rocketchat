import {
    IConfigurationExtend,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { SettingType } from '@rocket.chat/apps-engine/definition/settings';
import {
  AtenaRankingSlashCommand,
  AtenaGeneralRankingSlashCommand,
  AtenaMypointsSlashCommand,
  AtenaGivePointsSlashCommand,
  AtenaSuggestionSlashCommand,
  AtenaMinhasConquistasSlashCommand,
  AtenaOpenSourceSlashCommand,
  AtenaMostActiveSlashCommand,
  AtenaProSlashCommand,
} from './slashcommand';

export class AtenaApiRocketChatApp extends App {
    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    }

    protected async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
      await configuration.slashCommands.provideSlashCommand(new AtenaRankingSlashCommand(this));
      await configuration.slashCommands.provideSlashCommand(new AtenaMypointsSlashCommand(this));
      await configuration.slashCommands.provideSlashCommand(new AtenaGivePointsSlashCommand(this));
      await configuration.slashCommands.provideSlashCommand(new AtenaSuggestionSlashCommand(this));
      await configuration.slashCommands.provideSlashCommand(new AtenaGeneralRankingSlashCommand(this));
      await configuration.slashCommands.provideSlashCommand(new AtenaMinhasConquistasSlashCommand(this));
      await configuration.slashCommands.provideSlashCommand(new AtenaOpenSourceSlashCommand(this));
      await configuration.slashCommands.provideSlashCommand(new AtenaMostActiveSlashCommand(this));
      await configuration.slashCommands.provideSlashCommand(new AtenaProSlashCommand(this));

      await configuration.settings.provideSetting({
          id: 'server',
          type: SettingType.STRING,
          packageValue: 'https://atena.impulso.network',
          required: true,
          public: true,
          i18nLabel: 'server',
          i18nDescription: 'server_description',
        });
    }
}
