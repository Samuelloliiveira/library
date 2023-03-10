import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstBookId = 'ce8d4e16-3a4b-411f-aeca-360fff0b5094'
const firstBookCreationDate = new Date('2023-03-10T03:00:00.000')

async function main() {
  await prisma.book.create({
    data: {
      id: firstBookId,
      title: 'O Hobbit',
      author: 'J. R. R. Tolkien',
      book_release_date: '21-09-1937',
      crated_at: firstBookCreationDate,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })