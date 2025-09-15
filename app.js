async function loadDeals(category = null) {
  try {
    const res = await fetch("deals.json");
    const deals = await res.json();
    let filtered = deals;
    if (category) {
      filtered = deals.filter(d => d.category === category);
    }
    renderDeals(filtered);
  } catch (e) {
    document.getElementById("deals-container").innerHTML = "<p>Erreur de chargement</p>";
  }
}

function renderDeals(deals) {
  const container = document.getElementById("deals-container");
  container.innerHTML = deals.map(d => `
    <div class="deal-card">
      <img src="${d.imageUrl}" alt="${d.title}">
      <div class="deal-info">
        <h3>${d.title}</h3>
        <p>
          <span class="price">${d.priceCurrent.toFixed(2)} €</span>
          <span class="old-price">${d.priceReference.toFixed(2)} €</span>
          <span class="discount">-${d.discountPct}%</span>
        </p>
        <a href="${d.affiliateUrl}" target="_blank" rel="nofollow noopener">Voir l’offre</a>
      </div>
    </div>
  `).join("");
}

if (document.body.id !== "categories") {
  loadDeals();
}
