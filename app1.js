class BlogPost extends HTMLElement {
  #description = "";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    console.log("-- mounted");
    // this.render(); // if want called before constructor
  }

  disconnectedCallback() {
    console.log("-- unmounted");
  }

  set description(value) {
    this.#description = value;
    this.descriptionElement.textContent = value;
  }

  get description() {
    return this.#description;
  }

  set data(value) {
    console.log("-- value", value);
    this.titleElement.textContent ||= value.title;
    this.descriptionElement.textContent = value.description || "";
    this.linkElement.textContent = value.link || "";
  }

  static get observedAttributes() {
    return ["title", "description", "link"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("-- att changed", name, oldValue, newValue);
    switch (name) {
      case "title":
        // this.title = newValue || ""; // with render() call below
        this.titleElement.textContent = newValue || ""; // no render() more efficient
        break;
      case "description":
        this.descriptionElement.textContent = newValue || "";
        break;
      case "link":
        this.linkElement.textContent = newValue || "";
        break;
    }
    // this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */ `
      <div class="blog-post">
        <h2>${this.title}</h2>
        <p>${this.description}</p>
        <a href="">${this.link}</a>
      </div>`;

    this.titleElement = this.shadowRoot.querySelector("h2");
    this.descriptionElement = this.shadowRoot.querySelector("p");
    this.linkElement = this.shadowRoot.querySelector("a");
    console.log(
      "tdl",
      this.titleElement,
      this.descriptionElement,
      this.linkElement
    );
  }
}

customElements.define("blog-post", BlogPost);

{
  const post = document.querySelector("blog-post");
  post.shadowRoot.querySelector(".blog-post").style.background = "#f00";

  post.data = {
    title: "Web Components",
    link: "learn more",
    description:
      "Qui enim dolore veniam commodo occaecat duis cillum laborum ea laborum.",
  };

  post.description = "playing with web components";
  // setTimeout(() => post.remove(), 2500); // test disconnectCallback
  setTimeout(() => post.removeAttribute("title"), 1500);
}
