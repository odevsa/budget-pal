import { User } from "@/core/models/User";
import DB from "@/lib/db";

export default class UserRepository {
  public static async save(data: User): Promise<User | undefined> {
    try {
      const response = await DB.users.upsert({
        where: { email: data.email },
        update: data,
        create: data,
      });

      return response as User;
    } catch (e: any) {
      return undefined;
    }
  }

  public static async byEmail(email: string): Promise<User | undefined> {
    try {
      return (await DB.users.findUnique({ where: { email } })) as User;
    } catch (e: any) {
      return undefined;
    }
  }
}
