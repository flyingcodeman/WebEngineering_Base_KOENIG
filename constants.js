export const baseUrl = "https://en.wikipedia.org/w/api.php";
export const title = "List_of_ursids";

export const params = {
  action: "parse",
  page: title,
  prop: "wikitext",
  section: 3,
  format: "json",
  origin: "*"
};

export const placeholderImageUrl = 'https://placehold.co/60x40?text=Placeholder+Image+of+a+Bear';
