const fengShuiWeisheiten = [
    "💕 Harmonie im Raum schafft Harmonie im Herzen.",
    "🏡 Ein aufgeräumtes Zuhause ist ein aufgeräumter Geist.",
    "💡 Die Energie folgt der Aufmerksamkeit.",
    "🙋 Ein guter Fluss von Chi bringt Glück und Wohlstand.",
    "🌱 Jedes Objekt hat eine Energie, die unsere Umgebung beeinflusst.",
    "🌼 Natürliche Materialien fördern ein gesundes Wohnklima.",
    "🍀 Licht und Luft bringen Leben in den Raum.",
    "🐉 Ein starkes Fundament schafft Stabilität in allen Lebensbereichen.",
    "🪞 Ein Spiegel verdoppelt nicht nur das Licht, sondern auch die Energie.",
    "🪴 Pflanzen sind die Lungen des Hauses und reinigen die Luft.",
    "👫 Symmetrie schafft Ausgeglichenheit und Ruhe.",
    "✋ Die Mitte des Raumes ist der Mittelpunkt des Chi-Flusses.",
    "⾊ Farben haben eine starke Wirkung auf unsere Stimmung und Energie.",
    "🌿 Ein fließender Übergang zwischen Innen- und Außenraum fördert die Verbindung zur Natur.",
    "🐁 Das Loslassen von Unnötigem schafft Raum für Neues.",
    "🛏 Die Ausrichtung des Bettes beeinflusst unseren Schlaf und unsere Träume.",
    "⛲ Ein Feng Shui Brunnen bringt frische Energie und Wohlstand.",
    "👀 Klare Sichtlinien fördern einen klaren Geist.",
    "🏡 Ein Zen-Garten bietet einen Rückzugsort für Meditation und Reflexion.",
    "🌺 Feng Shui ist keine starre Regel, sondern eine flexible Lebensweise, die sich anpassen kann."
  ];
  
    export const getFengShuiWeisheit = () => {
        const randomIndex = Math.floor(Math.random() * fengShuiWeisheiten.length);
        return fengShuiWeisheiten[randomIndex];
    };