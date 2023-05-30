import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnnouncementFiles1685469623114
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "announcement_files",
        columns: [
          {
            name: "announcement_id",
            type: "uuid",
          },
          {
            name: "file_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "fk_announcement_id_file",
            columnNames: ["announcement_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "announcements",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
          {
            name: "fk_file_id_announcement",
            columnNames: ["file_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "files",
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("announcement_files");
  }
}
