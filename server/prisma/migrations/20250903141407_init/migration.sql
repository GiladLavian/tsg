-- CreateTable
CREATE TABLE "form_submissions" (
    "id" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "schemaId" TEXT,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_schemas" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "schema" JSONB NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_schemas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_cache" (
    "id" TEXT NOT NULL,
    "cacheKey" VARCHAR(255) NOT NULL,
    "data" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "analytics_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form_field_templates" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "label" VARCHAR(200) NOT NULL,
    "config" JSONB NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "form_field_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_logs" (
    "id" TEXT NOT NULL,
    "level" VARCHAR(20) NOT NULL,
    "message" TEXT NOT NULL,
    "context" JSONB,
    "source" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "form_submissions_createdAt_idx" ON "form_submissions"("createdAt");

-- CreateIndex
CREATE INDEX "form_submissions_schemaId_idx" ON "form_submissions"("schemaId");

-- CreateIndex
CREATE UNIQUE INDEX "form_schemas_name_key" ON "form_schemas"("name");

-- CreateIndex
CREATE INDEX "form_schemas_name_idx" ON "form_schemas"("name");

-- CreateIndex
CREATE INDEX "form_schemas_isActive_idx" ON "form_schemas"("isActive");

-- CreateIndex
CREATE INDEX "form_schemas_createdAt_idx" ON "form_schemas"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "analytics_cache_cacheKey_key" ON "analytics_cache"("cacheKey");

-- CreateIndex
CREATE INDEX "analytics_cache_cacheKey_idx" ON "analytics_cache"("cacheKey");

-- CreateIndex
CREATE INDEX "analytics_cache_expiresAt_idx" ON "analytics_cache"("expiresAt");

-- CreateIndex
CREATE INDEX "form_field_templates_name_idx" ON "form_field_templates"("name");

-- CreateIndex
CREATE INDEX "form_field_templates_type_idx" ON "form_field_templates"("type");

-- CreateIndex
CREATE INDEX "form_field_templates_isPublic_idx" ON "form_field_templates"("isPublic");

-- CreateIndex
CREATE INDEX "system_logs_level_idx" ON "system_logs"("level");

-- CreateIndex
CREATE INDEX "system_logs_createdAt_idx" ON "system_logs"("createdAt");

-- CreateIndex
CREATE INDEX "system_logs_source_idx" ON "system_logs"("source");

-- AddForeignKey
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "form_schemas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
