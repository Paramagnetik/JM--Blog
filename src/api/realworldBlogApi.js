class RealworldBlogApi {
  constructor() {
    this.API_BASE = 'https://kata.academy:8021/api/';

    this.getPosts = async (take) => {
      const response = await fetch(`${this.API_BASE}articles?limit=5&offset=${take}`);
      const body = await response.json();

      return body;
    };

    this.getPost = async (slug, token) => {
      token ? token : '';
      const response = await fetch(`${this.API_BASE}articles/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });
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

    this.createPost = async (userData, token) => {
      const post = {
        article: userData,
      };
      const response = await fetch(`${this.API_BASE}articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(post),
      });

      const body = await response.json();
      return body;
    };

    this.deletePost = async (slug, token) => {
      await fetch(`${this.API_BASE}articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });
    };

    this.updatePost = async (userData, slug, token) => {
      const post = {
        article: userData,
      };
      const response = await fetch(`${this.API_BASE}articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(post),
      });

      const body = await response.json();
      return body;
    };

    this.likePost = async (slug, token) => {
      const response = await fetch(`${this.API_BASE}articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      const body = response.json();

      return body;
    };

    this.disLikePost = async (slug, token) => {
      const response = await fetch(`${this.API_BASE}articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Token ${token}`,
        },
      });

      const body = response.json();

      return body;
    };
  }
}

export default new RealworldBlogApi();
