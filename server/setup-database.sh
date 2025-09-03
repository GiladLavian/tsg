#!/bin/bash

# Database Setup Script for TSG Project
echo "🚀 Setting up PostgreSQL database for TSG project..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}This script will help you set up the PostgreSQL database.${NC}"
echo ""

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}PostgreSQL is not installed or not in PATH.${NC}"
    echo "Please install PostgreSQL first:"
    echo "  macOS: brew install postgresql"
    echo "  Ubuntu: sudo apt-get install postgresql postgresql-contrib"
    echo "  Windows: Download from https://www.postgresql.org/download/windows/"
    exit 1
fi

echo -e "${GREEN}PostgreSQL found!${NC}"

# Database configuration
DB_NAME="tsg"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"

echo ""
echo -e "${YELLOW}Please provide your PostgreSQL credentials:${NC}"

# Get database password
echo -n "Enter PostgreSQL password for user '$DB_USER': "
read -s DB_PASSWORD
echo ""

# Test connection
echo -e "${YELLOW}Testing database connection...${NC}"
export PGPASSWORD=$DB_PASSWORD

if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "SELECT 1;" &> /dev/null; then
    echo -e "${GREEN}✓ Database connection successful!${NC}"
else
    echo -e "${RED}✗ Failed to connect to PostgreSQL.${NC}"
    echo "Please check your credentials and ensure PostgreSQL is running."
    exit 1
fi

# Create database if it doesn't exist
echo -e "${YELLOW}Creating database '$DB_NAME'...${NC}"
if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;" 2>/dev/null; then
    echo -e "${GREEN}✓ Database '$DB_NAME' created successfully!${NC}"
else
    echo -e "${YELLOW}Database '$DB_NAME' already exists or couldn't be created.${NC}"
fi

# Update .env file
echo -e "${YELLOW}Updating .env file...${NC}"
DATABASE_URL="postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME?schema=public"

cat > .env << EOF
NODE_ENV=development
PORT=5000
DATABASE_URL="$DATABASE_URL"
ALLOWED_ORIGINS="http://localhost:3000"
EOF

echo -e "${GREEN}✓ .env file updated with database configuration.${NC}"

# Generate Prisma client
echo -e "${YELLOW}Generating Prisma client...${NC}"
if npx prisma generate; then
    echo -e "${GREEN}✓ Prisma client generated successfully!${NC}"
else
    echo -e "${RED}✗ Failed to generate Prisma client.${NC}"
    exit 1
fi

# Run migrations
echo -e "${YELLOW}Running database migrations...${NC}"
if npx prisma migrate dev --name init; then
    echo -e "${GREEN}✓ Database migrations completed successfully!${NC}"
else
    echo -e "${RED}✗ Database migrations failed.${NC}"
    exit 1
fi

# Seed database with sample data
echo -e "${YELLOW}Would you like to seed the database with sample data? (y/n): ${NC}"
read -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Seeding database...${NC}"
    if npx prisma db seed; then
        echo -e "${GREEN}✓ Database seeded successfully!${NC}"
    else
        echo -e "${YELLOW}No seed script found or seeding failed.${NC}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Database setup completed successfully!${NC}"
echo ""
echo "Database Details:"
echo "  Name: $DB_NAME"
echo "  Host: $DB_HOST"
echo "  Port: $DB_PORT"
echo "  User: $DB_USER"
echo ""
echo "Next steps:"
echo "1. Start the server: npm run dev"
echo "2. View database: npx prisma studio"
echo "3. Start the client: cd ../client && npm start"
echo ""
echo -e "${YELLOW}Note: Make sure PostgreSQL service is running before starting the server.${NC}"
