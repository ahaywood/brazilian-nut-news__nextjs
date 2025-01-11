import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.user.deleteMany({})
  await prisma.link.deleteMany({})

  await prisma.user.create({
    data: {
      firstName: 'Amy',
      lastName: 'Dutton',
      nickname: 'amydutton',
      email: 'amy@ahhacreative.com',
      userId: 'dbcb5749-cf2e-4945-a320-1409b337cae0',
      twitter: 'selfteachme',
    },
  })

  /*
  // Create 10 users
  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const nickname = faker.internet.userName({ firstName, lastName })
    const email = faker.internet.email({ firstName, lastName })

    await prisma.user.create({
      data: {
        firstName,
        lastName,
        nickname,
        email,
        userId: faker.string.uuid(),
      },
    })
  }*/
}

main()
