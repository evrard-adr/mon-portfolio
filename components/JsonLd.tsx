export default function JsonLd({ data }: { data: unknown }) {
  // « < » échappé pour empêcher toute sortie du bloc <script>
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
