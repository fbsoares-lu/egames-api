import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddProfileIdToUsers1685129751747 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "profile_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        columnNames: ["profile_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "profiles",
        name: "fk_profile_id",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("users", "fk_profile_id");
    await queryRunner.dropColumn("users", "profile_id");
  }
}
