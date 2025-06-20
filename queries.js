// Use the 'plp_bookstore' database
// use plp_bookstore

// TASK 2: Basic CRUD Operations

// 1. all books in a specific genre (Fiction)
db.books.find({ genre: "Fiction" })

// 2. books published after a certain year (2000)
db.books.find({ published_year: { $gt: 2000 } })

// 3. books by a specific author (George Orwell)
db.books.find({ author: "George Orwell" })

// 4. price of a specific book (1984 to 15.99)
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
)

// 5. deleting a book by its title (Moby Dick)
db.books.deleteOne({ title: "Moby Dick" })

// TASK 3: Advanced Queries

// 1. books that are both in stock and published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } })

// 2. returning only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

// 3. sorting by price ascending
db.books.find().sort({ price: 1 })

// 4. sorting by price descending
db.books.find().sort({ price: -1 })

// 5. limiting and skipping (5 books per page)

// Page 1 (first 5 books)
db.books.find().skip(0).limit(5)

// Page 2 (next 5 books)
db.books.find().skip(5).limit(5)

// TASK 4: Aggregation Pipeline

// average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
])

// 2. finding the author with the most books
db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])

// 3. grouping books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: { $concat: [{ $substr: ["$published_year", 0, 3] }, "0s"] }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

// TASK 5: Indexing

// 1. creating an index on the title field
db.books.createIndex({ title: 1 })

// 2. creating a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// 3. using explain() to check performance
db.books.find({ title: "1984" }).explain("executionStats")
