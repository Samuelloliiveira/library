import dayjs from 'dayjs'
import Fastify from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const app = Fastify()

const prisma = new PrismaClient()

app.post('/books', async (request, reply) => {
  const createBookBody = z.object({
    title: z.string(),
    author: z.string(),
    bookReleaseDate: z.string(),
  })

  const { title, author, bookReleaseDate } = createBookBody.parse(request.body)

  const today = dayjs().startOf('day').toDate()

  await prisma.book.create({
    data: {
      title,
      author,
      book_release_date: bookReleaseDate,
      crated_at: today
    }
  })

  return reply.status(201).send()
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server running')
})