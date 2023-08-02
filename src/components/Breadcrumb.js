export default function Breadcrumb({ $target, postId }) {
  const $breadcrumb = document.createElement("div");
  $breadcrumb.className = "breadcrumb";

  this.state = postId;

  $target.appendChild($breadcrumb);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $breadcrumb.innerHTML = `
        
    `;
  };

  this.makeBreadcrumb = async (postId) => {
    const documents = await getData("/documents");
    let breadcrumb = {}
    for (let i = 0; )
  }
}
this.render();

$breadcrumb.addEventListener("keyup", (e) => {
  const { target } = e;

  const name = target.getAttribute("name");

  if (this.state[name] !== undefined) {
    const nextState = {
      ...this.state,
      [name]: target.value,
    };
    this.setState(nextState);
    onEditing(this.state);
  }
});
