export default function reviews({ params }) {
  return (
    <h1>
      Reviews Übersicht für Produkt {params.id} und Review {params.rid}
    </h1>
  );
}
