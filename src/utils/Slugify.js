export default function Slugify(text) {
    return text
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/['’"]/g, "") 
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") 
      .replace(/-+/g, "-"); 
  }