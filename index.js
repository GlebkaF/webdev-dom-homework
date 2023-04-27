const addFormButton = document.querySelector(".add-form-button");
const commentSection = document.querySelector(".comments");

const commentTemplate = '<div class="comment-header"></div><div class="comment-body">\
	<div class="comment-text"></div></div><div class="comment-footer"><div class="likes">\
	<span class="likes-counter">0</span><button class="like-button"></button></div></div>';

function addComment(name, commentText) {
	const newComment = document.createElement("li");
	newComment.classList.add("comment");
	newComment.innerHTML = commentTemplate;

	{
		const newCommentHeader = newComment.querySelector(".comment-header");

		const newCommentHeaderName = document.createElement("div");
		newCommentHeaderName.innerHTML = name;
		newCommentHeader.appendChild(newCommentHeaderName);

		let currTime = new Date();
		console.log(currTime.getDate());

		const newCommentHeaderTime = document.createElement("div");
		newCommentHeaderTime.innerHTML = currTime.getDate() + '.' + (currTime.getMonth() + 1) + '.' + currTime.getFullYear() +
			' ' + currTime.getHours() + ':' + currTime.getMinutes();
		newCommentHeader.appendChild(newCommentHeaderTime);
	}

	{
		const newCommentText = newComment.querySelector(".comment-text");
		newCommentText.innerHTML = commentText;
	}

	commentSection.appendChild(newComment);
}

window.addEventListener("load", () => {
	const nameInput = document.querySelector(".add-form-name");
	const commentText = document.querySelector(".add-form-text");

	addFormButton.addEventListener("click", () => {
		if (nameInput.value.length === 0)
		{
			nameInput.classList.add("invalid-el");
			return;
		}

		if (commentText.value.length === 0)
		{
			commentText.classList.add("invalid-el");
			return;
		}

		addComment(nameInput.value, commentText.value);
	});

	nameInput.addEventListener("click", (event) => {
		event.target.classList.remove("invalid-el");
	});

	commentText.addEventListener("click", (event) => {
		event.target.classList.remove("invalid-el");
	});
});
