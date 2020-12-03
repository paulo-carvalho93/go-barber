import iMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements iMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail content';
  }
}

export default FakeMailTemplateProvider;
