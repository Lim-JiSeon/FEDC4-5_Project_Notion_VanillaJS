import { pushRouter } from "../utils/router.js";

export default function Breadcrumb({ $target, initialState }) {
  const $breadcrumb = document.createElement("div");
  $breadcrumb.className = "breadcrumb";
  $target.appendChild($breadcrumb);
  const breadcrumb = {};
  const path = [];

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;
    this.makeBreadcrumb(this.state);
    this.render();
  };

  this.render = () => {
    $breadcrumb.innerHTML = "";
    const postId = getPostId();
    const targetPath = breadcrumb[postId];

    targetPath.forEach((item) => {
      const $breadcrumbItem = document.createElement("div");
      $breadcrumbItem.className = item[1];
      $breadcrumbItem.textContent = `${item[0]}`;
      $breadcrumb.appendChild($breadcrumbItem);

      $breadcrumbItem.addEventListener("click", () => {
        pushRouter(`/documents/${$breadcrumbItem.className}`);
      });
    });
  };

  this.makeBreadcrumb = (data) => {
    data.forEach(({ title, documents, id }) => {
      if (documents.length > 0) {
        if (!breadcrumb[id]) breadcrumb[id] = [...path, [title, id]];
        path.push([title, id]);
        this.makeBreadcrumb(documents);
      } else {
        breadcrumb[id] = [...path, [title, id]];
      }
    });
    path.pop();
  };
}

const getPostId = () => {
  const { pathname } = window.location;

  if (pathname !== "/" && pathname.indexOf("/") === 0) {
    const [, , postId] = pathname.split("/");
    return postId;
  }
};
