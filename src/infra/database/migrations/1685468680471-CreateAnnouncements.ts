import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnnouncements1685468680471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "announcements",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: `uuid_generate_v4()`,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "status",
            type: "boolean",
          },
          {
            name: "announcement_name",
            type: "varchar",
          },
          {
            name: "announcement_description",
            type: "varchar",
          },
          {
            name: "announcement_price",
            type: "money",
          },
          {
            name: "is_exchangeable",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
        ],
        foreignKeys: [
          {
            name: "fk_user_id_announcement",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("announcements");
  }
}
