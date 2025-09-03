#!/bin/bash

# Database Setup Script for TSG (Dynamic Form Generation)
# This script creates the PostgreSQL database and runs migrations

echo "🗄️  Setting up TSG Database..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if PostgreSQL is running
echo -e "${BLUE}Checking if PostgreSQL is running...${NC}"
if ! pgrep -x "postgres" > /dev/null; then
    echo -e "${RED}❌ PostgreSQL is not running. Please start PostgreSQL first.${NC}"
    echo -e "${YELLOW}On macOS with Homebrew: brew services start postgresql${NC}"
    echo -e "${YELLOW}On Ubuntu: sudo service postgresql start${NC}"
    exit 1
fi

echo -e "${GREEN}✅ PostgreSQL is running${NC}"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  No .env file found. Copying from .env.example...${NC}"
    cp .env.example .env
    echo -e "${RED}🔧 Please update the DATABASE_URL in .env with your PostgreSQL credentials${NC}"
    echo -e "${YELLOW}Example: DATABASE_URL=\"postgresql://username:password@localhost:5432/tsg\"${NC}"
    exit 1
fi

echo -e "${BLUE}📝 Generating Prisma client...${NC}"
npx prisma generate

echo -e "${BLUE}🗄️  Creating database and running migrations...${NC}"
npx prisma migrate dev --name init

echo -e "${BLUE}🌱 Seeding database with sample data...${NC}"
npx prisma db seed

echo -e "${GREEN}🎉 Database setup complete!${NC}"
echo -e "${BLUE}📊 You can view your database with: npx prisma studio${NC}"
