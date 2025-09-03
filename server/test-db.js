require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔗 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Connected to database successfully');
    
    // Test if we can query the database
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query test successful:', result);
    
    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await prisma.formSubmission.deleteMany();
    await prisma.formSchema.deleteMany();
    console.log('✅ Cleared existing data');
    
    // Create a simple form schema
    console.log('📋 Creating test form schema...');
    const schema = await prisma.formSchema.create({
      data: {
        name: 'test-form',
        description: 'Test form',
        schema: { fields: [] },
        isActive: true
      }
    });
    console.log('✅ Created form schema:', schema.id);
    
    // Create a test submission
    console.log('📝 Creating test submission...');
    const submission = await prisma.formSubmission.create({
      data: {
        data: { test: 'value' }
      }
    });
    console.log('✅ Created submission:', submission.id);
    
    // Count records
    const schemaCount = await prisma.formSchema.count();
    const submissionCount = await prisma.formSubmission.count();
    console.log('📊 Schema count:', schemaCount);
    console.log('📊 Submission count:', submissionCount);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
