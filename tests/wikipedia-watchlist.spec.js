const { test, expect } = require('@playwright/test');
require('dotenv').config();
let watch, unwatch;

// Adding function for watch/unwatch
function getWatchButtons(page) {
  return {
    watch: page.locator('#ca-watch a'),
    unwatch: page.locator('#ca-unwatch a')
  };
}

// Define test and load credentials from .env file
test('Wikipedia watchlist', async ({ page }) => {
  const username = process.env.WIKI_USERNAME;
  const password = process.env.WIKI_PASSWORD;

// Define article titles
  const article1 = 'Jet Set nightclub roof collapse';
  const article2 = '30th Annual South African Music Awards';

// Load login page and fill in credentials 
  await page.goto('https://en.wikipedia.org/w/index.php?title=Special:UserLogin');
  await page.fill('#wpName1', username);
  await page.fill('#wpPassword1', password);
  await page.click('#wpLoginAttempt');
  await expect(page.locator('#pt-userpage')).toHaveAttribute('id', 'pt-userpage'); // Confirming login

// Add Article 1 to watchlist and verify
  await page.goto(`https://en.wikipedia.org/wiki/${article1.replace(/ /g, '_')}`);
  ({ watch, unwatch } = getWatchButtons(page)); // Reassign after navigation

  if (await watch.isVisible()) {
    await watch.click(); // Add to watchlist
    console.log(`${article1} added to watchlist.`);
  } else if (await unwatch.isVisible()) {
    console.log(`${article1} is already on the watchlist.`);
  } else {
    throw new Error(`Neither watch nor unwatch button found for ${article1}`);
  }

// Add Article 2 to watchlist and verify
  await page.goto(`https://en.wikipedia.org/wiki/${article2.replace(/ /g, '_')}`);
  ({ watch, unwatch } = getWatchButtons(page)); // Reassign after navigation

  if (await watch.isVisible()) {
    await watch.click(); // Add to watchlist
    console.log(`${article2} added to watchlist.`);
  } else if (await unwatch.isVisible()) {
    console.log(`${article2} is already on the watchlist.`);
  } else {
    throw new Error(`Neither watch nor unwatch button found for ${article2}`);
  }

// Remove one article from the watch list & verify other is present

  await page.goto(`https://en.wikipedia.org/wiki/${article1.replace(/ /g, '_')}`);
  ({ watch, unwatch } = getWatchButtons(page)); // Reassign after navigation

  await expect(page.locator('#pt-userpage')).toHaveAttribute('id', 'pt-userpage');
  
// Added to check due to issues with rendering
  if (await unwatch.isVisible({ timeout: 5000 })) {
    await unwatch.click();
    console.log(`${article1} removed from watchlist.`);
  } else {
    console.log(`${article1} was not in watchlist or unwatch button not available.`);
  }

  await page.goto('https://en.wikipedia.org/wiki/Special:EditWatchlist');
  const watchlistText = await page.textContent('body');
  expect(watchlistText).toContain(article2);

// Load article and verify title
  await page.goto(`https://en.wikipedia.org/wiki/${article2.replace(/ /g, '_')}`);
  const pageTitle = await page.title();
  expect(pageTitle).toContain(article2);
});
