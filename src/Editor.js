export default function Editor({
  $target,
  initialState = {
    title: "",
    content: "",
  },
  onEditing,
}) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  let isInitialized = false;

  this.state = initialState;

  $target.appendChild($editor);

  this.setState = (nextState) => {
    this.state = nextState;
    const { title, content } = this.state;
    $editor.querySelector("[name=title]").value = title;
    $editor.querySelector("[name=content]").value = content;
    this.render();
  };

  this.render = () => {
    if (!isInitialized) {
      $editor.innerHTML = `
        <input type="text" name="title" value="${this.state.title}" />
        <textarea name="content">${this.state.content}</textarea>
      `;
      isInitialized = true;
    }
  };
  this.render();

  $editor.addEventListener("keyup", (e) => {
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
}
