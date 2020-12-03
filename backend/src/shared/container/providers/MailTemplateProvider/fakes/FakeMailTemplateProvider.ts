import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import iMailTemplateProvider from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements iMailTemplateProvider {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
