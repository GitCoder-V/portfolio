import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Получаем __dirname в ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === НАСТРОЙКИ ===
const baseUrl = 'https://gitcoder-v.github.io/portfolio';
const pagesDir = path.join(__dirname, 'pages');
const outputPath = path.join(__dirname, 'sitemap.xml');

// Основные страницы (ручной список)
const staticPages = [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/pages/home/home.html', priority: 0.8, changefreq: 'monthly' },
    { url: '/pages/uslugi/uslugi.html', priority: 0.8, changefreq: 'monthly' },
    { url: '/pages/blog/blog.html', priority: 0.7, changefreq: 'weekly' },
    { url: '/pages/otzyvy/otzyvy.html', priority: 0.7, changefreq: 'monthly' },
    { url: '/pages/about/about.html', priority: 0.8, changefreq: 'monthly' },
    { url: '/pages/contacts/contacts.html', priority: 0.8, changefreq: 'monthly' }
];

// === ФУНКЦИЯ ГЕНЕРАЦИИ ===
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];
    const pages = [...staticPages];

    // Автоматически добавляем все кейсы (файлы pages/case-*.html)
    if (fs.existsSync(pagesDir)) {
        const files = fs.readdirSync(pagesDir);
        files.forEach(file => {
            if (file.startsWith('case-') && file.endsWith('.html')) {
                pages.push({
                    url: `/pages/${file}`,
                    priority: 0.9,
                    changefreq: 'monthly',
                    lastmod: today
                });
            }
        });
    }

    // Сортируем по URL
    pages.sort((a, b) => a.url.localeCompare(b.url));

    // Генерация XML
    const urls = pages.map(page => {
        const lastmod = page.lastmod || today;
        const changefreq = page.changefreq || 'monthly';
        const priority = page.priority || 0.5;

        return `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    }).join('\n');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    fs.writeFileSync(outputPath, sitemap, 'utf8');
    console.log(`✅ sitemap.xml обновлён! Найдено страниц: ${pages.length}`);
    console.log(`📁 Файл сохранён: ${outputPath}`);
}

// === ЗАПУСК ===
generateSitemap();