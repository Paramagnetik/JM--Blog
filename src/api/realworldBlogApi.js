class RealworldBlogApi {
  constructor() {
    this.API_BASE = 'https://kata.academy:8021/api/';

    this.getPosts = async (take) => {
      const response = await fetch(`${this.API_BASE}articles?limit=5&offset=${take}`);
      const body = await response.json();

      return body;
    };

    this.getPost = async (slug) => {
      console.log(slug);
      const response = await fetch(`${this.API_BASE}articles/${slug}`);
      const body = await response.json();

      return body;
    };
  }
}

export default new RealworldBlogApi();
