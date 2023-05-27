import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddProfileIdInSocialNetworks1685149053699
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "social_networks",
      new TableColumn({
        name: "profile_id",
        type: "uuid",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "social_networks",
      new TableForeignKey({
        columnNames: ["profile_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "profiles",
        name: "fk_profile_id_social_network",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "social_networks",
      "fk_profile_id_social_network"
    );
    await queryRunner.dropColumn("social_networks", "profile_id");
  }
}
