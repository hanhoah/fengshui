export default function Menu() {
  return (
    <div>
      <li>
        <a href="/blog">Blog</a>
      </li>
      <li>
        <a>Shopping</a>
      </li>
      <li>
        <a>Kategorien</a>
        <ul className="p-2">
          <li>
            <a>Kategorie 1</a>
          </li>
          <li>
            <a>Kategorie 2</a>
          </li>
        </ul>
      </li>
      <li>
        <a>FAQ</a>
      </li>
    </div>
  );
}
