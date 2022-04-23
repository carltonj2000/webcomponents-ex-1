import { templates } from "./templates.js";

export class BlogPost extends HTMLElement {
  title = "";
  description = "";
  link = "";
  thumbnail = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["title", "description", "link", "thumbnail"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log("-- att changed", name, oldValue, newValue);
    switch (name) {
      case "title":
        this.title = newValue || "NO TITLE";
        break;
      case "description":
        this.description = newValue || "";
        break;
      case "link":
        this.link = newValue || "/";
        break;
      case "thumbnail":
        this.thumbnail = newValue || "";
        break;
    }

    this.render();
  }

  get template() {
    return /* html */ `
      ${this.style}
      <div class="blog-post">
        <div class="thumbnail">
          ${
            this.thumbnail
              ? `<img src="${this.thumbnail}" alt="${this.title}"/>`
              : ""
          }
        </div>
        <h2>${this.title}</h2>
        <p>${this.description}</p>
        <slot name="link"><a href="${
          this.link
        }" class="link">Learn More</a></slot>
      </div>`;
  }

  render() {
    // local template
    this.shadowRoot.innerHTML = this.template;
    // global template in index.html
    // const template = document.getElementById("blog-post-template");
    // this.shadowRoot.appendChild(template.content);
    // this.shadowRoot.appendChild(templates.blogPost.content);
  }

  get style() {
    return /* css */ `
      <style>
        :host {
          display: block;
        }
        :host * {
          box-sizing: border-box;
        }
        .blog-post {
          background: #f6f6f6;
          padding: 10px 10px 25px;
          border-radius: 5px;
          height: 100%;
        }
        .blog-post .thumbnail {
          background: var(--thumb-bg, #ddd);
          height: 150px;
          overflow: hidden;
          margin-bottom: 10px;
          margin-left: -10px;
          margin-top: -10px;
          width: calc(100% + 20px)
        }
        .blog-post .thumbnail img[src=""] {
          display: none;
        }
        .blog-post .thumbnail img:not([src=""]) {
        }
        .blog-post h2 {
          margin: 0;
          padding: 0 10px;
          font-family: sans-serif
          font-size: 1.2rem;
          line-height: 135%;
        }
        .blog-post p {
          font-size: 0.8rem;
          line-height: 150%;
          color: #444;
          padding: 0 10px;
        }
        .blog-post .link:any-link {
          font-size: 0.9rem;
          text-decoration: none;
          font-weight: 900;
          letter-spacing: 0.05rem;
          color: #2c86ce;
          text-transform: capitalize;
          border-bottom: 1px solid #222;
          margin-left: 10px;
        }
      </style>
    `;
  }
}

customElements.define("blog-post", BlogPost);
