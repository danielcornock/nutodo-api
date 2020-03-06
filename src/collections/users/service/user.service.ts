import { DatabaseConnection, UnauthorisedException } from '@danielc7150/express-utils';
import { IUser } from '../interfaces/user.interface';
import Axios from 'axios';
import { OAuthCallbacks } from '../constants/oauth-callbacks.constant';

export class UserService {
  private readonly _db: DatabaseConnection;

  constructor(databaseConnection: DatabaseConnection) {
    this._db = databaseConnection;
  }

  public async validateGoogleCredentials(token: string): Promise<any> {
    try {
      const googleRes: any = await Axios.get(OAuthCallbacks.GOOGLE + token);
      return googleRes.data;
    } catch {
      throw new UnauthorisedException('Sorry, something went wrong!');
    }
  }

  public async fetchUser(id: string): Promise<IUser | undefined> {
    return await this._db
      .query<IUser>('users')
      .where({ id })
      .first();
  }

  public async createUser(id: string, email: string): Promise<IUser> {
    const user: Array<IUser> = await this._db
      .query<IUser>('users')
      .insert({ id, email })
      .returning('*');

    return user[0];
  }
}
