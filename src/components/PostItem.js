import { deleteData, getData, postData } from "../utils/api.js";
import { pushRouter } from "../utils/router.js";

export default function PostItem(title, id) {
  const $postItemBox = document.createElement("div");
  $postItemBox.className = id;

  const $li = document.createElement("li");
  $li.className = id;

  const $title = document.createElement("span");
  $title.className = id;
  $title.textContent = title;
  $li.appendChild($title);

  const $addButton = makeButton("+", id);
  $li.appendChild($addButton);

  const $removeButton = makeButton("-", id);
  $li.appendChild($removeButton);

  const $postSubItemBox = document.createElement("ul");

  $postItemBox.appendChild($li);
  $postItemBox.appendChild($postSubItemBox);

  $li.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.closest("span") === $title) {
      pushRouter(`/documents/${$title.className}`);
    } else if (target.closest("div") === $addButton) {
      const createdPost = await postData(
        $addButton.querySelector("button").className
      );
      pushRouter(`/documents/${createdPost.id}`);
    } else if (target.closest("div") === $removeButton) {
      alert("문서가 정상적으로 삭제되었습니다.");
      await deleteData($removeButton.querySelector("button").className).then(
        (res) => {
          if (res.parent) pushRouter(`/documents/${res.parent.id}`);
          else {
            pushRouter(`/`);
            location.reload();
          }
        }
      );
    }
  });

  return { $postItemBox, $postSubItemBox };
}

export const makeButton = (text, className) => {
  const $button = document.createElement("button");
  const $buttonDiv = document.createElement("div");
  $buttonDiv.appendChild($button);
  $button.className = className;
  if (text === "+") $buttonDiv.className = "plus-button";
  else $buttonDiv.className = "minus-button";
  return $buttonDiv;
};
