using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaggle
{
    public interface IStore
    {
        Task<List<Book>> GetBooks();
        Task<Guid> SaveBook(Book book);
        Task<Book> GetBook(Guid id);
        Task DeleteBook(Guid id);
    }
    public class Store : IStore
    {
        readonly List<Book> books;

        public Store()
        {
            this.books = new List<Book>();
            this.books.AddRange(new List<Book>
            {
                new Book { Id = Guid.NewGuid(), Name = "Peter Pan", Price = 2 },
                new Book { Id = Guid.NewGuid(), Name = "", Price = 5 }
            });
        }

        public Task<List<Book>> GetBooks()
        {
            return Task.FromResult(books);
        }

        public Task<Book> GetBook(Guid id)
        {
            var storedBook = books.FirstOrDefault(b => b.Id.Equals(id));
            if (storedBook == null)
            {
                throw new ArgumentException($"book with id {id} was not found");
            }
            return Task.FromResult(storedBook);
        }

        public Task DeleteBook(Guid id)
        {
            var book = GetBook(id).Result;
            books.Remove(book);
            return Task.FromResult(true);
        }

        public Task<Guid> SaveBook(Book book)
        {
            if (string.IsNullOrWhiteSpace(book.Name))
            {
                throw new ArgumentException("book name is required");
            }
            if (book.Id == null)
            {
                book.Id = Guid.NewGuid();
            }else
            {
                UpdateBook(book);
            }
            return Task.FromResult(book.Id);
        }

        void UpdateBook(Book book)
        {
            var storedBook = GetBook(book.Id).Result;
            storedBook.Name = book.Name;
            storedBook.Price = book.Price;
        }

        void InsertBook(Book book)
        {
            books.Add(book);
        }
    }

    public class Book
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
    }
}
