import { User } from "@/core/models/User";
import { PrismaClient } from "@prisma/client";

export default class UserRepository {
  private static db: PrismaClient = new PrismaClient();

  public static async save(data: User): Promise<User> {
    const response = await this.db.users.upsert({
      where: { email: data.email },
      update: data,
      create: data,
    });

    return response as User;
  }

  public static async byEmail(email: string): Promise<User> {
    return (await this.db.users.findUnique({ where: { email } })) as User;
  }
}
