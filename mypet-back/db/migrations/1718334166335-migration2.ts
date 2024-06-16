import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration21718334166335 implements MigrationInterface {
    name = 'Migration21718334166335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roles" TO "role"`);

        await queryRunner.query(`ALTER TYPE "public"."users_roles_enum" RENAME TO "users_role_enum"`);

        // Verificar si el tipo 'users_role_enum' ya existe
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum') THEN
                    CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'entrepreneur');
                END IF;
            END
            $$;
        `);

        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "isActive" boolean NOT NULL, "imageUrl" character varying NOT NULL, "userId" integer, CONSTRAINT "pk_product_id" PRIMARY KEY ("id"))`);

        // Drop and recreate the column with the new enum type
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'entrepreneur'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'entrepreneur'`);

        await queryRunner.query(`DROP TABLE "products"`);

        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_roles_enum"`);

        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "roles"`);
    }
}
