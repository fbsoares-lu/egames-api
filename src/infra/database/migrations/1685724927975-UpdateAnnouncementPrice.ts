import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateAnnouncementPrice1685724927975
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "announcements",
      "announcement_price",
      new TableColumn({
        name: "announcement_price",
        type: "float8",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "announcements",
      "announcement_price",
      new TableColumn({
        name: "announcement_price",
        type: "money",
      })
    );
  }
}
