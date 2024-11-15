const API_KEY = "14292b06645f41a19497fe56baa1674d";
const BASE_URL = "https://newsapi.org/v2/everything";

let currentPage = 1;
let currentQuery = "";
let currentCountry = "";
let currentCategory = "";

const newsContainer = document.getElementById("newsContainer");
const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");
const countrySelect = document.getElementById("country");
const categorySelect = document.getElementById("category");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

async function fetchNews() {
  let url = `${BASE_URL}?apiKey=${API_KEY}&q=${encodeURIComponent(
    currentCountry
  )}+news&category=${encodeURIComponent(
    currentCategory
  )}&page=${currentPage}&pageSize=10`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (data.status === "ok" && data.articles.length > 0) {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = `<p>No news found for ${currentCountry}. Please try a different country or filter.</p>`;
    }
  } catch (error) {
    newsContainer.innerHTML = `<p>Error fetching news: ${error.message}. Please try again later.</p>`;
    console.error("Error:", error);
  }
}
function displayNews(articles) {
  newsContainer.innerHTML = "";

  articles.forEach((article) => {
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");

    const imageUrl =
      article.urlToImage || "https://via.placeholder.com/300x180?text=No+Image";

    newsItem.innerHTML = `
      <img src="${imageUrl}" alt="News Image" class="news-image">
      <h3>${article.title}</h3>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read More</a>
    `;

    newsContainer.appendChild(newsItem);
  });
}


searchBtn.addEventListener("click", () => {
  currentQuery = searchQuery.value;
  currentPage = 1;
  fetchNews();
});

countrySelect.addEventListener("change", (e) => {
  currentCountry = e.target.value;
  currentPage = 1;
  fetchNews();
});

categorySelect.addEventListener("change", (e) => {
  currentCategory = e.target.value;
  currentPage = 1;
  fetchNews();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    pageNumber.textContent = `Page ${currentPage}`;
    fetchNews();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  pageNumber.textContent = `Page ${currentPage}`;
  fetchNews();
});

fetchNews();
