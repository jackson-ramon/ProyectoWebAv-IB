import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration71718503154558 implements MigrationInterface {
    name = 'Migration71718503154558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imageUrl" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "imageUrl" SET NOT NULL`);
    }

}
