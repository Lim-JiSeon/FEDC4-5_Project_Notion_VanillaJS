import { getData } from "../utils/api.js";

export default function Breadcrumb({ $target, postId }) {
  const $breadcrumb = document.createElement("div");
  $breadcrumb.className = "breadcrumb";
  const breadcrumb = {};

  this.state = postId;

  $target.appendChild($breadcrumb);

  this.setState = async (nextState) => {
    this.state = nextState;
    const documents = await getData("/documents");
    this.makeBreadcrumb(false, documents);
    console.log(breadcrumb);
    this.render();
  };

  this.render = () => {
    const targetDocument = breadcrumb[this.state];
    targetDocument.forEach((item) => {
      $documentLink = document.createElement("div");
      $documentLink.textContent = item[0];
      $breadcrumb.appendChild($documentLink);
    });
  };

  this.makeBreadcrumb = async (targetItem, data) => {
    data.forEach(({ title, documents, id }) => {
      targetItem
        ? targetItem.push([title, id])
        : (breadcrumb[id] = [[title, id]]);

      if (documents.length > 0) {
        this.makeBreadcrumb(breadcrumb[id], documents);
      } else {
        this.makeBreadcrumb(false, documents);
      }
    });
  };

  $breadcrumb.addEventListener("keyup", (e) => {
    const { target } = e;
  });
}
