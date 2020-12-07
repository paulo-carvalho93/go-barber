import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Nofication from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Nofication>;
}
