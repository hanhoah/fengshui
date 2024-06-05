function extractFirstParagraph(content: string): string {
    const match = content.match(/<p>(.*?)<\/p>/);
    return match ? `${match[1]} [...]` : "";
  }
  

export default extractFirstParagraph