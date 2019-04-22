import { App } from '@rocket.chat/apps-engine/definition/App';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IHttp, ILogger, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { sdk } from './sdk';

export class AtenaSlashCommand {

  public command: string;
  public i18nParamsExample: string;
  public i18nDescription: string;
  public providesPreview: boolean;

  protected async sendMessage(context: SlashCommandContext, modify: IModify, text: IMessage): Promise<void> {
    const msg = modify.getCreator()
      .startMessage()
      .setData(text)
      .setEmojiAvatar(':atena:')
      .setUsernameAlias('atena')
      .setRoom(context.getRoom())
      .setSender(context.getSender());
    await modify.getNotifier().notifyUser(context.getSender(), msg.getMessage());
  }

}

export class AtenaRankingSlashCommand extends AtenaSlashCommand implements ISlashCommand {

  constructor(private readonly app: App) {
    super();
    this.command = 'ranking';
    this.i18nParamsExample = 'ranking.params_example';
    this.i18nDescription = 'ranking.command_description';
    this.providesPreview = false;
  }

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    // const [command] = context.getArguments();
    // const server = await read.getEnvironmentReader().getSettings().getValueById('server');
    // const url = server;
    const [month, customServer] = context.getArguments();
    const data = await sdk.getRanking(http, read, context.getSender(), month, customServer);
    if (data) {
      return await this.sendMessage(context, modify, data);
    }
    return;
  }
}

export class AtenaMypointsSlashCommand extends AtenaSlashCommand implements ISlashCommand {

  constructor(private readonly app: App) {
    super();
    this.command = 'meuspontos';
    this.i18nParamsExample = 'score.params_example';
    this.i18nDescription = 'score.command_description';
    this.providesPreview = false;
  }

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [customServer] = context.getArguments();
    const uri = 'bot/commands/score';
    const data = await sdk.getCommand(http, read, context.getSender(), uri, customServer);

    if (data) {
      return await this.sendMessage(context, modify, data);
    }
    return;
  }
}

export class AtenaGivePointsSlashCommand extends AtenaSlashCommand implements ISlashCommand {

  constructor(private readonly app: App) {
    super();
    this.command = 'darpontos';
    this.i18nParamsExample = 'sendpoints.params_example';
    this.i18nDescription = 'sendpoints.command_description';
    this.providesPreview = false;
  }

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [customServer] = context.getArguments();
    const uri = 'bot/commands/sendpoints';
    const data = await sdk.getCommand(http, read, context.getSender(), uri, customServer);
    if (data) {
      return await this.sendMessage(context, modify, data);
    }
    return;
  }
}

export class AtenaSuggestionSlashCommand extends AtenaSlashCommand implements ISlashCommand {

  constructor(private readonly app: App) {
    super();
    this.command = 'sugestao';
    this.i18nParamsExample = 'feedback.params_example';
    this.i18nDescription = 'feedback.command_description';
    this.providesPreview = false;
  }

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [customServer] = context.getArguments();
    const uri = 'bot/commands/feedback';
    const data = await sdk.getCommand(http, read, context.getSender(), uri, customServer);
    if (data) {
      return await this.sendMessage(context, modify, data);
    }
    return;
  }
}

export class AtenaGeneralRankingSlashCommand extends AtenaSlashCommand implements ISlashCommand {

  constructor(private readonly app: App) {
    super();
    this.command = 'rankinggeral';
    this.i18nParamsExample = 'rankinggeneral.params_example';
    this.i18nDescription = 'rankinggeneral.command_description';
    this.providesPreview = false;
  }

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [customServer] = context.getArguments();
    const uri = 'bot/commands/general-raking';
    const data = await sdk.getCommand(http, read, context.getSender(), uri, customServer);
    if (data) {
      return await this.sendMessage(context, modify, data);
    }
    return;
  }

}

export class AtenaMinhasConquistasSlashCommand extends AtenaSlashCommand implements ISlashCommand {
  constructor(private readonly app: App) {
    super();
    this.command = 'minhasconquistas';
    this.i18nParamsExample = 'minhasconquistas.params_example';
    this.i18nDescription = 'minhasconquistas.command_description';
    this.providesPreview = false;
  }

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [customServer] = context.getArguments();
    const uri = 'bot/commands/minhasconquistas';
    const data = await sdk.getCommand(http, read, context.getSender(), uri, customServer);
    if (data) {
      return await this.sendMessage(context, modify, data);
    }
    return;
  }
}

export class AtenaOpenSourceSlashCommand extends AtenaSlashCommand implements ISlashCommand {

  constructor(private readonly app: App) {
    super();
    this.command = 'opensource';
    this.i18nParamsExample = 'opensource.params_example';
    this.i18nDescription = 'opensource.command_description';
    this.providesPreview = false;
  }

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const [customServer] = context.getArguments();
    const uri = 'integrations/github';
    const data = await sdk.getCommand(http, read, context.getSender(), uri, customServer);

    if (data) {
      return await this.sendMessage(context, modify, data);
    }
    return;
  }
}

export class AtenaMostActiveSlashCommand extends AtenaSlashCommand implements ISlashCommand {
  constructor(private readonly app: App) {
    super();
    this.command = 'engajados';
    this.i18nParamsExample = 'mostactive.params_example';
    this.i18nDescription = 'mostactive.command_description';
    this.providesPreview = false;
  }

 public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
   const [begin, end, customServer] = context.getArguments();
   // this.app.getLogger().log('DATAS: ', begin, end);
   const uri = 'interactions/mostactive';
   const data = await sdk.getMostActive(http, read, context.getSender(), uri, begin, end, customServer);
   if (data) {
     return await this.sendMessage(context, modify, data);
   }
   return;
 }
}

export class AtenaProSlashCommand extends AtenaSlashCommand implements ISlashCommand {
  constructor(private readonly app: App) {
    super();
    this.command = 'pro';
    this.i18nParamsExample = 'pro.params_example';
    this.i18nDescription = 'pro.command_description';
    this.providesPreview = false;
  }

 public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
   const [customServer] = context.getArguments();
   const uri = `user/${context.getSender().id}/current_plan`;
   const data = await sdk.getCommand(http, read, context.getSender(), uri, customServer);
   if (data) {
     return await this.sendMessage(context, modify, data);
   }
   return;
 }
}
