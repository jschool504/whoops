import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // Seed Users
  await prisma.user.createMany({
    data: [
      { email: 'user1@example.com' },
      { email: 'user2@example.com' },
    ],
  })

  // Seed Applications
  await prisma.application.createMany({
    data: [
      { name: 'App1' },
      { name: 'App2' },
    ],
  })

  // Seed Events
  await prisma.event.createMany({
    data: [
      {
        application_id: 1,
        tag: 'Tag1',
        body: 'Body1',
        level: 'INFO',
      },
      {
        application_id: 1,
        tag: 'Tag2',
        body: 'Body2',
        level: 'WARN',
      },
      {
        application_id: 2,
        tag: 'Tag3',
        body: 'Body3',
        level: 'ERROR',
      },
    ],
  })
}

seed()
  .catch((error) => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
