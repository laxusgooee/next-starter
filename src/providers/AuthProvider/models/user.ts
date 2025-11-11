import { ID, User } from "@/lib/types";
import moment from "moment";

class UserModel {
  constructor(
    public id: ID,
    public email: string,
    public username: string,
    public name?: string,
    public phone?: string,
    public birthDate?: string,
  ) {}

  get initials(): string {
    return (
      this.name
        ?.split(" ")
        .map((e) => e?.[0])
        .join(" ")
        .trim() ?? ""
    );
  }

  get avatar(): string {
    return "";
  }

  get birthDay(): moment.Moment | null | undefined {
    return this.birthDate ? moment(this.birthDate) : null;
  }

  get isVerified(): boolean | undefined {
    return true;
  }

  /**
   * toJson
   */
  public toJson(): Partial<User> {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      name: this.name ?? "",
      phone: this.phone,
      birthDate: this.birthDate,
    };
  }

  static fromJson(user: User): UserModel {
    const data = new UserModel(
      user.id,
      user.email,
      user.username,
      user.name,
      user.phone,
      user.birthDate,
    );

    return data;
  }
}

export default UserModel;
