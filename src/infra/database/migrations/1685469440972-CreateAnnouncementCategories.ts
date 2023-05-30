import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnnouncementCategories1685469440972
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "announcement_categories",
        columns: [
          {
            name: "announcement_id",
            type: "uuid",
          },
          {
            name: "category_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk_announcement_id_category",
            columnNames: ["announcement_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "announcements",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            name: "fk_category_id_announcement",
            columnNames: ["category_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "categories",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("announcement_categories");
  }
}
