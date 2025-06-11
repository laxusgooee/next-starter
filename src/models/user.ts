import { ID, User } from "@/lib/types";
import moment from "moment";

class UserModel {
  constructor(
    public id: ID,
    public username: string,
    public first_name?: string,
    public last_name?: string,
    public email?: string,
    public phone?: string,
    public birth_date?: string,
  ) {}

  get initials(): string {
    return `${this.first_name?.[0]}${this.last_name?.[0]}`.trim();
  }

  get name(): string {
    return (this.first_name + " " + this.last_name).trim();
  }

  get avatar(): string {
    return "";
  }

  get birthDay(): moment.Moment | null | undefined {
    return this.birth_date ? moment(this.birth_date) : null;
  }

  get isVerified(): boolean | undefined {
    return true;
  }

  /**
   * toJson
   */
  public toJson(): User {
    return {
      id: this.id,
      username: this.username,
      first_name: this.first_name ?? "",
      last_name: this.last_name ?? "",
      email: this.email,
      phone: this.phone,
      birth_date: this.birth_date,
    };
  }

  static fromJson(user: User): UserModel {
    const data = new UserModel(
      user.id,
      user.username,
      user.first_name,
      user.last_name,
      user.email,
      user.phone,
      user.birth_date,
    );

    return data;
  }
}

export default UserModel;
