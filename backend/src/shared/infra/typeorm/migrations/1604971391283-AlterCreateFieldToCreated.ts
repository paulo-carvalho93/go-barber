import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterCreateFieldToCreated1604971391283
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'create_at');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );

    await queryRunner.dropColumn('users', 'create_at');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'created_at');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'create_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );

    await queryRunner.dropColumn('users', 'created_at');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'create_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }
}
