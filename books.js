// Sample list of books with numerical prices
const books = [
    {
        name: "Everyone has a story-2",
        price: 25,  // Changed price to number
        cover: "images/everyone has a story.jpg"
    },
    {
        name: "The Alchemist",
        price: 30,
        cover:"images/the alchemist.jpeg"
    },
    {
        name: "The Secret",
        price: 40,
        cover:"images/the secret.jpeg"
    },
    {
        name: "Atomic Habits",
        price: 35,
        cover:"images/atomic habits.jpeg"
    },
    {
        name: "Bhagavadgita",
        price: 50,
        cover: "images/bhagavadgita.jpeg"
    },
    {
        name: "This is not your story",
        price: 30,
        cover: "images/this is not your story.jpeg"
    }
];

// Function to display books with cover images
function displayBooks(bookArray) {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";  // Clear the current book list

    // Check if any books are found
    if (bookArray.length === 0) {
        bookList.innerHTML = "<p>No books found.</p>";
        return;  // Exit if no books found
    }

    bookArray.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <img src="${book.cover}" alt="${book.name} cover" class="book-cover" />
            <h3>${book.name}</h3>
            <p>Price: $${book.price}</p>
        `;
        bookList.appendChild(bookDiv);
    });
}

// Function to filter books based on search input and price filter
function filterBooks() {
    const searchQuery = document.getElementById("searchBar").value.toLowerCase().trim();
    const priceFilter = document.getElementById("priceFilter").value;

    // Filter books based on the selected price range
    let filteredBooks = books.filter(book => {
        // Price filtering logic (convert price to number for comparison)
        if (priceFilter === "under-30" && book.price >= 30) return false;
        if (priceFilter === "30-40" && (book.price < 30 || book.price > 40)) return false;
        if (priceFilter === "above-40" && book.price <= 40) return false;
        return true; // Include the book in filtered results
    });

    // Apply search filtering
    if (searchQuery) {
        filteredBooks = filteredBooks.filter(book =>
            book.name.toLowerCase().includes(searchQuery) // Check for partial match
        );
    }

    // Display the filtered books
    displayBooks(filteredBooks);
}

// Event listeners for search and filter
document.getElementById("searchBar").addEventListener("input", filterBooks);
document.getElementById("priceFilter").addEventListener("change", filterBooks);

// Initial display of all books
displayBooks(books);

const sortOrder = document.getElementById('sortOrder');
sortOrder.addEventListener('change', function() {
    let sortedBooks = [...books];

    if (sortOrder.value === 'low-to-high') {
        sortedBooks.sort((a, b) => a.price - b.price);
    } else if (sortOrder.value === 'high-to-low') {
        sortedBooks.sort((a, b) => b.price - a.price);
    }

    displayBooks(sortedBooks);
});