import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateFileColumns1685021581745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("files", "name");
    await queryRunner.addColumn(
      "files",
      new TableColumn({
        name: "original_name",
        type: "varchar",
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      "files",
      new TableColumn({
        name: "type",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("files", "type");
    await queryRunner.dropColumn("files", "original_name");
    await queryRunner.addColumn(
      "files",
      new TableColumn({
        name: "name",
        type: "varchar",
        isNullable: true,
      })
    );
  }
}
