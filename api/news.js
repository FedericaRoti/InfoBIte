const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID; 

const headers = {
  'Authorization': `Bearer ${NOTION_TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
};

// Parsa un gruppo di 4 blocchi paragraph in un oggetto articolo
function parseArticleBlocks(blocks) {
  const articles = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    // Salta blocchi vuoti
    if (block.type !== 'paragraph') { i++; continue; }
    const testo = block.paragraph.rich_text?.[0]?.text?.content || '';
    if (!testo) { i++; continue; }

    // Riga 1: titolo → inizia con 📰
    if (testo.startsWith('📰')) {
      const titolo = testo.replace('📰 ', '');
      const rigaFonte = blocks[i + 1]?.paragraph?.rich_text?.[0]?.text?.content || '';
      const anteprima = blocks[i + 2]?.paragraph?.rich_text?.[0]?.text?.content || '';
      const rigaLink  = blocks[i + 3]?.paragraph?.rich_text?.[0]?.text?.content || '';

      // Parsa "📌 fonte.com  |  🕐 14:30"
      const fonteMatch = rigaFonte.match(/📌\s(.+?)\s+\|\s+🕐\s(.+)/);
      const fonte  = fonteMatch?.[1]?.trim() || '';
      const orario = fonteMatch?.[2]?.trim() || '';
      const link   = rigaLink.replace('🔗 ', '').trim();

      articles.push({ titolo, fonte, orario, anteprima, link });
      i += 5; // salta i 4 blocchi + il separatore vuoto
    } else {
      i++;
    }
  }

  return articles;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { date } = req.query; 

  try {
    // 1. Prende i children della pagina madre (lista pagine figlie)
    const childrenRes = await fetch(
      `https://api.notion.com/v1/blocks/${NOTION_PAGE_ID}/children?page_size=50`,
      { headers }
    );
    const childrenData = await childrenRes.json();

    // Filtra solo le child_page
    const pages = childrenData.results
      .filter(b => b.type === 'child_page')
      .map(b => ({
        id: b.id,
        title: b.child_page.title, 
      }));

    // Se non è richiesta una data specifica, usa l'ultima pagina
    let targetPage;
    if (date) {
      targetPage = pages.find(p => p.title.includes(date)) || pages[pages.length - 1];
    } else {
      targetPage = pages[pages.length - 1];
    }

    // 2. Prende i blocchi della pagina target
    const blocksRes = await fetch(
      `https://api.notion.com/v1/blocks/${targetPage.id}/children?page_size=100`,
      { headers }
    );
    const blocksData = await blocksRes.json();

    const articles = parseArticleBlocks(blocksData.results);

    res.status(200).json({
      date: targetPage.title,
      articles,
      archive: pages.map(p => ({ id: p.id, title: p.title })).reverse()
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}