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

    this.signUp = async (value) => {
      let user = {
        user: value,
      };

      const response = await fetch(`${this.API_BASE}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
      });

      const body = await response.json();

      return body;
    };

    this.signIn = async (value) => {
      let user = {
        user: value,
      };

      const response = await fetch(`${this.API_BASE}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(user),
      });

      const body = await response.json();
      return body;
    };

    this.updateUser = async (value, token) => {
      let user = {
        user: value,
      };

      const response = await fetch(`${this.API_BASE}user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(user),
      });

      const body = await response.json();
      return body;
    };
  }
}

export default new RealworldBlogApi();
