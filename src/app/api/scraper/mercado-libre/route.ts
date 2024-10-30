import { getPropertyMl } from "./utils";
import { getBrowser } from "./utils";

export async function POST(request: Request) {
  try {
    const { siteUrl } = await request.json();

    const browser = await getBrowser();
    if (!browser) return "no browser instance";

    const page = await browser.newPage();
    await page.goto(siteUrl);
    await page.reload(); // ? Reload fix the problem to load the necesary elements to scrap
    const pageTitle = await page.title();
    const property = await getPropertyMl(page);

    await browser.close();

    return Response.json({
      siteUrl,
      property,
      pageTitle,
    });
  } catch (err) {
    console.log("Post err", err);

    return Response.json({
      err,
    });
  }
}
