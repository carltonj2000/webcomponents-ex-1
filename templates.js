export const templates = {
  get blogPost() {
    const template = document.createElement("template");
    template.innerHTML = /* html */ `
      <div class="blog-post">
        <div class="thumbnail">
          <slot name="thumbnail"><img src="" alt="" /></slot>
        </div>
        <slot name="title"><h2>TITLE</h2></slot>
        <p>DESCRIPTION</p>
        <slot name="link"><a href="">Learn More</a></slot>
      </div>
    `;
    return template;
  },
};
