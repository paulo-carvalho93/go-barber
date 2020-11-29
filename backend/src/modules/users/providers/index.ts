import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCCryptHashProvider);
