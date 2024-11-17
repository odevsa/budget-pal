import { User } from "@/core/models/User";
import { PrismaClient } from "@prisma/client";

export default class UserRepository {
  private static db: PrismaClient = new PrismaClient();

  public static async save(data: User): Promise<User | undefined> {
    try {
      const response = await this.db.users.upsert({
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
      return (await this.db.users.findUnique({ where: { email } })) as User;
    } catch (e: any) {
      return undefined;
    }
  }
}
