import { db } from "../src/utils/db.server";

type Author = {
  firstName: string,
  lastName: string;
}

type Book = {
  title: string,
  isFiction: boolean
  datePublished: Date;
}

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName
        }
      })
    })
  )

  const author = await db.author.findFirst({
    where: {
      firstName: "dogukan",
    }
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author.id
        }
      })
    })
  )
}

seed();

function getAuthors(): Array<Author> {
  return [
    {
      firstName: 'dogukan',
      lastName: 'atalay'
    },
    {
      firstName: 'ertugrul',
      lastName: 'cihan'
    },
    {
      firstName: 'Yuval noah',
      lastName: 'Harari'
    }
  ]
}

function getBooks(): Array<Book> {
  return [
    {
      title: 'Saphiens',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'Homo deus',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'Kar',
      isFiction: false,
      datePublished: new Date(),
    },
  ]
}

