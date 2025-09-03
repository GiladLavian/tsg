require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Sample form schema for user registration
const sampleFormSchema = {
  name: "user-registration",
  description: "User registration form with personal information",
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
      minLength: 2,
      maxLength: 50,
      placeholder: "Enter your first name"
    },
    {
      name: "lastName",
      type: "text", 
      label: "Last Name",
      required: true,
      minLength: 2,
      maxLength: 50,
      placeholder: "Enter your last name"
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "Enter your email address"
    },
    {
      name: "age",
      type: "number",
      label: "Age",
      required: true,
      min: 13,
      max: 120,
      placeholder: "Enter your age"
    },
    {
      name: "gender",
      type: "dropdown",
      label: "Gender",
      required: true,
      options: ["Male", "Female", "Other", "Prefer not to say"]
    },
    {
      name: "birthDate",
      type: "date",
      label: "Date of Birth",
      required: true
    },
    {
      name: "phoneNumber",
      type: "text",
      label: "Phone Number",
      required: false,
      placeholder: "Enter your phone number",
      validation: {
        pattern: "^[+]?[1-9]?[0-9]{7,15}$",
        message: "Please enter a valid phone number"
      }
    },
    {
      name: "bio",
      type: "text",
      label: "Bio",
      required: false,
      maxLength: 500,
      placeholder: "Tell us about yourself..."
    }
  ]
};

// Sample form submissions for testing
const sampleSubmissions = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    age: 28,
    gender: "Male",
    birthDate: "1995-03-15",
    phoneNumber: "+1234567890",
    bio: "Software developer passionate about technology and innovation."
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    age: 25,
    gender: "Female",
    birthDate: "1998-07-22",
    phoneNumber: "+1987654321",
    bio: "UX designer with a love for creating beautiful user experiences."
  },
  {
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@example.com",
    age: 30,
    gender: "Other",
    birthDate: "1993-11-08",
    phoneNumber: "+1122334455",
    bio: "Product manager focused on building scalable solutions."
  },
  {
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@example.com",
    age: 27,
    gender: "Female",
    birthDate: "1996-05-12",
    phoneNumber: "+1555666777",
    bio: "Data scientist exploring the intersection of AI and healthcare."
  },
  {
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    age: 32,
    gender: "Male",
    birthDate: "1991-09-03",
    phoneNumber: "+1999888777",
    bio: "Marketing specialist with expertise in digital campaigns."
  }
];

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    // Clear existing data first
    console.log('🗑️  Clearing existing data...');
    await prisma.formSubmission.deleteMany();
    await prisma.formSchema.deleteMany();
    console.log('✅ Cleared existing data');

    // Create the form schema
    console.log('📋 Creating form schema...');
    const createdSchema = await prisma.formSchema.create({
      data: {
        name: sampleFormSchema.name,
        description: sampleFormSchema.description,
        schema: sampleFormSchema,
        isActive: true
      }
    });
    console.log(`✅ Created form schema: ${createdSchema.name} (ID: ${createdSchema.id})`);

    // Create form submissions
    console.log('📝 Creating form submissions...');
    for (const submissionData of sampleSubmissions) {
      const submission = await prisma.formSubmission.create({
        data: {
          data: submissionData
        }
      });
      console.log(`✅ Created submission for: ${submissionData.firstName} ${submissionData.lastName} (ID: ${submission.id})`);
    }

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`- 1 form schema (${sampleFormSchema.name})`);
    console.log(`- ${sampleSubmissions.length} form submissions`);
    console.log('');
    console.log('🚀 Ready to start the application!');
    console.log('📋 Run "npm run dev" to start the server');
    console.log('📊 View data with "npx prisma studio"');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
