import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnnouncementPaymentOptions1685469241388
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "announcement_payment_options",
        columns: [
          {
            name: "announcement_id",
            type: "uuid",
          },
          {
            name: "payment_option_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk_announcement_id_payment_option",
            columnNames: ["announcement_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "announcements",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            name: "fk_payment_option_id_announcement",
            columnNames: ["payment_option_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "payment_options",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("announcement_payment_options");
  }
}
