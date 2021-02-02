import * as bcrypt from 'bcrypt';
import { Column, PrimaryColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryColumn('uuid', { default: v4() })
  id?: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  hasPassword(newPassword: string) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(newPassword, salt);
  }

  verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}
