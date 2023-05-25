import {
  Column,
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddColumnFileIdToUsersTable1684967842251
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "file_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        name: "fk_file_id",
        columnNames: ["file_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "files",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "fk_file_id");
    await queryRunner.dropColumn("users", "file_id");
  }
}
