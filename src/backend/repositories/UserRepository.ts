import { User } from "@/core/models/User";
import DB from "@/lib/db";
import { Prisma } from "@prisma/client";

export default class UserRepository {
  public static async save(data: User): Promise<User | undefined> {
    try {
      const response = await DB.users.upsert({
        where: { email: data.email },
        create: data as Prisma.UsersCreateInput,
        update: data as Prisma.UsersUpdateInput,
      });

      return response as User;
    } catch {
      return undefined;
    }
  }

  public static async byEmail(email: string): Promise<User | undefined> {
    try {
      return (await DB.users.findUnique({ where: { email } })) as User;
    } catch {
      return undefined;
    }
  }
}
