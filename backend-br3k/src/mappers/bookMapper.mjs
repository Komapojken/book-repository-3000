export function mapBook(data) {
    return {
        id: data.id,
        title: data.title,
        author: data.author,
        genre: data.genre,
        publishedYear: data.published_year,
        pages: data.pages
    };
}