import { User } from "@/core/models/User";
import { PrismaClient } from "@prisma/client";

export default class UserRepository {
  private static db: PrismaClient = new PrismaClient();

  public static async save(data: User): Promise<User> {
    const response = await this.db.users.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });

    return response as User;
  }

  public static async list(): Promise<any> {
    return await this.db.users.findMany();
  }

  public static async byId(id: number): Promise<User> {
    return (await this.db.users.findUnique({ where: { id } })) as User;
  }

  public static async delete(id: number): Promise<any> {
    return await this.db.users.delete({ where: { id } });
  }
}
