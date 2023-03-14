import dayjs from 'dayjs'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

export async function appRoutes(app: FastifyInstance) {
  const prisma = new PrismaClient()

  app.post('/books/create', async (request, reply) => {
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

  app.get('/books/list', async (request, reply) => {
    const books = await prisma.book.findMany({
      select: {
        title: true,
        author: true,
        book_release_date: true
      }
    })

    return reply.status(200).send(books)
  })

  app.get('/books/:id', async (request, reply) => {
    const getBookId = z.object({
      id: z.string(),
    })

    const { id } = getBookId.parse(request.params)

    const book = await prisma.book.findUnique({
      where: {
        id
      },
      select: {
        title: true,
        author: true,
        book_release_date: true
      }
    })

    return reply.status(200).send(book)
  })

  app.put('/books/:id', async (request, reply) => {
    const bookId = z.object({
      id: z.string(),
    })
    const updateBook = z.object({
      title: z.string(),
      author: z.string(),
      bookReleaseDate: z.string()
    })

    const { id } = bookId.parse(request.params)
    const { title, author, bookReleaseDate } = updateBook.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.book.update({
      where: {
        id
      },
      data: {
        title,
        author,
        book_release_date: bookReleaseDate,
        crated_at: today
      }
    })

    return reply.status(201).send()
  })

  app.delete('/books/:id', async (request, reply) => {
    const deleteBookById = z.object({
      id: z.string(),

    })

    const { id } = deleteBookById.parse(request.params)

    await prisma.book.delete({
      where: {
        id
      }
    })

    return reply.status(200).send()
  })
}