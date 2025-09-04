import { db } from './index';
import { users, userSessions } from './schema/auth';
import { createUser } from '@/lib/db-auth';

// Seed data for development
export async function seedDatabase() {
  console.log('🌱 Seeding database...');

  try {
    // Create sample users for each role
    const sampleUsers = [
      {
        email: 'participant@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        role: 'participant' as const,
      },
      {
        email: 'organizer@example.com',
        password: 'password123',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'organizer' as const,
      },
      {
        email: 'recruiter@example.com',
        password: 'password123',
        firstName: 'Alex',
        lastName: 'Thompson',
        role: 'recruiter' as const,
      },
      {
        email: 'sponsor@example.com',
        password: 'password123',
        firstName: 'Jennifer',
        lastName: 'Martinez',
        role: 'sponsor' as const,
      },
    ];

    // Create users
    for (const userData of sampleUsers) {
      try {
        await createUser(userData);
        console.log(`✅ Created ${userData.role} user: ${userData.email}`);
      } catch (error) {
        console.log(`⚠️  User ${userData.email} might already exist`);
      }
    }

    console.log('🎉 Database seeding completed!');
    console.log('\n📋 Sample accounts created:');
    console.log('Participant: participant@example.com / password123');
    console.log('Organizer: organizer@example.com / password123');
    console.log('Recruiter: recruiter@example.com / password123');
    console.log('Sponsor: sponsor@example.com / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}
